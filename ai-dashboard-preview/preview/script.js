const page = document.body.dataset.page;

const chartData = {
  "30 days": [48, 46, 54, 52, 62, 66, 59, 71, 68, 74, 77, 80],
  "12 weeks": [42, 56, 51, 68, 60, 74, 70, 88, 80, 91, 86, 95],
  YTD: [28, 34, 40, 49, 58, 62, 66, 70, 75, 80, 84, 89],
};

const commandItems = [
  { label: "Command Center", href: "./index.html", type: "Navigation", shortcut: "G D" },
  { label: "Workflows", href: "./workflows.html", type: "Navigation", shortcut: "G W" },
  { label: "Model Usage", href: "./model-usage.html", type: "Navigation", shortcut: "G M" },
  { label: "Insights", href: "./insights.html", type: "Navigation", shortcut: "G I" },
  { label: "Team Activity", href: "./team-activity.html", type: "Navigation", shortcut: "G T" },
  { label: "Trust & Safety", href: "./trust-safety.html", type: "Navigation", shortcut: "G S" },
  { label: "Settings", href: "./settings.html", type: "Navigation", shortcut: "," },
];

const actionItems = [
  { label: "Generate leadership brief", type: "AI Action", shortcut: "⌘↵" },
  { label: "Review workflow anomalies", type: "AI Action", shortcut: "⌥A" },
  { label: "Optimize model spend", type: "AI Action", shortcut: "⌥S" },
  { label: "Create workflow", type: "Command", shortcut: "C W" },
  { label: "Open approval queue", type: "Command", shortcut: "G A" },
];

const recentItems = [
  { label: "Support triage assistant", meta: "Workflow · Opened 8 min ago" },
  { label: "Quarterly analytics pack", meta: "Report · Ready for export" },
  { label: "GPT-5.4 spend anomaly", meta: "Alert · Needs review" },
];

const notificationItems = [
  "Two workflows need human approval",
  "Spend anomaly detected in GPT-5.4 tier",
  "Quarterly analytics pack is ready",
];

const profileItems = [
  "Workspace settings",
  "Open command palette",
  "Sign out",
];

const utilityMenus = {
  Filters: ["All workflows", "Healthy only", "Needs review", "Drafts"],
  "Compare models": ["By cost", "By latency", "By success rate"],
  "Filter teams": ["All teams", "Growth", "Support", "Legal", "Operations"],
  "Review queue": ["Open reviews", "High priority", "Assigned to me"],
  Billing: ["Usage summary", "Invoices", "Cost controls"],
};

function initActiveNav() {
  document.querySelectorAll("[data-page-link]").forEach((link) => {
    if (link.dataset.pageLink === page) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function createCommandPalette() {
  const overlay = document.createElement("div");
  overlay.className = "command-overlay";
  overlay.hidden = true;
  overlay.innerHTML = `
    <div class="command-backdrop" data-close-command></div>
    <div class="command-dialog" role="dialog" aria-modal="true" aria-labelledby="command-title">
      <div class="command-header">
        <div>
          <div class="command-eyebrow">Command palette</div>
          <h2 id="command-title">Search pages and actions</h2>
        </div>
        <button type="button" class="command-close" aria-label="Close command palette" data-close-command>×</button>
      </div>
      <form class="command-form">
        <input class="command-input" type="search" placeholder="Type a page, workflow, or action..." aria-label="Command palette search" />
      </form>
      <div class="command-quick-actions">
        <button type="button" data-command-fill="Generate leadership brief">Generate leadership brief</button>
        <button type="button" data-command-fill="Review workflow anomalies">Review workflow anomalies</button>
        <button type="button" data-command-fill="Optimize model spend">Optimize model spend</button>
      </div>
      <div class="command-layout">
        <div class="command-results" role="listbox" aria-label="Command results"></div>
        <aside class="command-sidebar">
          <div class="command-side-group">
            <div class="command-side-title">Recent</div>
            <div class="command-recents"></div>
          </div>
          <div class="command-side-group">
            <div class="command-side-title">Keyboard</div>
            <div class="command-keyboard-hints">
              <div><span>⌘K</span><small>Open palette</small></div>
              <div><span>/</span><small>Focus search</small></div>
              <div><span>Esc</span><small>Close</small></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const input = overlay.querySelector(".command-input");
  const results = overlay.querySelector(".command-results");
  const recents = overlay.querySelector(".command-recents");
  let activeIndex = 0;
  let flatResults = [];

  recents.innerHTML = recentItems
    .map(
      (item) => `
        <button type="button" class="command-recent-item" data-command-fill="${item.label}">
          <strong>${item.label}</strong>
          <small>${item.meta}</small>
        </button>
      `
    )
    .join("");

  function renderGroupedSection(title, items, kind, startIndex) {
    if (!items.length) return "";
    return `
      <section class="command-group">
        <div class="command-group-title">${title}</div>
        ${items
          .map(
            (item, index) => `
              <button type="button" class="command-item" data-command-index="${startIndex + index}" data-command-kind="${kind}" data-command-value="${item.label}">
                <span class="command-item-main">
                  <strong>${item.label}</strong>
                  <small>${item.type}</small>
                </span>
                <span class="command-item-meta">${item.shortcut || ""}</span>
              </button>
            `
          )
          .join("")}
      </section>
    `;
  }

  function renderResults(query = "") {
    const normalized = query.trim().toLowerCase();
    const navigation = commandItems.filter((item) => item.label.toLowerCase().includes(normalized));
    const actions = actionItems.filter((item) => item.label.toLowerCase().includes(normalized));

    flatResults = [
      ...navigation.map((item) => ({ ...item, kind: "nav" })),
      ...actions.map((item) => ({ ...item, kind: "action" })),
    ];

    if (!flatResults.length) {
      results.innerHTML = `<div class="command-empty">No results found for "${query}".</div>`;
      activeIndex = 0;
      return;
    }

    const navigationMarkup = renderGroupedSection("Navigation", navigation, "nav", 0);
    const actionMarkup = renderGroupedSection("AI & Commands", actions, "action", navigation.length);
    results.innerHTML = `${navigationMarkup}${actionMarkup}`;
    activeIndex = 0;
    highlightActiveResult();
  }

  function highlightActiveResult() {
    const items = Array.from(results.querySelectorAll(".command-item"));
    items.forEach((item, index) => {
      item.classList.toggle("is-active", index === activeIndex);
    });
  }

  function activateResult(index) {
    const item = flatResults[index];
    if (!item) return;

    if (item.kind === "nav" && item.href) {
      window.location.href = item.href;
      return;
    }

    showToast(`${item.label} triggered`);
    closePalette();
  }

  function openPalette(prefill = "") {
    overlay.hidden = false;
    document.body.classList.add("modal-open");
    input.value = prefill;
    renderResults(prefill);
    window.requestAnimationFrame(() => input.focus());
  }

  function closePalette() {
    overlay.hidden = true;
    document.body.classList.remove("modal-open");
  }

  overlay.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-command]")) {
      closePalette();
    }

    const quickAction = event.target.closest("[data-command-fill]");
    if (quickAction) {
      input.value = quickAction.dataset.commandFill;
      renderResults(input.value);
      input.focus();
    }

    const commandButton = event.target.closest(".command-item");
    if (commandButton) {
      const index = Number(commandButton.dataset.commandIndex || 0);
      activateResult(index);
    }
  });

  input.addEventListener("input", () => renderResults(input.value));
  input.addEventListener("keydown", (event) => {
    if (!flatResults.length) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      activeIndex = (activeIndex + 1) % flatResults.length;
      highlightActiveResult();
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      activeIndex = (activeIndex - 1 + flatResults.length) % flatResults.length;
      highlightActiveResult();
    }

    if (event.key === "Enter") {
      event.preventDefault();
      activateResult(activeIndex);
    }
  });

  document.querySelectorAll(".search-shortcut").forEach((button) => {
    button.addEventListener("click", () => openPalette(""));
  });

  window.addEventListener("keydown", (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openPalette(document.querySelector(".search-input")?.value || "");
    }

    if (event.key === "Escape" && !overlay.hidden) {
      closePalette();
    }

    if (event.key === "/" && document.activeElement?.tagName !== "INPUT") {
      event.preventDefault();
      document.querySelector(".search-input")?.focus();
    }
  });

  return { openPalette, closePalette };
}

function createDropdown(trigger, items) {
  const existing = document.querySelector(".dropdown-panel");
  if (existing) existing.remove();

  const rect = trigger.getBoundingClientRect();
  const panel = document.createElement("div");
  panel.className = "dropdown-panel";
  panel.setAttribute("role", "menu");
  panel.style.top = `${rect.bottom + window.scrollY + 10}px`;
  panel.style.left = `${Math.max(20, rect.right + window.scrollX - 230)}px`;
  panel.innerHTML = items
    .map((item) => `<button type="button" class="dropdown-item" role="menuitem">${item}</button>`)
    .join("");

  document.body.appendChild(panel);
  trigger.setAttribute("aria-expanded", "true");

  function close() {
    trigger.setAttribute("aria-expanded", "false");
    panel.remove();
    document.removeEventListener("click", onDocumentClick, true);
    document.removeEventListener("keydown", onKeyDown, true);
  }

  function onDocumentClick(event) {
    if (!panel.contains(event.target) && event.target !== trigger) {
      close();
    }
  }

  function onKeyDown(event) {
    if (event.key === "Escape") close();
  }

  panel.addEventListener("click", (event) => {
    const item = event.target.closest(".dropdown-item");
    if (!item) return;

    if (item.textContent === "Open command palette") {
      window.openCommandPalette?.("");
    } else if (item.textContent === "Workspace settings") {
      window.location.href = "./settings.html";
    } else {
      showToast(`${item.textContent} selected`);
    }
    close();
  });

  document.addEventListener("click", onDocumentClick, true);
  document.addEventListener("keydown", onKeyDown, true);
}

function initTopbarActions(commandPalette) {
  document.querySelectorAll(".topbar-actions button").forEach((button) => {
    const label = button.textContent.trim();
    button.setAttribute("type", "button");
    button.setAttribute("aria-haspopup", "menu");
    button.setAttribute("aria-expanded", "false");

    if (label === "Notifications") {
      button.addEventListener("click", () => createDropdown(button, notificationItems));
      return;
    }

    if (label === "Anita Noor") {
      button.addEventListener("click", () => createDropdown(button, profileItems));
      return;
    }

    if (utilityMenus[label]) {
      button.addEventListener("click", () => createDropdown(button, utilityMenus[label]));
      return;
    }

    button.addEventListener("click", () => {
      if (label.toLowerCase().includes("workflow")) {
        commandPalette.openPalette("workflow");
      } else {
        showToast(`${label} action triggered`);
      }
    });
  });
}

function initSearch() {
  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get("q") || "";
  const searchInput = document.querySelector(".search-input");
  const searchForm = document.querySelector(".search-form");

  function searchableNodes() {
    return Array.from(
      document.querySelectorAll(
        ".card, .panel, .workflow-row, .prompt-item, .timeline div, tbody tr, .placeholder-cards div, .settings-list div"
      )
    );
  }

  function applySearch(query) {
    const normalized = query.trim().toLowerCase();

    searchableNodes().forEach((node) => {
      const text = node.textContent.toLowerCase();
      const match = !normalized || text.includes(normalized);
      node.classList.toggle("hidden-by-search", !match);
    });
  }

  if (searchInput) {
    searchInput.value = initialQuery;
    applySearch(initialQuery);

    searchInput.addEventListener("input", () => applySearch(searchInput.value));
  }

  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      applySearch(searchInput.value);
      const url = new URL(window.location.href);
      if (searchInput.value.trim()) {
        url.searchParams.set("q", searchInput.value.trim());
      } else {
        url.searchParams.delete("q");
      }
      window.history.replaceState({}, "", url);
    });
  }
}

function initSegmentedControls() {
  document.querySelectorAll(".segmented").forEach((group) => {
    const buttons = Array.from(group.querySelectorAll("button"));
    const chartBars = document.querySelectorAll(".chart > div");

    buttons.forEach((button) => {
      button.setAttribute("type", "button");
      button.addEventListener("click", () => {
        buttons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");

        const nextSeries = chartData[button.textContent.trim()];
        if (nextSeries && chartBars.length === nextSeries.length) {
          chartBars.forEach((bar, index) => {
            bar.style.height = `${nextSeries[index]}%`;
          });
        }
      });
    });
  });
}

function initClickableSurfaces() {
  const interactiveSelectors = [
    ".card",
    ".prompt-item",
    ".workflow-row",
    ".timeline div",
    ".assistant-action-chip",
    ".conversation-item",
    ".assistant-recommendation",
    ".assistant-activity-item",
  ];
  interactiveSelectors.forEach((selector) => {
    document.querySelectorAll(selector).forEach((element) => {
      if (element.closest(".panel-header")) return;
      element.tabIndex = 0;
      element.setAttribute("role", "button");
      element.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          element.click();
        }
      });

      element.addEventListener("click", () => {
        if (selector === ".prompt-item") {
          const composer = document.querySelector(".composer");
          if (composer) {
            composer.textContent = element.textContent.trim();
            composer.focus();
          }
        }
        if (selector === ".card") {
          element.classList.add("is-highlighted");
          window.setTimeout(() => element.classList.remove("is-highlighted"), 900);
        }
        showToast(element.textContent.trim().slice(0, 72));
      });
    });
  });

  const composer = document.querySelector(".composer");
  if (composer) {
    composer.setAttribute("contenteditable", "true");
    composer.setAttribute("role", "textbox");
    composer.setAttribute("aria-multiline", "true");
    composer.setAttribute("tabindex", "0");
  }
}

function initTables() {
  document.querySelectorAll("table").forEach((table) => {
    const rows = Array.from(table.querySelectorAll("tbody tr"));
    const headers = Array.from(table.querySelectorAll("thead th"));

    rows.forEach((row) => {
      row.tabIndex = 0;
      row.addEventListener("click", () => {
        rows.forEach((item) => item.classList.remove("is-selected-row"));
        row.classList.add("is-selected-row");
      });
      row.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          row.click();
        }
      });
    });

    headers.forEach((header, index) => {
      header.tabIndex = 0;
      header.classList.add("is-sortable");
      header.addEventListener("click", () => sortTable(table, index));
      header.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          sortTable(table, index);
        }
      });
    });
  });
}

function sortTable(table, columnIndex) {
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));
  const currentDirection = table.dataset.sortDirection === "asc" ? "desc" : "asc";
  table.dataset.sortDirection = currentDirection;

  const sorted = rows.sort((a, b) => {
    const left = a.children[columnIndex].textContent.trim();
    const right = b.children[columnIndex].textContent.trim();
    const leftNumber = Number(left.replace(/[^0-9.-]/g, ""));
    const rightNumber = Number(right.replace(/[^0-9.-]/g, ""));

    const bothNumeric = !Number.isNaN(leftNumber) && !Number.isNaN(rightNumber);
    if (bothNumeric) {
      return currentDirection === "asc" ? leftNumber - rightNumber : rightNumber - leftNumber;
    }

    return currentDirection === "asc" ? left.localeCompare(right) : right.localeCompare(left);
  });

  sorted.forEach((row) => tbody.appendChild(row));
}

function showToast(message) {
  let toast = document.querySelector(".interaction-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "interaction-toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("is-visible");

  clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 1800);
}

function initPhaseOne() {
  initActiveNav();
  const commandPalette = createCommandPalette();
  window.openCommandPalette = commandPalette.openPalette;
  initTopbarActions(commandPalette);
  initSearch();
  initSegmentedControls();
  initClickableSurfaces();
  initTables();
}

function initResponsiveSidebar() {
  const menuButton = document.querySelector(".mobile-menu-button");
  const sidebar = document.querySelector(".sidebar");

  if (!menuButton || !sidebar) return;

  function closeSidebar() {
    document.body.classList.remove("sidebar-open");
    menuButton.setAttribute("aria-expanded", "false");
  }

  function openSidebar() {
    document.body.classList.add("sidebar-open");
    menuButton.setAttribute("aria-expanded", "true");
  }

  menuButton.addEventListener("click", () => {
    if (document.body.classList.contains("sidebar-open")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  document.addEventListener("click", (event) => {
    if (window.innerWidth > 960) return;
    const clickedInsideSidebar = sidebar.contains(event.target);
    const clickedButton = menuButton.contains(event.target);
    if (!clickedInsideSidebar && !clickedButton && document.body.classList.contains("sidebar-open")) {
      closeSidebar();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSidebar();
    }
  });

  sidebar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => closeSidebar());
  });
}

initPhaseOne();
initResponsiveSidebar();

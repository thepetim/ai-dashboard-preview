import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(
          "flex h-12 w-full rounded-full border border-input bg-white px-4 py-3 text-sm text-foreground shadow-[var(--shadow-sm)] transition-[border-color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-[#cad4ff] focus-visible:ring-4 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };

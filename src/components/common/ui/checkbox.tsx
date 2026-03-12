import * as React from "react";
import { cn } from "@/lib/cn";
import "@/styles/checkbox.css";

interface CheckboxProps extends Omit<
  React.ComponentProps<"input">,
  "type" | "onChange"
> {
  label?: string;
  onCheckedChange?: (checked: boolean) => void;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, onCheckedChange, ...props }, ref) => {
    const checkboxId = id || React.useId();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(e.target.checked);
    };

    return (
      <div className={cn("checkbox-wrapper-custom", className)}>
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className="checkbox-input-custom"
          onChange={handleChange}
          {...props}
        />
        <label htmlFor={checkboxId} className="checkbox-label-custom">
          <span>
            <svg viewBox="0 0 12 10">
              <polyline points="1.5 6 4.5 9 10.5 1" />
            </svg>
          </span>
          {label && <span>{label}</span>}
        </label>
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export { Checkbox };

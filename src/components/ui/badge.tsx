
import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "secondary" | "outline";
};

  let variantClass = "bg-slate-100 text-slate-700";
  if (variant === "secondary") {
    variantClass = "bg-slate-200 text-slate-800";
  } else if (variant === "outline") {
    variantClass = "bg-transparent border border-slate-300 text-slate-700";
  }
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        variantClass,
        className
      )}
      {...props}
    />
  );
}

import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  variant?: "default" | "destructive" | "outline" | "ghost";
};

export function Button({ className, asChild, variant = "default", ...props }: ButtonProps) {
  const variantClass =
    variant === "destructive"
      ? "bg-red-500 text-white hover:bg-red-600"
      : variant === "outline"
      ? "bg-transparent border border-gray-300 text-gray-900 hover:bg-gray-100"
      : variant === "ghost"
      ? "bg-transparent text-gray-900 hover:bg-gray-100"
      : "bg-gray-200 text-gray-900 hover:bg-gray-300";
  if (asChild) {
    const child = React.Children.only(props.children);
    return React.cloneElement(child as React.ReactElement, {
      className: cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50",
        variantClass,
        className,
        (child as React.ReactElement).props.className
      ),
      ...props,
      children: (child as React.ReactElement).props.children,
    });
  }
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50",
        variantClass,
        className
      )}
      {...props}
    />
  );
}

import clsx from "clsx";
import React from "react";

interface SharedProps
  extends Partial<
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">
  > {
  className?: string;
}

interface ButtonProps extends SharedProps {
  variant?: "primary" | "secondary" | "danger";
  size?: "small" | "medium" | "large";
  children: React.ReactNode | React.ReactNode[];
  href?: string;
  disabled?: boolean;
}

function getClassName({ className }: { className?: string }) {
  return clsx(
    "group relative inline-flex text-lg font-medium focus:outline-none opacity-100 disabled:opacity-50 transition",
    className,
  );
}

const Button = React.forwardRef<HTMLButtonElement | null, ButtonProps>(
  function Button(props, ref) {
    const { variant = "primary", size = "medium", ...otherProps } = props;

    const classes = getClassName({
      className: clsx(props.className, {
        "border-secondary bg-primary border-2 group-hover:border-transparent group-focus:border-transparent":
          variant === "secondary" || variant === "danger",
        danger: variant === "danger",
        "bg-inverse": variant === "primary",
      }),
    });
    const defaultEl = props.href ? "a" : "button";

    return React.createElement(defaultEl, {
      ref,
      size,
      variant,
      className: classes,
      "data-testid": "root",
      ...otherProps,
    } as ButtonProps);
  },
);

export { Button };

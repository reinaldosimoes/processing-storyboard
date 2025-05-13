import { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
}

const Button = ({
  children,
  size = "md",
  className = "",
  onClick,
  disabled = false,
  type = "button",
  ariaLabel,
}: ButtonProps) => {
  const baseStyles =
    "border border-black/10 dark:border-white/10 bg-black/1 dark:bg-white/10 hover:bg-black/2 dark:hover:bg-white/2 rounded-lg transition-all duration-150 cursor-pointer shadow-lg hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const buttonClasses = `${baseStyles} ${sizes[size]} ${className}`.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;

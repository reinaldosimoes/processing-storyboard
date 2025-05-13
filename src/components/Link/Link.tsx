import { ReactNode } from "react";

export interface LinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  target?: "_blank" | "_self";
  rel?: string;
  ariaLabel?: string;
}

const Link = ({
  children,
  href,
  className = "",
  target = "_self",
  rel = "",
  ariaLabel,
}: LinkProps) => {
  const baseStyles =
    "text-black/60 dark:text-white/60 hover:underline transition-colors duration-300";

  const linkClasses = `${baseStyles} ${className}`.trim();

  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : rel}
      className={linkClasses}
      aria-label={ariaLabel}
    >
      {children}
    </a>
  );
};

export default Link;

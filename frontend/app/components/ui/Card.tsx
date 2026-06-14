import { clsx } from "clsx";
import { forwardRef } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  accent?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles = {
  none: "",
  sm: "p-5",
  md: "p-6",
  lg: "p-8",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { hover = false, accent = false, padding = "md", className, children, style, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "border transition-all duration-200 ease-out",
          paddingStyles[padding],
          hover && "cursor-pointer",
          className
        )}
        style={{
          borderRadius: "var(--radius-card)",
          background: accent ? "var(--accent-glow)" : "var(--bg-card)",
          borderColor: accent ? "var(--border-accent)" : "var(--border)",
          boxShadow: "var(--shadow-sm)",
          ...style,
        }}
        onMouseEnter={
          hover
            ? (e) => {
                e.currentTarget.style.background = "var(--bg-card-hover)";
                e.currentTarget.style.borderColor = "var(--border-accent)";
              }
            : undefined
        }
        onMouseLeave={
          hover
            ? (e) => {
                e.currentTarget.style.background = accent
                  ? "var(--accent-glow)"
                  : "var(--bg-card)";
                e.currentTarget.style.borderColor = accent
                  ? "var(--border-accent)"
                  : "var(--border)";
              }
            : undefined
        }
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;

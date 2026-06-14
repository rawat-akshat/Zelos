import { clsx } from "clsx";
import { forwardRef } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  accent?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

const paddingStyles = {
  none: "",
  sm: "p-3",
  md: "p-4",
  lg: "p-5",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { hover = false, accent = false, padding = "md", className, children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "rounded-[14px] border",
          "bg-[#202020] border-[rgba(255,255,255,0.06)]",
          hover && [
            "transition-all duration-200 ease-out cursor-pointer",
            "hover:bg-[#262626] hover:border-[rgba(255,255,255,0.1)]",
            "hover:shadow-[0_4px_20px_rgba(0,0,0,0.35)]",
            "hover:-translate-y-0.5",
          ],
          accent && "border-[rgba(198,169,105,0.2)] bg-[rgba(198,169,105,0.04)]",
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;

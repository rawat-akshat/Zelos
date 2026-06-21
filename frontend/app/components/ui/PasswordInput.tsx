"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  inputStyle?: React.CSSProperties;
}

export default function PasswordInput({
  inputStyle,
  style,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false);
  const mergedStyle = { ...inputStyle, ...style };

  return (
    <div style={{ position: "relative" }}>
      <input
        {...props}
        type={visible ? "text" : "password"}
        style={{ ...mergedStyle, width: "100%", paddingRight: 44 }}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        tabIndex={-1}
        style={{
          position: "absolute",
          right: 12,
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          border: "none",
          padding: 4,
          cursor: "pointer",
          color: "var(--text-muted, var(--landing-text-muted, #888))",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {visible ? <EyeOff size={18} strokeWidth={1.75} /> : <Eye size={18} strokeWidth={1.75} />}
      </button>
    </div>
  );
}

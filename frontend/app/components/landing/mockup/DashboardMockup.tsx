import MockupSidebar from "./MockupSidebar";
import MockupChatPanel from "./MockupChatPanel";
import MockupRightPanel from "./MockupRightPanel";

export default function DashboardMockup() {
  return (
    <div
      style={{
        background: "#F7F3EB",
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid rgba(30, 30, 30, 0.08)",
        aspectRatio: "16 / 10",
        display: "flex",
        minHeight: 380,
        textAlign: "left",
        fontFamily: "var(--font-inter), system-ui, sans-serif",
      }}
    >
      <MockupSidebar />
      <MockupChatPanel />
      <MockupRightPanel />
    </div>
  );
}

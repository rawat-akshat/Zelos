import Link from "next/link";
import LegalPageLayout from "../components/landing/LegalPageLayout";

export default function ContactPage() {
  return (
    <LegalPageLayout title="Contact">
      <p>We&apos;d love to hear from you.</p>
      <p>
        Whether you&apos;ve found a bug, have feedback, or simply want to share your experience,
        we&apos;d love to hear from you.
      </p>

      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <Link href="mailto:contact@zelos.app">contact@zelos.app</Link>
        </li>
        <li>
          <strong>Feedback:</strong> We&apos;re actively improving Zelos and every piece of
          feedback helps.
        </li>
        <li>
          <strong>Response time:</strong> We aim to respond within 2–3 business days.
        </li>
      </ul>
    </LegalPageLayout>
  );
}

import Link from "next/link";
import LegalPageLayout from "../components/landing/LegalPageLayout";

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy">
      <p>Your privacy matters.</p>
      <p>
        Zelos is designed to help people work through overwhelm, procrastination, and task
        paralysis. We understand that some conversations may contain personal information, and we
        take that responsibility seriously.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>Account information such as your name and email address</li>
        <li>Conversations you choose to save</li>
        <li>Usage data that helps us improve the product</li>
        <li>Basic device and browser information</li>
      </ul>

      <h2>What we do not do</h2>
      <ul>
        <li>We do not sell your personal data.</li>
        <li>We do not share your conversations with advertisers.</li>
        <li>We do not use your conversations for advertising purposes.</li>
      </ul>

      <h2>How your data is used</h2>
      <ul>
        <li>Provide the Zelos service</li>
        <li>Save your sessions and progress</li>
        <li>Improve product quality</li>
        <li>Monitor performance and fix bugs</li>
      </ul>

      <h2>AI Processing</h2>
      <p>
        Messages sent through Zelos may be processed by third-party AI providers in order to
        generate responses.
      </p>

      <h2>Data Security</h2>
      <p>We use industry-standard security practices to protect your information.</p>

      <h2>Your Choices</h2>
      <p>You may request deletion of your account and saved data at any time.</p>

      <h2>Contact</h2>
      <ul>
        <li>
          Questions about privacy?{" "}
          <Link href="mailto:contact@zelos.app">contact@zelos.app</Link>
        </li>
      </ul>

      <p className="landing-caption" style={{ marginTop: 24 }}>
        Last Updated: Friday, June 12, 2026
      </p>
    </LegalPageLayout>
  );
}

import {
  LegalA,
  LegalH2,
  LegalLI,
  LegalP,
  LegalPageLayout,
  LegalSection,
  LegalStrong,
  LegalUL,
} from "@/features/legal/components/LegalPageLayout";

export function TermsAndConditionsPage() {
  return (
    <LegalPageLayout title="Terms & Conditions" lastUpdated="April 09, 2026">
      <LegalSection>
        <LegalP>
          Welcome to Smart Garage. These Terms &amp; Conditions govern your use
          of the Smart Garage website, web application, mobile application, and
          related services.
        </LegalP>
        <LegalP className="mt-4">
          By creating an account, accessing the platform, or using Smart Garage,
          you agree to these Terms. If you do not agree, you should not use the
          service.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>1. Acceptance of Terms</LegalH2>
        <LegalP className="mt-4">
          By using Smart Garage, you agree to be bound by these Terms and by our
          Privacy Policy. If you do not accept these Terms, you may not access or
          use the service.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>2. Accounts and Registration</LegalH2>
        <LegalP className="mt-4">When using Smart Garage, you agree that:</LegalP>
        <LegalUL className="mt-3">
          <LegalLI>You will provide accurate and current account information</LegalLI>
          <LegalLI>You are responsible for maintaining account security</LegalLI>
          <LegalLI>You are responsible for activity that occurs under your account</LegalLI>
          <LegalLI>You will promptly notify us of suspected unauthorized access</LegalLI>
        </LegalUL>
      </LegalSection>

      <LegalSection>
        <LegalH2>3. Use of the Service</LegalH2>
        <LegalP className="mt-4">
          Smart Garage is intended for vehicle management, mileage tracking,
          maintenance reminders, expense organization, and AI-assisted vehicle
          guidance.
        </LegalP>
        <LegalP className="mt-4">
          You agree to use the service only in compliance with applicable law and
          these Terms.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>4. Acceptable Use</LegalH2>
        <LegalP className="mt-4">You agree not to:</LegalP>
        <LegalUL className="mt-3">
          <LegalLI>Use Smart Garage for unlawful or abusive purposes</LegalLI>
          <LegalLI>Attempt to gain unauthorized access to systems or data</LegalLI>
          <LegalLI>Upload malicious code or harmful material</LegalLI>
          <LegalLI>Interfere with service integrity, availability, or security</LegalLI>
          <LegalLI>Misrepresent your identity or misuse another person’s account</LegalLI>
          <LegalLI>Use the platform in a way that could harm Smart Garage or its users</LegalLI>
        </LegalUL>
      </LegalSection>

      <LegalSection>
        <LegalH2>5. AI Disclaimer</LegalH2>
        <LegalP className="mt-4">
          Smart Garage may offer AI-assisted responses intended to support vehicle
          understanding and troubleshooting.
        </LegalP>
        <LegalP className="mt-4">
          AI outputs are informational only. They may be inaccurate, incomplete,
          or unsuitable for final decision-making. Smart Garage does not guarantee
          that AI responses are correct, safe, or appropriate for actual repairs,
          diagnostics, or maintenance actions.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>6. No Professional Advice</LegalH2>
        <LegalP className="mt-4">
          Smart Garage is not a replacement for a certified mechanic, technician,
          inspector, legal advisor, or other regulated professional.
        </LegalP>
        <LegalP className="mt-4">
          You remain solely responsible for verifying important vehicle-related
          decisions, especially those involving safety, repairs, inspections, or
          maintenance.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>7. Intellectual Property</LegalH2>
        <LegalP className="mt-4">
          Smart Garage, including its branding, interface, software, design, and
          related content, is protected by applicable intellectual property laws.
        </LegalP>
        <LegalP className="mt-4">
          Except where expressly permitted, you may not copy, reproduce, modify,
          distribute, reverse engineer, or create derivative works from Smart
          Garage without prior written permission.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>8. Third-Party Services</LegalH2>
        <LegalP className="mt-4">
          Smart Garage may integrate with or rely on third-party services such as
          hosting, authentication, analytics, infrastructure, or other supporting
          tools.
        </LegalP>
        <LegalP className="mt-4">
          We are not responsible for the practices, availability, or policies of
          third-party providers beyond our direct control.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>9. Disclaimer of Warranties</LegalH2>
        <LegalP className="mt-4">
          Smart Garage is provided on an{" "}
          <LegalStrong>“as is”</LegalStrong> and{" "}
          <LegalStrong>“as available”</LegalStrong> basis, without warranties of
          any kind, whether express or implied.
        </LegalP>
        <LegalP className="mt-4">
          We do not guarantee uninterrupted service, error-free operation,
          continuous availability, or that all information and outputs will be
          accurate or complete.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>10. Limitation of Liability</LegalH2>
        <LegalP className="mt-4">
          To the maximum extent permitted by law, Smart Garage shall not be
          liable for indirect, incidental, special, consequential, or punitive
          damages, including loss of data, loss of profits, downtime, service
          interruption, or losses resulting from reliance on AI outputs.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>11. Termination</LegalH2>
        <LegalP className="mt-4">
          We may suspend, restrict, or terminate access to Smart Garage at our
          discretion if we believe a user has violated these Terms, misused the
          platform, or created risk to the service or its users.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>12. Changes to These Terms</LegalH2>
        <LegalP className="mt-4">
          We may revise these Terms &amp; Conditions from time to time. Updated
          versions may be posted through the website or application, and the
          revised version will become effective upon posting unless stated otherwise.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>13. Governing Law</LegalH2>
        <LegalP className="mt-4">
          These Terms shall be governed and interpreted in accordance with
          applicable laws. Any disputes related to Smart Garage shall be handled
          under the relevant legal framework applicable to the service and its
          operations.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>14. Contact</LegalH2>
        <LegalP className="mt-4">
          If you have questions about these Terms &amp; Conditions, you can contact
          us at{" "}
          <LegalA href="mailto:legal@smartgarage.website">
            legal@smartgarage.website
          </LegalA>
          .
        </LegalP>
      </LegalSection>
    </LegalPageLayout>
  );
}
import {
  LegalA,
  LegalH2,
  LegalH3,
  LegalLI,
  LegalP,
  LegalPageLayout,
  LegalSection,
  LegalStrong,
  LegalUL,
} from "@/features/legal/components/LegalPageLayout";

export function PrivacyPolicyPage() {
  return (
    <LegalPageLayout title="Privacy Policy" lastUpdated="April 09, 2026">
      <LegalSection>
        <LegalP>
          At Smart Garage, your privacy matters. This Privacy Policy explains how
          we collect, use, disclose, and protect information when you use our web
          application, mobile application, and related services.
        </LegalP>
        <LegalP className="mt-4">
          Smart Garage is designed to help users manage vehicles, reminders,
          expenses, mileage, profile information, and AI-assisted vehicle support.
          By using Smart Garage, you acknowledge that your information may be
          processed as described in this Privacy Policy.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>1. Information We Collect</LegalH2>

        <LegalH3 className="mt-5">1.1 Account Information</LegalH3>
        <LegalP className="mt-3">When you create or use an account, we may collect:</LegalP>
        <LegalUL className="mt-3">
          <LegalLI>Name and email address</LegalLI>
          <LegalLI>Authentication-related account identifiers</LegalLI>
          <LegalLI>Profile information you choose to provide</LegalLI>
        </LegalUL>

        <LegalH3 className="mt-6">1.2 Vehicle and Usage Information</LegalH3>
        <LegalP className="mt-3">
          To provide the core Smart Garage experience, we may collect and store:
        </LegalP>
        <LegalUL className="mt-3">
          <LegalLI>Vehicle make, model, year, and mileage information</LegalLI>
          <LegalLI>Maintenance reminders and due dates</LegalLI>
          <LegalLI>Expense logs, categories, and amounts</LegalLI>
          <LegalLI>Vehicle-specific usage and dashboard records</LegalLI>
        </LegalUL>

        <LegalH3 className="mt-6">1.3 AI Interaction Data</LegalH3>
        <LegalP className="mt-3">
          If you use AI-powered features, we may process:
        </LegalP>
        <LegalUL className="mt-3">
          <LegalLI>Your question or prompt</LegalLI>
          <LegalLI>Vehicle context associated with that question</LegalLI>
          <LegalLI>System-generated outputs related to the AI response</LegalLI>
        </LegalUL>

        <LegalH3 className="mt-6">1.4 Technical Information</LegalH3>
        <LegalP className="mt-3">
          We may also collect technical and device-related information needed to
          operate, protect, and improve the service, such as browser type,
          device type, and general diagnostic usage information.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>2. How We Use Your Information</LegalH2>
        <LegalP className="mt-4">We use information we collect to:</LegalP>
        <LegalUL className="mt-3">
          <LegalLI>Provide, maintain, and improve Smart Garage services</LegalLI>
          <LegalLI>Authenticate users and manage accounts</LegalLI>
          <LegalLI>Display and organize your vehicles, reminders, and expenses</LegalLI>
          <LegalLI>Support AI mechanic interactions and related features</LegalLI>
          <LegalLI>Respond to support requests and improve product reliability</LegalLI>
          <LegalLI>Protect the service against misuse, fraud, and security threats</LegalLI>
        </LegalUL>
      </LegalSection>

      <LegalSection>
        <LegalH2>3. Information Sharing</LegalH2>
        <LegalP className="mt-4">
          We do not sell your personal information. We may share information only
          as reasonably necessary in the following situations:
        </LegalP>
        <LegalUL className="mt-3">
          <LegalLI>
            <LegalStrong>Service providers:</LegalStrong> Infrastructure,
            hosting, authentication, analytics, and database providers that help
            us operate Smart Garage
          </LegalLI>
          <LegalLI>
            <LegalStrong>Legal obligations:</LegalStrong> When required by law,
            legal process, or governmental request
          </LegalLI>
          <LegalLI>
            <LegalStrong>Business transfers:</LegalStrong> In connection with a
            merger, acquisition, restructuring, or transfer of assets
          </LegalLI>
        </LegalUL>
      </LegalSection>

      <LegalSection>
        <LegalH2>4. Data Security</LegalH2>
        <LegalP className="mt-4">
          We take reasonable technical and organizational measures to help protect
          your information. However, no platform, database, transmission method,
          or online service can be guaranteed to be completely secure.
        </LegalP>
        <LegalP className="mt-4">
          You should avoid sharing information that is highly sensitive unless it
          is truly necessary for your use of the service.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>5. AI Feature Notice</LegalH2>
        <LegalP className="mt-4">
          Smart Garage may provide AI-assisted responses using your submitted
          vehicle context and question.
        </LegalP>
        <LegalP className="mt-4">
          AI-generated responses may be inaccurate, incomplete, or not suitable
          for final repair decisions. Important maintenance, safety, and repair
          actions should be verified by a qualified mechanic or professional.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>6. Your Rights and Choices</LegalH2>
        <LegalP className="mt-4">Depending on applicable law, you may have the right to:</LegalP>
        <LegalUL className="mt-3">
          <LegalLI>Access certain information associated with your account</LegalLI>
          <LegalLI>Update inaccurate profile or account information</LegalLI>
          <LegalLI>Request deletion of your account or certain stored data</LegalLI>
          <LegalLI>Object to or restrict certain forms of processing where applicable</LegalLI>
        </LegalUL>
      </LegalSection>

      <LegalSection>
        <LegalH2>7. Data Retention</LegalH2>
        <LegalP className="mt-4">
          We retain information for as long as reasonably necessary to provide the
          service, maintain records, resolve disputes, comply with legal
          obligations, and support legitimate business operations.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>8. Third-Party Services</LegalH2>
        <LegalP className="mt-4">
          Smart Garage may rely on or integrate with third-party services,
          including infrastructure, database, authentication, hosting, or related
          providers. Their handling of data may be governed by their own terms
          and privacy practices.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>9. Changes to This Policy</LegalH2>
        <LegalP className="mt-4">
          We may update this Privacy Policy from time to time. When material
          changes are made, we may revise the “Last updated” date and make the
          updated version available through the website or application.
        </LegalP>
      </LegalSection>

      <LegalSection>
        <LegalH2>10. Contact Us</LegalH2>
        <LegalP className="mt-4">
          If you have questions about this Privacy Policy or your information,
          you can contact us at{" "}
          <LegalA href="mailto:privacy@smartgarage.website">
            privacy@smartgarage.website
          </LegalA>
          .
        </LegalP>
      </LegalSection>
    </LegalPageLayout>
  );
}
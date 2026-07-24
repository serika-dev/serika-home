import type { Metadata } from 'next';
import { LegalPage, type Clause } from '../components/Legal';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How The Serika Company handles your data: privacy-first, open source, no sale of personal data and no AI training on your content.',
  alternates: { canonical: 'https://serika.dev/privacy' },
  robots: { index: true, follow: true },
};

const clauses: Clause[] = [
  {
    id: 'overview',
    heading: 'Overview',
    body: [
      'This Privacy Policy explains how The Serika Company (“Serika”, “we”, “us” or “our”) handles information when you use our websites, products and services (the “Services”). It applies to Serika as the operator of the Services described here.',
      'Serika is built privacy-first. We do not sell your personal data, and we do not train artificial intelligence models on the content you create or upload. Because much of our software is open source, you can inspect how it works.',
    ],
  },
  {
    id: 'scope',
    heading: 'Scope and service-specific policies',
    body: [
      'This is our overarching Privacy Policy. In addition, each individual Serika service has its own Privacy Policy that provides details specific to that service, alongside its own Terms of Service.',
      'You should review the privacy policy published on, or linked from, each Service you use. Where a service-specific policy provides more detail or differs in relation to that Service, the service-specific policy governs for that Service; this overarching policy applies in all other respects.',
    ],
  },
  {
    id: 'collect',
    heading: 'Information we collect',
    body: [
      'Information you provide: account details (such as a username and email), profile information, content you submit, and any messages you send us. Some Services may collect additional information described in their own policies.',
      'Information collected automatically: basic technical and usage data needed to operate and secure the Services, such as IP address, device and browser type, log data, timestamps, and general diagnostics. We aim to collect the minimum necessary.',
      'Information from third parties: where you choose to connect a third-party account or where a provider (for example, for authentication or infrastructure) shares limited information with us to deliver the Service.',
    ],
  },
  {
    id: 'use',
    heading: 'How we use information',
    body: [
      'We use information to provide, operate, maintain, secure and improve the Services; to create and manage accounts; to communicate with you about the Services; to prevent, detect and respond to fraud, abuse, security incidents and violations of our terms; and to comply with legal obligations.',
      'We do not use your content to train AI models, and we do not sell your personal data.',
    ],
  },
  {
    id: 'legal-basis',
    heading: 'Legal bases for processing',
    body: [
      'Where the GDPR or similar laws apply, we rely on: performance of a contract (to provide Services you request); our legitimate interests (to operate, secure and improve the Services), balanced against your rights; your consent (where required, for example for certain cookies or communications); and compliance with legal obligations. Where we rely on consent, you may withdraw it at any time.',
    ],
  },
  {
    id: 'cookies',
    heading: 'Cookies and similar technologies',
    body: [
      'We use cookies and similar technologies that are necessary to operate the Services (for example, to keep you signed in and to protect security), and, where applicable and permitted, a limited set for preferences or basic analytics. Where consent is required, we ask for it. You can control cookies through your browser settings, though disabling some may affect functionality.',
    ],
  },
  {
    id: 'sharing',
    heading: 'How we share information',
    body: [
      'We share personal data only where necessary: with service providers who process data on our behalf (such as hosting and infrastructure) under appropriate confidentiality and data-protection obligations; where required by law, legal process, or to protect the rights, safety and property of Serika, our users or the public; and in connection with a merger, acquisition, reorganisation or sale of assets, subject to this policy.',
      'We do not sell personal data, and we do not share it with third parties for their own independent marketing.',
    ],
  },
  {
    id: 'no-sale',
    heading: 'No sale of data, no AI training',
    body: [
      'We want to be explicit: we do not sell your personal data, we do not rent it, and we do not use the content you create or upload to train AI or machine-learning models. If this ever changes for a specific Service, it will be clearly disclosed in that Service’s own policy and, where required, we will seek your consent.',
    ],
  },
  {
    id: 'retention',
    heading: 'Data retention',
    body: [
      'We keep personal data only for as long as necessary to provide the Services, to fulfil the purposes described in this policy, and to comply with our legal obligations, resolve disputes and enforce our agreements. When data is no longer needed, we delete it or anonymise it.',
    ],
  },
  {
    id: 'security',
    heading: 'Security',
    body: [
      'We use reasonable technical and organisational measures designed to protect personal data against unauthorised access, loss, misuse or alteration. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security. You are responsible for keeping your account credentials safe.',
    ],
  },
  {
    id: 'transfers',
    heading: 'International transfers',
    body: [
      'We may process and store information in countries other than the one in which you live. Where personal data is transferred internationally, we take steps to ensure it is protected in accordance with applicable law, including using appropriate safeguards such as standard contractual clauses where required.',
    ],
  },
  {
    id: 'rights',
    heading: 'Your rights and choices',
    body: [
      'Depending on where you live, you may have rights to access, correct, delete or receive a copy of your personal data, to restrict or object to certain processing, to withdraw consent, and to lodge a complaint with a supervisory authority.',
      'You can exercise many of these rights through your account settings, or by contacting us through the channels linked in the footer. We will respond in accordance with applicable law and may need to verify your identity before acting.',
    ],
  },
  {
    id: 'children',
    heading: 'Children’s privacy',
    body: [
      'The Services are intended for users aged 16 and over, and some Services or sections require users to be 18 or over. They are not directed to children under these ages, and we do not knowingly collect personal data from them. If you believe someone under the applicable age has provided us with personal data, please contact us and we will take appropriate steps to delete it.',
    ],
  },
  {
    id: 'self-hosted',
    heading: 'Open-source and self-hosted instances',
    body: [
      'Where our open-source software is deployed or self-hosted by someone other than Serika, the operator of that instance — not Serika — is responsible for the data processed on it and acts as the data controller. This policy covers only the Services that Serika itself operates.',
    ],
  },
  {
    id: 'third-party-links',
    heading: 'Third-party links',
    body: [
      'The Services may link to third-party sites and services that we do not control. This policy does not apply to them; please review their own privacy policies.',
    ],
  },
  {
    id: 'changes',
    heading: 'Changes to this policy',
    body: [
      'We may update this Privacy Policy from time to time. When we make material changes, we will update the “Last updated” date above and, where appropriate, provide additional notice. Your continued use of the Services after changes become effective indicates acceptance of the updated policy.',
    ],
  },
  {
    id: 'contact',
    heading: 'Contact us',
    body: [
      'If you have questions about this Privacy Policy or how we handle your data, you can reach us through the community and contact channels linked in the footer of this site.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="24 July 2026"
      lead="Serika is built privacy-first. This policy explains what we collect, how we use it, and the choices you have. We don’t sell your data, and we don’t train AI models on the content you create."
      callout="Every Serika service has its own Privacy Policy and Terms of Service with details specific to it, in addition to this overarching policy. Where a service-specific policy differs for that service, it governs for that service."
      clauses={clauses}
    />
  );
}

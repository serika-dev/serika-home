import type { Metadata } from 'next';
import { LegalPage, type Clause } from '../components/Legal';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'The terms that govern your use of The Serika Company websites, products and services.',
  alternates: { canonical: 'https://serika.dev/terms' },
  robots: { index: true, follow: true },
};

const clauses: Clause[] = [
  {
    id: 'agreement',
    heading: 'Agreement to these terms',
    body: [
      'These Terms of Service (the “Terms”) form a binding legal agreement between you and The Serika Company (“Serika”, “we”, “us” or “our”) and govern your access to and use of our websites, applications, products and services (together, the “Services”).',
      'By accessing or using any part of the Services, or by clicking to accept these Terms where that option is presented, you confirm that you have read, understood and agree to be bound by these Terms and by our Privacy Policy, which is incorporated here by reference. If you do not agree, you must not access or use the Services.',
      'If you use the Services on behalf of an organisation, you represent that you are authorised to bind that organisation to these Terms, and “you” refers to that organisation.',
    ],
  },
  {
    id: 'services',
    heading: 'Our services',
    body: [
      'Serika designs, builds and operates a range of software products, which may include (without limitation) SerikaMoe, Serika Booru, Serika.chat, Serika Search, Serika Games, and various experimental or early-stage projects. The specific Services available to you may change over time.',
      'Some Services are early-stage, experimental or provided as previews. Such Services may be incomplete, may change or be withdrawn without notice, and may not perform as intended. You use them at your own risk.',
    ],
  },
  {
    id: 'service-terms',
    heading: 'Service-specific terms and policies',
    body: [
      'Each of our Services has its own Terms of Service and Privacy Policy that apply specifically to that Service, in addition to these overarching Terms and our overarching Privacy Policy.',
      'You should review the terms and privacy policy published on, or linked from, each individual Service before using it. Where a service-specific term conflicts with these Terms in relation to that Service, the service-specific term governs for that Service to the extent of the conflict. In all other respects these Terms continue to apply.',
      'Your use of any individual Service constitutes acceptance of that Service’s specific terms and privacy policy as well as these Terms.',
    ],
  },
  {
    id: 'eligibility',
    heading: 'Age requirements and accounts',
    body: [
      'All Serika Services require you to be at least 16 years old. Some Services — or certain sections or features within them, such as Serika Booru — require you to be at least 18 years old. You must meet the minimum age that applies to the Service and content you access, and be legally capable of entering into a contract.',
      'You must not misrepresent your age, and you must not attempt to bypass, circumvent or defeat any age gate, content rating, or access restriction, nor help or enable anyone else to do so. If we believe you have bypassed or attempted to bypass such restrictions, we may suspend or terminate all of your accounts across every Serika Service, without notice and at our sole discretion.',
      'Certain Services require a Serika account. You are responsible for providing accurate information, for keeping your credentials confidential, and for all activity that occurs under your account. You must notify us promptly of any unauthorised use. We may refuse, suspend or reclaim any account or username at our discretion.',
    ],
  },
  {
    id: 'acceptable-use',
    heading: 'Acceptable use',
    body: [
      'You agree not to misuse the Services. In particular, you must not: break any applicable law or regulation; infringe the intellectual property, privacy or other rights of others; upload or distribute unlawful, harmful, or infringing content; attempt to gain unauthorised access to any system, account or data; probe, scan, overload, disrupt or interfere with the Services or their security; introduce malware or automated abuse; scrape or harvest data except as expressly permitted; or use the Services to harass, exploit or harm others.',
      'We may investigate suspected violations and may remove content, restrict features, or suspend or terminate access, with or without notice, where we reasonably believe these Terms have been broken or to protect the Services, our users or third parties.',
    ],
  },
  {
    id: 'your-content',
    heading: 'Your content',
    body: [
      'You retain ownership of the content you create, upload or submit through the Services (“Your Content”). You are solely responsible for Your Content and for ensuring you have the rights necessary to share it.',
      'You grant Serika a worldwide, non-exclusive, royalty-free, sublicensable and transferable licence to host, store, reproduce, adapt, publish, transmit and display Your Content, but only to the extent necessary to operate, provide, secure and improve the Services and as permitted by the applicable service-specific terms and our Privacy Policy. This licence ends when Your Content is removed, except where it has been shared with others who have not removed it, or where we must retain it to comply with law.',
      'You represent and warrant that Your Content, and our permitted use of it, does not violate any law or infringe the rights of any third party. We may, but are not obliged to, review, moderate or remove content.',
    ],
  },
  {
    id: 'ip',
    heading: 'Intellectual property',
    body: [
      'The Services, including their software, design, text, graphics, logos and the “Serika” name and marks, are owned by Serika or our licensors and are protected by intellectual property laws. Except as expressly permitted, these Terms grant you no right to use our names, logos or branding.',
      'Where a Service, or part of it, is released as open source, your use of that source code is governed by the licence published with it. That licence applies to the code as licensed; it does not grant rights to our hosted Services, trademarks, or infrastructure, and these Terms continue to govern your use of any hosted Service.',
    ],
  },
  {
    id: 'third-party',
    heading: 'Third-party services and links',
    body: [
      'The Services may link to or interoperate with third-party websites, content or services that we do not control. We provide these for convenience and do not endorse them or accept responsibility for them. Your use of any third-party service is governed by that third party’s own terms and policies, and is at your own risk.',
    ],
  },
  {
    id: 'beta',
    heading: 'Beta, experimental and free features',
    body: [
      'We may offer features or Services labelled as beta, preview, experimental or otherwise pre-release, and we may offer Services free of charge. These are provided “as is”, may contain errors, may be changed, limited or discontinued at any time, and may carry a higher risk of loss of data or availability. To the maximum extent permitted by law, we have no liability arising from your use of such features or free Services.',
    ],
  },
  {
    id: 'availability',
    heading: 'Availability, changes and discontinuation',
    body: [
      'We do not guarantee that the Services will be uninterrupted, timely, secure, error-free or available at any particular time or location. We may modify, suspend, limit or discontinue any Service, feature or content, in whole or in part, at any time and without liability to you.',
      'Where practical and where required by law, we will give reasonable notice of material changes or discontinuation, but we are not obliged to do so.',
    ],
  },
  {
    id: 'disclaimers',
    heading: 'Disclaimer of warranties',
    body: [
      'To the maximum extent permitted by applicable law, the Services are provided “as is” and “as available”, with all faults and without warranties of any kind, whether express, implied or statutory. Serika expressly disclaims all implied warranties, including merchantability, fitness for a particular purpose, title, and non-infringement.',
      'We make no warranty that the Services will meet your requirements, be compatible with your systems, be secure, accurate or reliable, or that any errors will be corrected. Any material obtained through the Services is accessed at your own discretion and risk. Some jurisdictions do not allow certain warranty exclusions, so some of the above may not apply to you.',
    ],
  },
  {
    id: 'liability',
    heading: 'Limitation of liability',
    body: [
      'To the maximum extent permitted by applicable law, Serika and its owners, officers, employees, contributors and partners will not be liable for any indirect, incidental, special, consequential, exemplary or punitive damages, or for any loss of profits, revenue, data, goodwill or other intangible losses, arising out of or relating to your use of, or inability to use, the Services — whether based in contract, tort, negligence, strict liability or otherwise, and even if we have been advised of the possibility of such damages.',
      'To the maximum extent permitted by law, our total aggregate liability for all claims relating to the Services will not exceed the greater of (a) the total amount you paid us for the relevant Service in the three (3) months before the event giving rise to the liability, or (b) fifty euros (€50).',
      'Nothing in these Terms excludes or limits liability that cannot be excluded or limited under applicable law, such as liability for death or personal injury caused by negligence, or for fraud.',
    ],
  },
  {
    id: 'indemnity',
    heading: 'Indemnification',
    body: [
      'You agree to defend, indemnify and hold harmless Serika and its owners, officers, employees, contributors and partners from and against any claims, liabilities, damages, losses and expenses (including reasonable legal fees) arising out of or connected with: your use of the Services; Your Content; your breach of these Terms or any service-specific terms; or your violation of any law or the rights of any third party.',
    ],
  },
  {
    id: 'termination',
    heading: 'Suspension and termination',
    body: [
      'You may stop using the Services at any time. We may suspend or terminate your access to any or all of the Services at any time, with or without cause and with or without notice, including if we reasonably believe you have violated these Terms or created risk or legal exposure for us.',
      'Upon termination, your right to use the affected Services ends immediately. Provisions that by their nature should survive — including ownership, content licences, disclaimers, limitations of liability, indemnities and dispute terms — will survive termination.',
    ],
  },
  {
    id: 'governing-law',
    heading: 'Governing law and disputes',
    body: [
      'These Terms and any dispute arising out of or relating to them or the Services are governed by the laws of the Netherlands, without regard to conflict-of-law rules, and subject to any mandatory consumer-protection rights available to you in your country of residence.',
      'You agree that the competent courts located in the Netherlands will have jurisdiction over any dispute, except where applicable law grants you the right to bring proceedings in your local courts. You agree to first attempt to resolve any dispute with us informally by contacting us.',
    ],
  },
  {
    id: 'changes',
    heading: 'Changes to these terms',
    body: [
      'We may update these Terms from time to time. When we make material changes, we will update the “Last updated” date above and, where appropriate, provide additional notice. Changes take effect when posted unless stated otherwise. Your continued use of the Services after changes become effective constitutes acceptance of the revised Terms.',
    ],
  },
  {
    id: 'general',
    heading: 'General',
    body: [
      'These Terms, together with the applicable service-specific terms and our Privacy Policy, are the entire agreement between you and Serika regarding the Services and supersede any prior agreements. If any provision is found unenforceable, the remaining provisions remain in full force, and the unenforceable provision will be applied to the greatest extent permitted.',
      'Our failure to enforce any right or provision is not a waiver of it. You may not assign or transfer these Terms without our consent; we may assign them freely, including in connection with a merger, acquisition or sale of assets. There are no third-party beneficiaries to these Terms.',
    ],
  },
  {
    id: 'contact',
    heading: 'Contact us',
    body: [
      'If you have questions about these Terms, you can reach us through the community and contact channels linked in the footer of this site.',
    ],
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Service"
      updated="24 July 2026"
      lead="These Terms set out the rules for using Serika’s websites, products and services. Please read them carefully — they include important limitations on our liability and describe how each individual Service adds its own terms on top of these."
      callout="Every Serika service has its own Terms of Service and Privacy Policy that apply specifically to it, in addition to these overarching Terms. Where a service-specific term conflicts with these Terms for that service, the service-specific term governs for that service."
      clauses={clauses}
    />
  );
}

import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { ProgramsSection } from "@/components/programs-section";
import { PortfolioPreview } from "@/components/portfolio-preview";
import { StatsSection } from "@/components/stats-section";
import { WhyUsSection } from "@/components/why-us-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: "منصة الحكيم للخدمات الطلابية",
            alternateName: "Hakeem Platform",
            url: "https://hakeemplatform.com",
            telephone: "+966541896297",
            description:
              "منصة الحكيم للخدمات الطلابية - نقدم خدمات كتابة البحوث والمشاريع الجامعية والعروض التقديمية والتنسيق الأكاديمي لطلاب الجامعة السعودية الإلكترونية.",
            address: {
              "@type": "PostalAddress",
              addressCountry: "SA",
            },
            areaServed: {
              "@type": "Country",
              name: "Saudi Arabia",
            },
            sameAs: ["https://wa.me/966541896297"],
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "خدماتنا الأكاديمية",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "كتابة البحوث الأكاديمية",
                    description:
                      "إعداد بحوث أكاديمية شاملة وفق المعايير العلمية المعتمدة",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "المشاريع الجامعية",
                    description:
                      "تنفيذ المشاريع الجامعية بأعلى مستويات الجودة",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "العروض التقديمية",
                    description: "تصميم عروض تقديمية احترافية وجذابة",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "التنسيق الأكاديمي",
                    description:
                      "تنسيق الأبحاث والرسائل وفق الأنماط الأكاديمية المعتمدة",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "الخدمات البرمجية وتصميم المواقع",
                    description:
                      "تطوير وبرمجة المشاريع وإنشاء مواقع ويب احترافية",
                  },
                },
              ],
            },
          }),
        }}
      />
      <main>
        <Navbar />
        <HeroSection />
        <ServicesSection />
        <StatsSection />
        <ProgramsSection />
        <PortfolioPreview />
        <WhyUsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}

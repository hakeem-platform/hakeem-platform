"use client";

import { useEffect, useRef } from "react";
import {
  FileText,
  Presentation,
  BookOpen,
  AlignRight,
  Code,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: FileText,
    title: "كتابة البحوث الأكاديمية",
    description:
      "إعداد بحوث أكاديمية شاملة وفق المعايير العلمية المعتمدة، مع مراجعة شاملة وتوثيق دقيق للمراجع.",
  },
  {
    icon: BookOpen,
    title: "المشاريع الجامعية",
    description:
      "تنفيذ المشاريع الجامعية بأعلى مستويات الجودة والاحترافية، مع الالتزام بالمواعيد المحددة.",
  },
  {
    icon: Presentation,
    title: "العروض التقديمية",
    description:
      "تصميم عروض تقديمية احترافية وجذابة تعكس المحتوى الأكاديمي بأفضل صورة ممكنة.",
  },
  {
    icon: AlignRight,
    title: "التنسيق الأكاديمي",
    description:
      "تنسيق الأبحاث والرسائل وفق الأنماط الأكاديمية المعتمدة (APA, Harvard, MLA) بدقة متناهية.",
  },
  {
    icon: Code,
    title: "الخدمات البرمجية",
    description:
      "تطوير وبرمجة المشاريع البرمجية والتطبيقات المطلوبة ضمن المقررات الدراسية.",
  },
  {
    icon: Globe,
    title: "تصميم مواقع الويب",
    description:
      "إنشاء مواقع ويب احترافية وحديثة تناسب احتياجاتك الأكاديمية والشخصية.",
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll("[data-animate]");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-background relative"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            data-animate
            className="opacity-0 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary mb-6"
          >
            خدماتنا المتميزة
          </div>
          <h2
            data-animate
            className="opacity-0 stagger-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance"
          >
            خدمات أكاديمية شاملة لنجاحك
          </h2>
          <p
            data-animate
            className="opacity-0 stagger-2 text-lg text-muted-foreground leading-relaxed"
          >
            نوفر لك مجموعة متكاملة من الخدمات الأكاديمية والتقنية التي تساعدك
            على التميز في مسيرتك الدراسية
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <Card
              key={service.title}
              data-animate
              className={`opacity-0 stagger-${index + 1} group bg-card hover:bg-accent/50 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-2xl`}
            >
              <CardContent className="p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <service.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

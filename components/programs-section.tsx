"use client";

import { useEffect, useRef } from "react";
import { Heart, Stethoscope, BadgeCheck, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const programs = [
  {
    icon: Heart,
    title: "الماجستير التنفيذي لجودة الرعاية الصحية وسلامة المرضى",
    description:
      "نقدم دعماً أكاديمياً متخصصاً لطلاب برنامج الماجستير التنفيذي في جودة الرعاية الصحية وسلامة المرضى، بما يشمل إعداد البحوث والمشاريع التطبيقية.",
    features: [
      "بحوث جودة الرعاية الصحية",
      "مشاريع سلامة المرضى",
      "تحليل البيانات الصحية",
      "مراجعة الأدبيات العلمية",
    ],
  },
  {
    icon: Stethoscope,
    title: "برنامج الماجستير في إدارة الرعاية الصحية",
    description:
      "خدمات متكاملة لطلاب برنامج الماجستير في إدارة الرعاية الصحية، تشمل إعداد البحوث والتقارير والعروض التقديمية المتخصصة.",
    features: [
      "بحوث إدارة المستشفيات",
      "مشاريع التخطيط الصحي",
      "تقارير الجودة والأداء",
      "العروض التقديمية المتخصصة",
    ],
  },
];

export function ProgramsSection() {
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
      id="programs"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-muted/50 relative"
    >
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-primary via-secondary to-primary" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            data-animate
            className="opacity-0 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary mb-6"
          >
            البرامج المستهدفة
          </div>
          <h2
            data-animate
            className="opacity-0 stagger-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance"
          >
            متخصصون في الجامعة السعودية الإلكترونية
          </h2>
          <p
            data-animate
            className="opacity-0 stagger-2 text-lg text-muted-foreground leading-relaxed"
          >
            {"قسم الصحة العامة - نقدم خدماتنا المتخصصة لبرامج الماجستير التالية"}
          </p>
        </div>

        {/* Programs */}
        <div className="grid lg:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <div
              key={program.title}
              data-animate
              className={`opacity-0 stagger-${index + 1} group relative bg-card rounded-3xl border border-border p-8 lg:p-10 hover:shadow-2xl hover:border-primary/30 transition-all duration-300`}
            >
              {/* Icon */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <program.icon className="h-8 w-8" />
              </div>

              <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-4 leading-snug">
                {program.title}
              </h3>

              <p className="text-muted-foreground leading-relaxed mb-8">
                {program.description}
              </p>

              {/* Features */}
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {program.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm text-foreground"
                  >
                    <BadgeCheck className="h-5 w-5 text-primary flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <a href="#contact">
                <Button
                  variant="outline"
                  className="gap-2 border-primary/30 text-primary hover:bg-primary/5 bg-transparent"
                >
                  اطلب الخدمة
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

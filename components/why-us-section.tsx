"use client";

import { useEffect, useRef } from "react";
import {
  Shield,
  Target,
  Clock,
  MessageCircle,
  Award,
  Zap,
} from "lucide-react";

const reasons = [
  {
    icon: Award,
    title: "جودة عالية",
    description:
      "نلتزم بأعلى معايير الجودة الأكاديمية في كل عمل نقدمه، مع مراجعة دقيقة ومتعددة المراحل.",
  },
  {
    icon: Target,
    title: "دقة متناهية",
    description:
      "نهتم بأدق التفاصيل في البحوث والمشاريع، مع الالتزام الكامل بالمتطلبات والمعايير الأكاديمية.",
  },
  {
    icon: Shield,
    title: "سرية تامة",
    description:
      "نضمن السرية الكاملة لجميع المعلومات والأعمال، مع حماية خصوصية عملائنا بشكل مطلق.",
  },
  {
    icon: Clock,
    title: "التزام بالمواعيد",
    description:
      "نحرص على تسليم جميع الأعمال في الوقت المحدد، مع إمكانية التسليم العاجل عند الحاجة.",
  },
  {
    icon: MessageCircle,
    title: "تواصل مستمر",
    description:
      "نوفر قنوات تواصل مفتوحة ومستمرة لمتابعة سير العمل والإجابة على جميع استفساراتك.",
  },
  {
    icon: Zap,
    title: "خبرة متخصصة",
    description:
      "فريق متخصص في برامج الجامعة السعودية الإلكترونية مع خبرة واسعة في المجال الأكاديمي.",
  },
];

export function WhyUsSection() {
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
      id="why-us"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-muted/30 relative"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            data-animate
            className="opacity-0 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary mb-6"
          >
            لماذا تختارنا
          </div>
          <h2
            data-animate
            className="opacity-0 stagger-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance"
          >
            مميزات تجعلنا خيارك الأول
          </h2>
          <p
            data-animate
            className="opacity-0 stagger-2 text-lg text-muted-foreground leading-relaxed"
          >
            نجمع بين الخبرة الأكاديمية والتقنية لنقدم لك خدمات استثنائية تفوق
            توقعاتك
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              data-animate
              className={`opacity-0 stagger-${index + 1} flex gap-5 group`}
            >
              <div className="flex-shrink-0 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                <reason.icon className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {reason.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

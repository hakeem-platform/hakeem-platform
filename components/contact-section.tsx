"use client";

import { useEffect, useRef } from "react";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSection() {
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
      id="contact"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-background relative"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div>
              <div
                data-animate
                className="opacity-0 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary mb-6"
              >
                تواصل معنا
              </div>
              <h2
                data-animate
                className="opacity-0 stagger-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance"
              >
                جاهزون لمساعدتك في تحقيق التميز
              </h2>
              <p
                data-animate
                className="opacity-0 stagger-2 text-lg text-muted-foreground leading-relaxed"
              >
                تواصل معنا الآن للحصول على استشارة مجانية. فريقنا جاهز لمساعدتك
                في إعداد بحوثك ومشاريعك الأكاديمية بأعلى جودة ممكنة.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              <a
                href="tel:0541896297"
                data-animate
                className="opacity-0 stagger-3 flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all group"
              >
                <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-foreground">اتصل بنا مباشرة</p>
                  <p className="text-muted-foreground" dir="ltr">
                    054 189 6297
                  </p>
                </div>
              </a>

              <a
                href="https://wa.me/966541896297"
                target="_blank"
                rel="noopener noreferrer"
                data-animate
                className="opacity-0 stagger-4 flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all group"
              >
                <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-green-500/10 text-green-600 group-hover:bg-green-500 group-hover:text-green-50 transition-colors">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-foreground">واتساب</p>
                  <p className="text-muted-foreground">
                    راسلنا على الواتساب للرد السريع
                  </p>
                </div>
              </a>

              <a
                href="mailto:info@hakeemplatform.com"
                data-animate
                className="opacity-0 stagger-5 flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all group"
              >
                <div className="flex h-13 w-13 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-bold text-foreground">البريد الإلكتروني</p>
                  <p className="text-muted-foreground" dir="ltr">
                    info@hakeemplatform.com
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* CTA Card */}
          <div
            data-animate
            className="opacity-0 stagger-3"
          >
            <div className="relative bg-primary rounded-3xl p-10 lg:p-12 text-primary-foreground overflow-hidden">
              {/* Decorative */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-primary-foreground/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-secondary/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

              <div className="relative space-y-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/10">
                  <MapPin className="h-8 w-8" />
                </div>

                <h3 className="text-2xl lg:text-3xl font-bold leading-snug">
                  ابدأ رحلة التميز الأكاديمي الآن
                </h3>

                <p className="text-primary-foreground/80 leading-relaxed text-lg">
                  لا تتردد في التواصل معنا. نحن هنا لمساعدتك في تحقيق أهدافك
                  الأكاديمية بأعلى مستويات الجودة والاحترافية.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <a href="https://wa.me/966541896297" target="_blank" rel="noopener noreferrer">
                    <Button
                      size="lg"
                      className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-base px-8 py-6 gap-2 shadow-lg"
                    >
                      <MessageCircle className="h-5 w-5" />
                      واتساب الآن
                    </Button>
                  </a>
                  <a href="tel:0541896297">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 py-6 gap-2 bg-transparent"
                    >
                      <Phone className="h-5 w-5" />
                      اتصل بنا
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

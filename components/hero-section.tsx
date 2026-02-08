"use client";

import { useEffect, useRef } from "react";
import {
  ArrowLeft,
  Phone,
  BookOpen,
  Award,
  Shield,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

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

    const elements = heroRef.current?.querySelectorAll("[data-animate]");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-bl from-accent via-background to-muted" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23000000' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8">
            <div
              data-animate
              className="opacity-0 inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2.5 text-sm font-semibold text-primary border border-primary/20"
            >
              <Sparkles className="h-4 w-4" />
              <span>متخصصون في الجامعة السعودية الإلكترونية</span>
            </div>

            <h1
              data-animate
              className="opacity-0 stagger-1 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground text-balance"
            >
              شريكك الأكاديمي نحو{" "}
              <span className="text-primary relative">
                التميّز
                <svg
                  className="absolute -bottom-2 right-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8C50 2 150 2 198 8"
                    stroke="hsl(43, 96%, 56%)"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>{" "}
              والنجاح
            </h1>

            <p
              data-animate
              className="opacity-0 stagger-2 text-lg sm:text-xl leading-relaxed text-muted-foreground max-w-xl"
            >
              نقدم خدمات كتابة البحوث والمشاريع الجامعية والعروض التقديمية
              والتنسيق الأكاديمي وفق أعلى المعايير المعتمدة. نلتزم بالجودة
              والدقة والسرية التامة لمساعدتك على التفوق.
            </p>

            <div
              data-animate
              className="opacity-0 stagger-3 flex flex-wrap gap-4"
            >
              <a href="#contact">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all text-base px-8 py-6 gap-2"
                >
                  ابدأ الآن
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </a>
              <a href="tel:0541896297">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-primary/30 text-primary hover:bg-primary/5 text-base px-8 py-6 gap-2 bg-transparent"
                >
                  <Phone className="h-5 w-5" />
                  تواصل معنا
                </Button>
              </a>
            </div>

            {/* Trust Badges */}
            <div
              data-animate
              className="opacity-0 stagger-4 flex flex-wrap gap-6 pt-4"
            >
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <span>سرية تامة</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Award className="h-4 w-4 text-primary" />
                </div>
                <span>جودة عالية</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-4 w-4 text-primary" />
                </div>
                <span>معايير أكاديمية</span>
              </div>
            </div>
          </div>

          {/* Visual Card */}
          <div
            data-animate
            className="opacity-0 stagger-3 hidden lg:block"
          >
            <div className="relative">
              {/* Main Card */}
              <div className="relative bg-card rounded-3xl shadow-2xl border border-border p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <BookOpen className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg">
                      خدمات أكاديمية متكاملة
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      بحوث - مشاريع - عروض تقديمية
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { label: "البحوث الأكاديمية", value: 95 },
                    { label: "المشاريع الجامعية", value: 88 },
                    { label: "العروض التقديمية", value: 92 },
                  ].map((item) => (
                    <div key={item.label} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground font-medium">
                          {item.label}
                        </span>
                        <span className="text-primary font-bold">
                          {item.value}%
                        </span>
                      </div>
                      <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-l from-primary to-primary/70 transition-all duration-1000"
                          style={{ width: `${item.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">+500</p>
                    <p className="text-xs text-muted-foreground">مشروع مكتمل</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">+300</p>
                    <p className="text-xs text-muted-foreground">عميل سعيد</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">100%</p>
                    <p className="text-xs text-muted-foreground">رضا العملاء</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-4 -left-4 bg-secondary text-secondary-foreground rounded-2xl px-5 py-3 shadow-lg animate-float">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  <span className="font-bold text-sm">جودة مضمونة</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

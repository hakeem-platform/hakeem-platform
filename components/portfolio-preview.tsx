"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface Work {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
}

function WorkCard({ work }: { work: Work }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (work.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % work.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [work.images.length]);

  return (
    <Card className="group overflow-hidden rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 bg-card">
      {/* Image Carousel */}
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {work.images.length > 0 ? (
          <>
            {work.images.map((img, i) => (
              <img
                key={img}
                src={img || "/placeholder.svg"}
                alt={`${work.title} - صورة ${i + 1}`}
                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                  i === currentImage ? "opacity-100" : "opacity-0"
                }`}
                loading="lazy"
              />
            ))}
            {work.images.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {work.images.map((_, i) => (
                  <button
                    key={`dot-${work.id}-${i}`}
                    type="button"
                    className={`h-1.5 rounded-full transition-all ${
                      i === currentImage
                        ? "w-6 bg-primary-foreground"
                        : "w-1.5 bg-primary-foreground/50"
                    }`}
                    onClick={() => setCurrentImage(i)}
                    aria-label={`صورة ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full items-center justify-center bg-muted">
            <span className="text-muted-foreground text-sm">لا توجد صورة</span>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <span className="inline-block rounded-lg bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-sm">
            {work.category === "research"
              ? "بحث أكاديمي"
              : work.category === "project"
                ? "مشروع جامعي"
                : work.category === "presentation"
                  ? "عرض تقديمي"
                  : work.category === "website"
                    ? "موقع ويب"
                    : "عام"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-1">
          {work.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
          {work.description}
        </p>
        <Link href={`/portfolio/${work.id}`}>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 w-full border-primary/20 text-primary hover:bg-primary/5 bg-transparent"
          >
            عرض التفاصيل
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}

export function PortfolioPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [works, setWorks] = useState<Work[]>([]);

  const fetchFeaturedWorks = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("works")
      .select("id, title, description, images, category")
      .eq("is_featured", true)
      .order("created_at", { ascending: false })
      .limit(6);
    if (data) setWorks(data);
  }, []);

  useEffect(() => {
    fetchFeaturedWorks();
  }, [fetchFeaturedWorks]);

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

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 340;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-24 lg:py-32 bg-background relative"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-12">
          <div>
            <div
              data-animate
              className="opacity-0 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary mb-6"
            >
              من أعمالنا
            </div>
            <h2
              data-animate
              className="opacity-0 stagger-1 text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground text-balance"
            >
              نماذج من إنجازاتنا
            </h2>
          </div>
          <div data-animate className="opacity-0 stagger-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => scroll("right")}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-foreground hover:bg-accent hover:border-primary/30 transition-colors"
              aria-label="التمرير لليمين"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scroll("left")}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-card text-foreground hover:bg-accent hover:border-primary/30 transition-colors"
              aria-label="التمرير لليسار"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <Link href="/portfolio">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
                عرض الكل
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Works Carousel or Empty State */}
        {works.length > 0 ? (
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {works.map((work) => (
              <div
                key={work.id}
                className="min-w-[300px] sm:min-w-[340px] snap-start"
              >
                <WorkCard work={work} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-muted/50 rounded-3xl border border-border">
            <div className="mx-auto max-w-md space-y-4">
              <div className="h-16 w-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
                <ArrowLeft className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                أعمالنا قادمة قريباً
              </h3>
              <p className="text-muted-foreground">
                نعمل حالياً على إضافة نماذج من أعمالنا المتميزة. تابعنا للاطلاع
                على آخر إنجازاتنا.
              </p>
              <a href="#contact">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4">
                  تواصل معنا الآن
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

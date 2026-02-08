"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface Work {
  id: string;
  title: string;
  description: string;
  images: string[];
  category: string;
  created_at: string;
}

const categories = [
  { value: "all", label: "الكل" },
  { value: "research", label: "بحوث أكاديمية" },
  { value: "project", label: "مشاريع جامعية" },
  { value: "presentation", label: "عروض تقديمية" },
  { value: "website", label: "مواقع ويب" },
  { value: "general", label: "أخرى" },
];

function WorkCard({ work }: { work: Work }) {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    if (work.images.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % work.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [work.images.length]);

  const categoryLabel =
    categories.find((c) => c.value === work.category)?.label || "عام";

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
            {categoryLabel}
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

export function PortfolioGrid({ initialWorks }: { initialWorks: Work[] }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredWorks =
    activeCategory === "all"
      ? initialWorks
      : initialWorks.filter((w) => w.category === activeCategory);

  return (
    <section className="py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <Filter className="h-5 w-5 text-muted-foreground" />
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat.value
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-foreground border border-border hover:border-primary/30"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filteredWorks.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredWorks.map((work) => (
              <WorkCard key={work.id} work={work} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/50 rounded-3xl border border-border">
            <div className="mx-auto max-w-md space-y-4">
              <h3 className="text-xl font-bold text-foreground">
                لا توجد أعمال حالياً
              </h3>
              <p className="text-muted-foreground">
                {activeCategory !== "all"
                  ? "لا توجد أعمال في هذا التصنيف. جرب تصنيفاً آخر."
                  : "نعمل على إضافة أعمالنا قريباً. تابعنا!"}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Calendar,
  Tag,
  FileDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Work {
  id: string;
  title: string;
  description: string;
  details: string | null;
  images: string[];
  files: string[];
  category: string;
  created_at: string;
}

const categoryLabels: Record<string, string> = {
  research: "بحث أكاديمي",
  project: "مشروع جامعي",
  presentation: "عرض تقديمي",
  website: "موقع ويب",
  general: "عام",
};

export function WorkDetails({ work }: { work: Work }) {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % work.images.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + work.images.length) % work.images.length
    );
  };

  return (
    <div className="py-12 lg:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link
            href="/"
            className="hover:text-primary transition-colors"
          >
            الرئيسية
          </Link>
          <span>/</span>
          <Link
            href="/portfolio"
            className="hover:text-primary transition-colors"
          >
            أعمالنا
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium line-clamp-1">
            {work.title}
          </span>
        </nav>

        {/* Image Gallery */}
        {work.images.length > 0 && (
          <div className="relative mb-10 rounded-3xl overflow-hidden bg-muted border border-border">
            <div className="relative aspect-[16/9]">
              {work.images.map((img, i) => (
                <img
                  key={img}
                  src={img || "/placeholder.svg"}
                  alt={`${work.title} - صورة ${i + 1}`}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
                    i === currentImage ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
            </div>

            {work.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-xl bg-card/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-card transition-colors shadow-md"
                  aria-label="الصورة السابقة"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-xl bg-card/90 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-card transition-colors shadow-md"
                  aria-label="الصورة التالية"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                {/* Thumbnails */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {work.images.map((img, i) => (
                    <button
                      key={`thumb-${work.id}-${i}`}
                      type="button"
                      onClick={() => setCurrentImage(i)}
                      className={`h-12 w-16 rounded-lg overflow-hidden border-2 transition-all ${
                        i === currentImage
                          ? "border-primary shadow-lg scale-110"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`صورة مصغرة ${i + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Content */}
        <article className="space-y-8">
          {/* Meta */}
          <div className="flex flex-wrap gap-4 items-center">
            <span className="inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              <Tag className="h-4 w-4" />
              {categoryLabels[work.category] || "عام"}
            </span>
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {new Date(work.created_at).toLocaleDateString("ar-SA", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground text-balance">
            {work.title}
          </h1>

          {/* Description */}
          <div className="bg-muted/50 rounded-2xl p-6 lg:p-8 border border-border">
            <h2 className="text-lg font-bold text-foreground mb-3">
              وصف العمل
            </h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {work.description}
            </p>
          </div>

          {/* Details */}
          {work.details && (
            <div className="prose prose-lg max-w-none">
              <h2 className="text-lg font-bold text-foreground mb-3">
                التفاصيل
              </h2>
              <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {work.details}
              </div>
            </div>
          )}

          {/* Files */}
          {work.files && work.files.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
                <FileDown className="h-5 w-5 text-primary" />
                الملفات المرفقة
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {work.files.map((file, i) => {
                  const fileName = file.split("/").pop() || `ملف ${i + 1}`;
                  return (
                    <a
                      key={`file-${work.id}-${i}`}
                      href={file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all group"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Download className="h-5 w-5" />
                      </div>
                      <span className="text-sm font-medium text-foreground truncate">
                        {fileName}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}

          {/* Back */}
          <div className="pt-6 border-t border-border">
            <Link href="/portfolio">
              <Button
                variant="outline"
                className="gap-2 border-primary/20 text-primary hover:bg-primary/5 bg-transparent"
              >
                <ArrowRight className="h-4 w-4" />
                العودة لمعرض الأعمال
              </Button>
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}

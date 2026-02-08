import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PortfolioGrid } from "@/components/portfolio-grid";

export const metadata: Metadata = {
  title: "أعمالنا | منصة الحكيم للخدمات الطلابية",
  description:
    "استعرض نماذج من أعمالنا المتميزة في كتابة البحوث الأكاديمية والمشاريع الجامعية والعروض التقديمية. منصة الحكيم للخدمات الطلابية.",
  keywords: [
    "أعمال أكاديمية",
    "نماذج بحوث",
    "مشاريع جامعية",
    "عروض تقديمية",
    "منصة الحكيم",
  ],
  openGraph: {
    title: "أعمالنا | منصة الحكيم للخدمات الطلابية",
    description:
      "استعرض نماذج من أعمالنا المتميزة في كتابة البحوث والمشاريع الجامعية.",
    url: "https://hakeemplatform.com/portfolio",
  },
  alternates: {
    canonical: "https://hakeemplatform.com/portfolio",
  },
};

export default async function PortfolioPage() {
  const supabase = await createClient();
  const { data: works } = await supabase
    .from("works")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        {/* Page Header */}
        <section className="py-16 lg:py-20 bg-muted/50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary mb-6">
              معرض الأعمال
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
              نماذج من إنجازاتنا المتميزة
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              اكتشف مجموعة من أعمالنا في مختلف المجالات الأكاديمية والتقنية
              التي نفخر بتقديمها لعملائنا
            </p>
          </div>
        </section>

        <PortfolioGrid initialWorks={works || []} />
      </main>
      <Footer />
    </>
  );
}

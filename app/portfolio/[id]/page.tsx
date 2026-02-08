import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { WorkDetails } from "@/components/work-details";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();
  const { data: work } = await supabase
    .from("works")
    .select("title, description")
    .eq("id", id)
    .single();

  if (!work) {
    return { title: "العمل غير موجود" };
  }

  return {
    title: work.title,
    description: work.description,
    openGraph: {
      title: `${work.title} | منصة الحكيم للخدمات الطلابية`,
      description: work.description,
      url: `https://hakeemplatform.com/portfolio/${id}`,
    },
    alternates: {
      canonical: `https://hakeemplatform.com/portfolio/${id}`,
    },
  };
}

export default async function WorkPage({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: work } = await supabase
    .from("works")
    .select("*")
    .eq("id", id)
    .single();

  if (!work) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24">
        <WorkDetails work={work} />
      </main>
      <Footer />
    </>
  );
}

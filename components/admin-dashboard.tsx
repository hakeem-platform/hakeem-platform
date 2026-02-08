"use client";

import React from "react"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  GraduationCap,
  Plus,
  Pencil,
  Trash2,
  Star,
  StarOff,
  LogOut,
  FolderOpen,
  Eye,
  Home,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface Work {
  id: string;
  title: string;
  description: string;
  details: string | null;
  images: string[];
  files: string[];
  is_featured: boolean;
  category: string;
  created_at: string;
  updated_at: string;
}

const categoryOptions = [
  { value: "research", label: "بحث أكاديمي" },
  { value: "project", label: "مشروع جامعي" },
  { value: "presentation", label: "عرض تقديمي" },
  { value: "website", label: "موقع ويب" },
  { value: "general", label: "عام" },
];

function WorkForm({
  work,
  onSave,
  onCancel,
}: {
  work?: Work;
  onSave: () => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState(work?.title || "");
  const [description, setDescription] = useState(work?.description || "");
  const [details, setDetails] = useState(work?.details || "");
  const [category, setCategory] = useState(work?.category || "general");
  const [isFeatured, setIsFeatured] = useState(work?.is_featured || false);
  const [imageUrls, setImageUrls] = useState(
    work?.images?.join("\n") || ""
  );
  const [fileUrls, setFileUrls] = useState(work?.files?.join("\n") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const supabase = createClient();

    const images = imageUrls
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);
    const files = fileUrls
      .split("\n")
      .map((u) => u.trim())
      .filter(Boolean);

    const payload = {
      title,
      description,
      details: details || null,
      images,
      files,
      category,
      is_featured: isFeatured,
      updated_at: new Date().toISOString(),
    };

    try {
      if (work) {
        const { error: err } = await supabase
          .from("works")
          .update(payload)
          .eq("id", work.id);
        if (err) throw err;
      } else {
        const { error: err } = await supabase.from("works").insert(payload);
        if (err) throw err;
      }
      onSave();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "حدث خطأ");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <CardHeader className="flex flex-row items-center justify-between border-b border-border pb-4">
          <CardTitle className="text-xl font-bold text-foreground">
            {work ? "تعديل العمل" : "إضافة عمل جديد"}
          </CardTitle>
          <button
            type="button"
            onClick={onCancel}
            className="h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            aria-label="إغلاق"
          >
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label className="text-foreground">عنوان العمل *</Label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="أدخل عنوان العمل"
                className="h-12 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">وصف العمل *</Label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                placeholder="أدخل وصفاً مختصراً للعمل"
                rows={3}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">
                {"التفاصيل (اختياري)"}
              </Label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="أدخل تفاصيل إضافية عن العمل"
                rows={4}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">التصنيف</Label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-12 rounded-xl border border-input bg-background px-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">
                {"روابط الصور (كل رابط في سطر)"}
              </Label>
              <textarea
                value={imageUrls}
                onChange={(e) => setImageUrls(e.target.value)}
                placeholder={"https://example.com/image1.jpg\nhttps://example.com/image2.jpg"}
                rows={3}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                dir="ltr"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">
                {"روابط الملفات المرفقة (اختياري - كل رابط في سطر)"}
              </Label>
              <textarea
                value={fileUrls}
                onChange={(e) => setFileUrls(e.target.value)}
                placeholder={"https://example.com/file1.pdf\nhttps://example.com/file2.docx"}
                rows={2}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                dir="ltr"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsFeatured(!isFeatured)}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  isFeatured ? "bg-primary" : "bg-muted"
                }`}
                role="switch"
                aria-checked={isFeatured}
                aria-label="عرض في الصفحة الرئيسية"
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow-md transition-transform ${
                    isFeatured ? "right-0.5" : "right-[22px]"
                  }`}
                />
              </button>
              <Label className="text-foreground cursor-pointer">
                عرض في الصفحة الرئيسية (مميز)
              </Label>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-sm text-destructive">
                {error}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? "جارٍ الحفظ..." : work ? "تحديث" : "إضافة"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="h-12 rounded-xl bg-transparent"
              >
                إلغاء
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export function AdminDashboard({ initialWorks }: { initialWorks: Work[] }) {
  const router = useRouter();
  const [works, setWorks] = useState(initialWorks);
  const [showForm, setShowForm] = useState(false);
  const [editingWork, setEditingWork] = useState<Work | undefined>();
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const refreshWorks = async () => {
    const supabase = createClient();
    const { data } = await supabase
      .from("works")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setWorks(data);
  };

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
  };

  const toggleFeatured = async (work: Work) => {
    const supabase = createClient();
    await supabase
      .from("works")
      .update({ is_featured: !work.is_featured })
      .eq("id", work.id);
    await refreshWorks();
  };

  const deleteWork = async (id: string) => {
    const supabase = createClient();
    await supabase.from("works").delete().eq("id", id);
    setDeleteConfirm(null);
    await refreshWorks();
  };

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h1 className="text-base font-bold text-foreground">
                  لوحة التحكم
                </h1>
                <p className="text-xs text-muted-foreground">
                  منصة الحكيم للخدمات الطلابية
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-transparent"
                >
                  <Home className="h-4 w-4" />
                  <span className="hidden sm:inline">الرئيسية</span>
                </Button>
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2 text-destructive hover:text-destructive bg-transparent"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">خروج</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="rounded-2xl">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FolderOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {works.length}
                </p>
                <p className="text-sm text-muted-foreground">إجمالي الأعمال</p>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                <Star className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {works.filter((w) => w.is_featured).length}
                </p>
                <p className="text-sm text-muted-foreground">أعمال مميزة</p>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {works.filter((w) => w.images.length > 0).length}
                </p>
                <p className="text-sm text-muted-foreground">مع صور</p>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl col-span-2 lg:col-span-1">
            <CardContent className="p-5 flex items-center justify-center">
              <Button
                onClick={() => {
                  setEditingWork(undefined);
                  setShowForm(true);
                }}
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
              >
                <Plus className="h-5 w-5" />
                إضافة عمل جديد
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Works List */}
        <Card className="rounded-2xl">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-lg font-bold text-foreground">
              إدارة الأعمال
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {works.length > 0 ? (
              <div className="divide-y divide-border">
                {works.map((work) => (
                  <div
                    key={work.id}
                    className="flex items-center gap-4 p-5 hover:bg-muted/50 transition-colors"
                  >
                    {/* Thumbnail */}
                    <div className="hidden sm:block h-16 w-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      {work.images.length > 0 ? (
                        <img
                          src={work.images[0] || "/placeholder.svg"}
                          alt={work.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                          <FolderOpen className="h-6 w-6" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-foreground truncate">
                          {work.title}
                        </h3>
                        {work.is_featured && (
                          <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {work.description}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                          {categoryOptions.find(
                            (c) => c.value === work.category
                          )?.label || "عام"}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(work.created_at).toLocaleDateString(
                            "ar-SA"
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleFeatured(work)}
                        className={`h-9 w-9 rounded-lg flex items-center justify-center transition-colors ${
                          work.is_featured
                            ? "text-yellow-500 hover:bg-yellow-50"
                            : "text-muted-foreground hover:bg-muted"
                        }`}
                        title={
                          work.is_featured
                            ? "إزالة من المميز"
                            : "إضافة للمميز"
                        }
                        aria-label={
                          work.is_featured
                            ? "إزالة من المميز"
                            : "إضافة للمميز"
                        }
                      >
                        {work.is_featured ? (
                          <Star className="h-4 w-4 fill-current" />
                        ) : (
                          <StarOff className="h-4 w-4" />
                        )}
                      </button>
                      <Link href={`/portfolio/${work.id}`}>
                        <button
                          type="button"
                          className="h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                          title="معاينة"
                          aria-label="معاينة"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingWork(work);
                          setShowForm(true);
                        }}
                        className="h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        title="تعديل"
                        aria-label="تعديل"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirm(work.id)}
                        className="h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                        title="حذف"
                        aria-label="حذف"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 space-y-4">
                <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground" />
                <h3 className="text-lg font-bold text-foreground">
                  لا توجد أعمال بعد
                </h3>
                <p className="text-muted-foreground">
                  ابدأ بإضافة أعمالك لعرضها في الموقع
                </p>
                <Button
                  onClick={() => {
                    setEditingWork(undefined);
                    setShowForm(true);
                  }}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
                >
                  <Plus className="h-5 w-5" />
                  إضافة أول عمل
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Work Form Modal */}
      {showForm && (
        <WorkForm
          work={editingWork}
          onSave={() => {
            setShowForm(false);
            setEditingWork(undefined);
            refreshWorks();
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingWork(undefined);
          }}
        />
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="w-full max-w-sm rounded-2xl">
            <CardContent className="p-6 text-center space-y-4">
              <div className="h-14 w-14 mx-auto rounded-2xl bg-destructive/10 flex items-center justify-center">
                <Trash2 className="h-7 w-7 text-destructive" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                حذف العمل
              </h3>
              <p className="text-muted-foreground">
                هل أنت متأكد من حذف هذا العمل؟ لا يمكن التراجع عن هذا الإجراء.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => deleteWork(deleteConfirm)}
                  className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  نعم، احذف
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setDeleteConfirm(null)}
                  className="flex-1 bg-transparent"
                >
                  إلغاء
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

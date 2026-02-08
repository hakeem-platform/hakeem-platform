import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="text-center space-y-6 max-w-md">
        <div className="text-8xl font-bold text-primary/20">404</div>
        <h1 className="text-3xl font-bold text-foreground">
          الصفحة غير موجودة
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Link href="/">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2">
              <Home className="h-5 w-5" />
              الصفحة الرئيسية
            </Button>
          </Link>
          <Link href="/portfolio">
            <Button
              variant="outline"
              className="gap-2 border-primary/20 text-primary hover:bg-primary/5 bg-transparent"
            >
              <ArrowRight className="h-5 w-5" />
              استعرض أعمالنا
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

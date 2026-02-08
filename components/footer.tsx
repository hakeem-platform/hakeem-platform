import Link from "next/link";
import {
  GraduationCap,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";

const quickLinks = [
  { href: "#services", label: "خدماتنا" },
  { href: "#programs", label: "البرامج" },
  { href: "/portfolio", label: "أعمالنا" },
  { href: "#why-us", label: "لماذا نحن" },
  { href: "#contact", label: "تواصل معنا" },
];

const services = [
  "كتابة البحوث الأكاديمية",
  "المشاريع الجامعية",
  "العروض التقديمية",
  "التنسيق الأكاديمي",
  "الخدمات البرمجية",
  "تصميم مواقع الويب",
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-background leading-tight">
                  منصة الحكيم
                </span>
                <span className="text-xs text-background/60 leading-tight">
                  للخدمات الطلابية
                </span>
              </div>
            </Link>
            <p className="text-background/70 leading-relaxed text-sm">
              شريكك الأكاديمي نحو التميز والنجاح. نقدم خدمات أكاديمية متكاملة
              لطلاب الجامعة السعودية الإلكترونية بجودة عالية وسرية تامة.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base font-bold text-background mb-5">
              روابط سريعة
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-base font-bold text-background mb-5">
              خدماتنا
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-sm text-background/70">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-base font-bold text-background mb-5">
              تواصل معنا
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:0541896297"
                  className="flex items-center gap-3 text-sm text-background/70 hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  <span dir="ltr">054 189 6297</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/966541896297"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-background/70 hover:text-primary transition-colors"
                >
                  <MessageCircle className="h-4 w-4 flex-shrink-0" />
                  <span>واتساب</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@hakeemplatform.com"
                  className="flex items-center gap-3 text-sm text-background/70 hover:text-primary transition-colors"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  <span dir="ltr">info@hakeemplatform.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-background/50">
            {"جميع الحقوق محفوظة"} &copy; {new Date().getFullYear()}{" "}
            {"منصة الحكيم للخدمات الطلابية"}
          </p>
          <p className="text-sm text-background/50">
            <a
              href="https://hakeemplatform.com"
              className="hover:text-primary transition-colors"
            >
              hakeemplatform.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

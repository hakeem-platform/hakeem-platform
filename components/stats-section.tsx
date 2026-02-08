"use client";

import { useEffect, useRef, useState } from "react";
import { Users, FolderCheck, Star, Clock } from "lucide-react";

const stats = [
  { icon: FolderCheck, value: 500, suffix: "+", label: "مشروع مكتمل" },
  { icon: Users, value: 300, suffix: "+", label: "عميل سعيد" },
  { icon: Star, value: 100, suffix: "%", label: "رضا العملاء" },
  { icon: Clock, value: 24, suffix: "/7", label: "دعم متواصل" },
];

function AnimatedCounter({
  target,
  suffix,
  isVisible,
}: {
  target: number;
  suffix: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target]);

  return (
    <span className="text-4xl sm:text-5xl font-bold text-primary-foreground" dir="ltr">
      {count}
      {suffix}
    </span>
  );
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-primary relative overflow-hidden"
    >
      {/* Decorative */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center space-y-3">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10 mb-2">
                <stat.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                />
              </div>
              <p className="text-primary-foreground/80 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

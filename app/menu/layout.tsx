import type { ReactNode } from "react";

export default function MenuLayout({ children }: { children: ReactNode }) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-yellow-50 to-red-50">
      <div className="py-8">
        <div className="mx-auto max-w-5xl rounded-xl bg-white/80 p-6 shadow-lg">
          {children}
        </div>
      </div>
    </section>
  );
}

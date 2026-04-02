"use client";

import dynamic from "next/dynamic";

const GradientBlob = dynamic(() => import("@/components/ui/GradientBlob"), {
  ssr: false,
});

export default function GradientBackground() {
  return (
    <div className="fixed inset-0 z-0">
      <GradientBlob />
    </div>
  );
}

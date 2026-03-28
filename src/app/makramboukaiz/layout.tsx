import SmoothScroll from "@/components/layout/SmoothScroll";

export default function MakramLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScroll>
      <main>{children}</main>
    </SmoothScroll>
  );
}

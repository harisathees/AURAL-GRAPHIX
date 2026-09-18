import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { PreTitle } from "@/components/ui/PreTitle";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for doesn't exist or has been moved.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="grid min-h-[80vh] w-full place-items-center px-5 pt-[140px] pb-24">
      <div className="flex max-w-[520px] flex-col items-center gap-5 text-center">
        <PreTitle boxed>Something went wrong</PreTitle>
        <p className="text-[72px] leading-none font-semibold tracking-[-0.05em] text-brand lg:text-[104px]">404</p>
        <h1 className="t-h2">Page not found</h1>
        <p className="t-medium">The page you are looking for doesn&rsquo;t exist or has been moved.</p>
        <Button href="/" variant="brand" className="mt-2">
          Back to home
        </Button>
      </div>
    </section>
  );
}

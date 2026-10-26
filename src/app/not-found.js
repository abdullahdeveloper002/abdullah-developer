import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="bg-dots">
      <div className="container-page flex min-h-[80vh] flex-col items-start justify-center py-32">
        <p className="font-mono text-lime-deep">404</p>
        <h1 id="not-found-title" className="mt-3 text-4xl font-semibold sm:text-6xl">
          This page doesn&rsquo;t exist.
        </h1>
        <p className="mt-5 max-w-md text-lg text-ink-soft">
          The link may be broken or the page may have moved. Everything worth seeing is on the home page.
        </p>
        <Button href="/" size="lg" variant="solid" className="mt-9">
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to home
        </Button>
      </div>
    </section>
  );
}

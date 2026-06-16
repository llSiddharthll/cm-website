import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/agency/Footer";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <span id="top" className="absolute top-0" aria-hidden />
      <Header dark />
      <main className="flex min-h-svh flex-col items-center justify-center bg-dark px-[var(--gutter)] py-32 text-center text-on-ink">
        <span className="label text-orange">Error 404</span>
        <h1 className="display-tight mt-6 text-[length:var(--text-display)] text-on-ink">
          Lost the thread
          <span
            aria-hidden
            className="ml-[0.1em] inline-block aspect-square w-[0.5em] bg-orange align-baseline"
          />
        </h1>
        <p className="mt-7 max-w-md text-[length:var(--text-lead)] text-on-ink-2">
          This page wandered off to find enlightenment. Let&rsquo;s get you back
          to something useful.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="primary" size="lg">
            Back home
          </Button>
          <Button href="/work" variant="invert" size="lg" arrow={false}>
            See the work
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}

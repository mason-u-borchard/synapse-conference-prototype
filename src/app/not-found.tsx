import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-gutter flex min-h-[70vh] flex-col items-start justify-center py-section">
      <p className="eyebrow mb-4">404</p>
      <h1 className="text-display-lg text-balance">The signal didn't reach that node.</h1>
      <p className="mt-6 max-w-prose text-lg text-muted-foreground text-pretty">
        The page you were looking for may have been moved or is still on the
        program committee's desk. Try one of these instead:
      </p>
      <ul className="mt-8 space-y-3 font-serif text-lg">
        <li><Link href="/" className="link-marker">Home</Link></li>
        <li><Link href="/speakers" className="link-marker">Speakers</Link></li>
        <li><Link href="/schedule" className="link-marker">Schedule</Link></li>
        <li><Link href="/faq" className="link-marker">FAQ</Link></li>
      </ul>
    </div>
  );
}

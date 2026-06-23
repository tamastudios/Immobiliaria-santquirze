import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center bg-cream px-5 pt-24 text-center">
      <div>
        <p className="font-display text-6xl font-semibold text-primary">404</p>
        <p className="mt-3 text-ink/60">La página que buscas no existe o ha sido movida.</p>
        <Link href="/" className="btn-primary mt-6">Volver al inicio</Link>
      </div>
    </div>
  );
}

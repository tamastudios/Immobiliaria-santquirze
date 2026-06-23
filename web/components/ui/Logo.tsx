import Link from "next/link";

export function Logo({ light = false }: { light?: boolean }) {
  const text = light ? "text-white" : "text-primary";
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="Inicio">
      <span
        className="grid h-11 w-11 place-items-center rounded-md border-2 border-accent font-display text-lg font-bold text-accent"
      >
        SQ
      </span>
      <span className={`leading-tight ${text}`}>
        <span className="block font-display text-[15px] font-semibold tracking-wide">
          IMMOBILIÀRIA
        </span>
        <span className="block font-display text-[15px] font-semibold tracking-[0.18em]">
          SANT QUIRZE
        </span>
      </span>
    </Link>
  );
}

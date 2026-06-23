export function InnerHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <section className="bg-primary pb-14 pt-32">
      <div className="container-x text-center">
        {eyebrow && <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>}
        <h1 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">{title}</h1>
        {subtitle && <p className="mx-auto mt-4 max-w-xl text-white/70">{subtitle}</p>}
      </div>
    </section>
  );
}

import { Reveal } from "../ui/Reveal";

export function SectionHeading({
  eyebrow, title, desc, light = false, center = false,
}: { eyebrow?: string; title: string; desc?: string; light?: boolean; center?: boolean }) {
  return (
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className={`font-display text-3xl font-semibold leading-tight sm:text-4xl ${light ? "text-white" : "text-primary"}`}>
        {title}
      </h2>
      {desc && <p className={`mt-4 text-base leading-relaxed ${light ? "text-white/70" : "text-ink/65"}`}>{desc}</p>}
    </Reveal>
  );
}

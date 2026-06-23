// POST /api/leads — recibe los formularios y crea un "lead" para el CRM.
// HOY: valida y registra (consola). MAÑANA: guarda en Strapi (POST a /api/leads)
// y/o notifica por email. Esa sustitución no afecta al frontend.
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const nombre = String(body.nombre ?? "").trim();
  const email = String(body.email ?? "").trim();
  const telefono = String(body.telefono ?? "").trim();

  // Validación + sanitización básica
  if (!nombre || nombre.length > 120) return NextResponse.json({ error: "Nombre no válido" }, { status: 400 });
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({ error: "Email no válido" }, { status: 400 });
  if (!telefono) return NextResponse.json({ error: "Teléfono requerido" }, { status: 400 });

  const lead = {
    fecha: new Date().toISOString(),
    nombre, email, telefono,
    mensaje: String(body.mensaje ?? "").slice(0, 2000),
    origen: String(body.source ?? "web"),
    propiedad: body.propertyRef ? String(body.propertyRef) : null,
    estado: "nuevo",
  };

  // Guardar en Strapi (CRM) si está configurado. Si falla, no rompemos el envío.
  const STRAPI_URL = process.env.STRAPI_URL;
  if (STRAPI_URL) {
    try {
      await fetch(`${STRAPI_URL}/api/leads`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.STRAPI_API_TOKEN ? { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` } : {}),
        },
        body: JSON.stringify({
          data: {
            nombre: lead.nombre, email: lead.email, telefono: lead.telefono,
            mensaje: lead.mensaje, origen: lead.origen, propiedadRef: lead.propiedad,
            estado: "nuevo",
          },
        }),
      });
    } catch {
      console.warn("[LEAD] No se pudo guardar en Strapi, registrado en log.");
    }
  }
  console.log("[LEAD]", lead);

  return NextResponse.json({ ok: true });
}

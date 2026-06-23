export const SITE = {
  name: "Immobiliària Sant Quirze",
  shortName: "ImmoSQ",
  city: "Sant Quirze del Vallès",
  url: "https://immosq.com",
  phone: "93 721 63 00",
  phoneRaw: "+34937216300",
  whatsapp: "34937216300",
  whatsappMsg: "Hola, estoy interesado en una propiedad.",
  email: "info@immosq.com",
  address: "Avgda. Pau Casals 4, Local",
  addressFull: "Avgda. Pau Casals 4, Local · Sant Quirze del Vallès",
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
};

export const NAV = [
  { href: "/", label: "Inicio" },
  { href: "/comprar", label: "Comprar" },
  { href: "/alquilar", label: "Alquilar" },
  { href: "/vender", label: "Vender" },
  { href: "/valoracion", label: "Valoración" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function waLink(message?: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message ?? SITE.whatsappMsg)}`;
}

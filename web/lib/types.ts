export type Operation = "venta" | "alquiler";
export type PropertyType = "piso" | "casa" | "chalet" | "duplex" | "local" | "terreno";
export type PropertyStatus =
  | "disponible" | "reservado" | "vendido" | "alquilado" | "destacado" | "exclusiva";

export type PropertyTag = "nuevo" | "rebajado" | "exclusiva" | "vendido" | "reservado";

export interface Property {
  id: string;
  slug: string;
  title: string;
  operation: Operation;
  type: PropertyType;
  status: PropertyStatus;
  tag?: PropertyTag;
  price: number;
  location: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  area: number; // m²
  reference: string;
  description: string;
  features: string[];
  equipment: string[];
  energyCertificate: string; // A..G | "en trámite"
  lat: number;
  lng: number;
  images: string[];
  featured?: boolean;
}

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

import { site } from '@data/site.data';

export function whatsappUrl(message?: string) {
  const finalMessage = message ?? 'Hola MechitaSparks, quiero cotizar un beauty bar para mi evento.';
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(finalMessage)}`;
}

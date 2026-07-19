import { faqs, services, site, stitchImages } from './site.data';

export const seo = {
  title: 'Beauty Bar para eventos en Lima | MechitaSparks',
  description: 'Beauty bar móvil en Lima con glitter, gemas, tatuajes temporales y peinados express para bodas, quinceañeros, fiestas y eventos corporativos.',
  canonical: '/',
  image: stitchImages.hero,
  themeColor: '#ff3b9d'
} as const;

export const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${site.url}/#business`,
    name: site.legalName,
    description: site.description,
    url: site.url,
    email: site.email,
    image: stitchImages.hero,
    areaServed: { '@type': 'City', name: 'Lima' },
    founder: { '@type': 'Person', name: 'Mercedes Astorima' },
    priceRange: '$$'
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Servicios de beauty bar para eventos',
    itemListElement: services.map((service, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: service.title,
        description: service.description,
        areaServed: 'Lima, Perú',
        provider: { '@id': `${site.url}/#business` }
      }
    }))
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  }
] as const;

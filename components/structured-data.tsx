export function StructuredData() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TiDevTeam",
    url: "https://tidevteam.com",
    logo: "https://tidevteam.com/logo.png",
    description:
      "Professional software development company specializing in web applications, mobile apps, and custom solutions.",
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-555-123-4567",
      contactType: "customer service",
      email: "tidevteam@gmail.com",
      availableLanguage: "English",
    },
    address: {
      "@type": "PostalAddress",
      addressCountry: "US",
    },
    sameAs: ["https://linkedin.com/company/tidevteam", "https://twitter.com/tidevteam", "https://github.com/tidevteam"],
    serviceArea: {
      "@type": "Place",
      name: "Worldwide",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web Development",
            description: "Custom web applications and websites",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Mobile App Development",
            description: "iOS and Android mobile applications",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Custom Software Solutions",
            description: "Tailored software solutions for businesses",
          },
        },
      ],
    },
  }

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TiDevTeam",
    url: "https://tidevteam.com",
    description: "Professional software development company",
    publisher: {
      "@type": "Organization",
      name: "TiDevTeam",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://tidevteam.com/all-projects?search={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData),
        }}
      />
    </>
  )
}

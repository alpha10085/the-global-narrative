const metadataHandler = ({
  title = "",
  description = "",
  poster,
  path = "",
  images = [],
  keywords = [],
}) => {
  const defaultPosterUrl =
    "https://res.cloudinary.com/dpuygkgve/image/upload/v1751295021/Screenshot_2025-06-30_174942_xxghv9.png";
  const clientUrl = process.env.NEXT_PUBLIC_client || "";
  const url = `${clientUrl}${path}`; // Construct absolute URL

  return {
    title,
    description,
    keywords: keywords.join(", "), // Format keywords for meta tags
    alternates: {
      canonical: url, // Canonical URL for better SEO
    },
    openGraph: {
      title,
      description,
      url, // Include the URL in Open Graph metadata
      images: [
        {
          url: poster?.url || defaultPosterUrl,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        ...(images?.length
          ? images.map((val) => ({
              url: val?.url || defaultPosterUrl,
              alt: title,
            }))
          : [
              {
                url: poster?.url || defaultPosterUrl,
                alt: title,
              },
            ]),
        {
          url: poster?.url || defaultPosterUrl,
          alt: title,
        },
      ],
    },
    other: {
      image: defaultPosterUrl,
    },
  };
};

const pageMetadataHandler =
  (fn, fnprops) =>
  async ({ params }) => {
    const { locale } = await params;
    const { metadata = {} } = await fn(fnprops, locale);
    metadata.title = metadata?.title || process.env.NEXT_PUBLIC_project_name;
    metadata.description =
      metadata?.description ||
      `welcome to ${process.env.NEXT_PUBLIC_project_name}`;

    return metadataHandler({
      keywords: ["SEO", ...(metadata?.keywords || [])],
      ...metadata,
    });
  };
  export {
    pageMetadataHandler,
    metadataHandler
  }

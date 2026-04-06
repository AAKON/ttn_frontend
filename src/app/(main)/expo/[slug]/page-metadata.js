const getBaseUrl = () => {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "";

  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
};

const getAbsoluteUrl = (value) => {
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;

  const baseUrl = getBaseUrl();
  if (!baseUrl) return value;

  return value.startsWith("/") ? `${baseUrl}${value}` : `${baseUrl}/${value}`;
};

const stripHtml = (value) => String(value || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const getExpoImage = (item) =>
  item?.banner_url ||
  item?.cover_image ||
  item?.cover_image_url ||
  item?.banner_image ||
  item?.banner_image_url ||
  item?.image ||
  item?.image_url ||
  "";

const getExpoTitle = (item) => {
  const baseTitle = item?.meta_title || item?.title || item?.name || "Expo Details";
  return baseTitle.includes("Textile Network")
    ? baseTitle
    : `${baseTitle} | Textile Network`;
};

const getExpoDescription = (item) => {
  const rawDescription =
    item?.meta_description ||
    item?.short_description ||
    item?.description ||
    "";

  const cleanedDescription = stripHtml(rawDescription).slice(0, 160);

  return cleanedDescription || "Explore expo details, event schedule, venue, organizer, and registration information on Textile Network.";
};

export const buildExpoPageMetadata = (item, slug) => {
  const metadataBase = getBaseUrl();
  const title = getExpoTitle(item);
  const description = getExpoDescription(item);
  const imageUrl = getAbsoluteUrl(getExpoImage(item));
  const pageUrl = getAbsoluteUrl(`/expo/${slug}`);
  const keywords = item?.meta_keywords || item?.keywords;

  return {
    metadataBase: metadataBase ? new URL(metadataBase) : undefined,
    title,
    description,
    keywords,
    alternates: pageUrl
      ? {
          canonical: pageUrl,
        }
      : undefined,
    openGraph: {
      title,
      description,
      url: pageUrl || undefined,
      siteName: "Textile Network",
      type: "article",
      images: imageUrl
        ? [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: imageUrl ? "summary_large_image" : "summary",
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
    other: {
      "og:site_name": "Textile Network",
      "og:url": pageUrl || undefined,
      "og:type": "article",
      "og:image": imageUrl || undefined,
      "og:image:secure_url": imageUrl || undefined,
      "og:image:width": imageUrl ? "1200" : undefined,
      "og:image:height": imageUrl ? "630" : undefined,
      "og:image:alt": imageUrl ? title : undefined,
    },
  };
};

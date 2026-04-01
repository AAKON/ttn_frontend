import ExproCard from "./expro-card";
import { Skeleton } from "@/components/ui/skeleton";

const formatDateRange = (startDate, endDate) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const parseDate = (value) => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return formatter.format(date);
  };

  const formattedStart = parseDate(startDate);
  const formattedEnd = parseDate(endDate);

  if (formattedStart && formattedEnd) {
    return `${formattedStart} - ${formattedEnd}`;
  }
  return formattedStart || formattedEnd || "Date not available";
};

const mapExpoFromApi = (item, index) => {
  console.log({item});
  
  const title = item?.title || item?.name || "Untitled Expo";
  const posterWord = item?.poster_word || title.split(" ")[0] || "Expo";
  const posterTagline =
    item?.poster_tagline ||
    item?.subtitle ||
    item?.short_description ||
    "International Textile Exhibition";
  const posterDate =
    item?.poster_date || item?.event_date || item?.date || "Upcoming Event";

  return {
    id: item?.id || index + 1,
    posterWord,
    posterTagline,
    posterDate,
    posterCta: item?.poster_cta || "",
    dateRange: formatDateRange(
      item?.start_date || item?.from_date,
      item?.end_date || item?.to_date
    ),
    title,
    country:
      item?.location?.name ||
      item?.location_name ||
      item?.country ||
      "Unknown location",
    organizer:
      item?.company?.name ||
      item?.company_name ||
      item?.organizer_name ||
      item?.organizer ||
      "Unknown company",
    variant: ["emerald", "crimson", "plum"][index % 3],
    slug: item?.slug || item?.id || String(index + 1),
    imageUrl:
      item?.banner_url ||
      "",
    visitor_reg_url:
      item?.visitor_reg_url ||
      item?.visitor_registration_url ||
      item?.registration_url ||
      item?.reg_url ||
      item?.visitorRegUrl ||
      "",
  };
};

const ExproCardShimmer = () => (
  <article className="overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06)]">
    <Skeleton className="h-[190px] w-full rounded-none" />
    <div className="space-y-3 p-4 md:p-5">
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-11/12" />
      <div className="flex gap-3 pt-1">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-28" />
      </div>
      <div className="grid grid-cols-2 gap-3 pt-2">
        <Skeleton className="h-12 w-full rounded-xl" />
        <Skeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>
  </article>
);

const ExproListSection = ({ exproList = [], loading = false, onRegisterClick }) => {
  const list = exproList.map((item, index) => mapExpoFromApi(item, index));

  return (
    <section className="mt-2">
      {loading ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <ExproCardShimmer key={index} />
          ))}
        </div>
      ) : null}

      {!loading && list.length === 0 ? (
        <div className="rounded-2xl border border-[#E4E7EC] bg-white px-6 py-12 text-center text-[#667085]">
          No expo found
        </div>
      ) : null}

      {!loading && list.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {list.map((expro) => (
            <ExproCard key={expro.id} onRegisterClick={onRegisterClick} expro={expro} />
          ))}
        </div>
      ) : null}
    </section>
  );
};

export default ExproListSection;

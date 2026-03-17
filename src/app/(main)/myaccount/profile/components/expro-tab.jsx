"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import ExpoRegistrationModal from "@/app/(main)/expro/components/expo-registration-modal";
import ExproCard from "@/app/(main)/expro/components/expro-card";

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

const getExpoImage = (item) =>
  item?.banner_url ||
  item?.cover_image ||
  item?.cover_image_url ||
  item?.banner_image ||
  item?.banner_image_url ||
  item?.image ||
  item?.image_url ||
  "";

const getListDataFromPayload = (payload) =>
  Array.isArray(payload?.data)
    ? payload.data
    : Array.isArray(payload)
      ? payload
      : Array.isArray(payload?.items)
        ? payload.items
        : [];

const mapExpoFromApi = (item, index) => ({
  id: item?.id || index + 1,
  slug: item?.slug || String(item?.id || index + 1),
  title: item?.title || item?.name || "Untitled Expo",
  dateRange: formatDateRange(
    item?.start_date || item?.from_date,
    item?.end_date || item?.to_date
  ),
  country:
    item?.location?.name ||
    item?.location_name ||
    item?.country ||
    "Unknown location",
  organizer:
    item?.company?.name ||
    item?.organizer_name ||
    item?.company_name ||
    item?.organizer ||
    "Unknown organizer",
  imageUrl: getExpoImage(item),
});

const fallbackExpos = Array.from({ length: 5 }, (_, index) => ({
  id: index + 1,
  slug: `expo-${index + 1}`,
  title: "INDEX 26 - The World's Leading Nonwovens Exhibition",
  dateRange: "7 Feb, 2026 - 9 Feb, 2026",
  country: "Bangladesh",
  organizer: "Intex South Asia",
  imageUrl: "",
}));

const sliderOptions = {
  type: "slide",
  perPage: 3,
  perMove: 1,
  gap: "1rem",
  pagination: false,
  arrows: false,
  padding: { left: "0", right: "3rem" },
  breakpoints: {
    1280: {
      perPage: 3,
      padding: { left: "0", right: "2rem" },
    },
    1024: {
      perPage: 2,
      padding: { left: "0", right: "1.5rem" },
    },
    768: {
      perPage: 1,
      padding: { left: "0", right: "1rem" },
    },
  },
};

const ArrowIcon = ({ left = false, className = "" }) => (
  <svg
    className={className}
    width={9}
    height={14}
    viewBox="0 0 9 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d={left ? "M7.5 13L1.5 7L7.5 1" : "M1.5 13L7.5 7L1.5 1"}
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// const ExpoCard = ({ expo, withRegisterAction = false, onRegisterClick }) => {
//   const hasImage = Boolean(expo?.imageUrl);

//   return (
//     <article className="overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white shadow-sm">
//       <div className="relative h-[250px] overflow-hidden rounded-t-2xl bg-[#F2F4F7]">
//         {hasImage ? (
//           <img src={expo.imageUrl} alt={expo.title} className="h-full w-full object-cover" />
//         ) : (
//           <div className="absolute inset-0 bg-gradient-to-br from-[#FCFCFD] via-[#F8FAFC] to-[#EEF4FF] p-5">
//             <p className="text-[44px] font-light leading-none text-[#1D2939]">Expo</p>
//             <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#475467]">
//               International Textile Exhibition
//             </p>
//             <span className="absolute bottom-4 right-4 rounded-full bg-[#12B76A] px-5 py-1.5 text-[13px] font-semibold text-white shadow">
//               Register Today!
//             </span>
//           </div>
//         )}
//       </div>

//       <div className="space-y-3 border-t border-[#EAECF0] p-5">
//         <p className="text-[14px] font-semibold text-[#475467]">{expo.dateRange}</p>
//         <h4 className="line-clamp-2 min-h-[68px] text-[16px] font-semibold leading-tight text-[#101828] md:text-[20px]">
//           {expo.title}
//         </h4>

//         <div className="flex flex-wrap items-center gap-4 text-[14px] text-[#475467]">
//           <span className="inline-flex items-center gap-1.5">
//             <MapPin className="h-4 w-4 text-[#667085]" />
//             {expo.country}
//           </span>
//           <span className="inline-flex items-center gap-1.5">
//             <Building2 className="h-4 w-4 text-[#667085]" />
//             {expo.organizer}
//           </span>
//         </div>

//         <div className={`grid gap-3 ${withRegisterAction ? "grid-cols-2" : "grid-cols-1"}`}>
//           {withRegisterAction ? (
//             <button
//               type="button"
//               onClick={onRegisterClick}
//               className="h-12 rounded-xl border border-[#D0D5DD] bg-white text-[16px] font-semibold text-[#344054] transition-colors hover:bg-[#F9FAFB]"
//             >
//               Register Now
//             </button>
//           ) : null}
//           <Link
//             href={`/expro/${expo.slug}`}
//             className="flex h-12 items-center justify-center rounded-xl border border-[#F7B267] bg-white text-[16px] font-semibold text-[#ED8A19] transition-colors hover:bg-[#FFF7ED]"
//           >
//             View Details
//           </Link>
//         </div>
//       </div>
//     </article>
//   );
// };

const ExproSection = ({
  title,
  expos = [],
  withRegisterAction = false,
  onRegisterClick,
}) => {
  const splideRef = useRef(null);

  const handlePrev = () => {
    splideRef.current?.go("<");
  };

  const handleNext = () => {
    splideRef.current?.go(">");
  };

  return (
    <div className="rounded-2xl border border-[#EAECF0] bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between gap-4">
        <h3 className="text-[18px] font-semibold text-[#101828]">
          {title} ({expos.length})
        </h3>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrev}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] border border-[#D0D5DD] bg-white p-0 leading-none text-[#344054] transition-colors hover:bg-[#F9FAFB]"
          >
            <ArrowIcon left className="h-3.5 w-[9px]" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] border border-[#ED8A19] bg-[#ED8A19] p-0 leading-none text-white transition-colors hover:bg-[#da7f18]"
          >
            <ArrowIcon className="h-3.5 w-[9px]" />
          </button>
        </div>
      </div>

      {expos.length > 0 ? (
        <Splide
          options={sliderOptions}
          ref={(node) => {
            splideRef.current = node;
          }}
        >
          {expos.map((expo) => (
            <SplideSlide key={expo.id}>
              <ExproCard
                expro={expo}
                withRegisterAction={withRegisterAction}
                onRegisterClick={onRegisterClick}
              />
            </SplideSlide>
          ))}
        </Splide>
      ) : (
        <p className="text-sm italic text-[#667085]">No expo found.</p>
      )}
    </div>
  );
};

const ExproTab = () => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [myExpos, setMyExpos] = useState([]);
  const [savedExpos, setSavedExpos] = useState([]);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

  useEffect(() => {
    if (status === "loading") return;
    let isMounted = true;

    const fetchMyExpos = async () => {
      try {
        const headers = {
          Accept: "application/json",
        };

        if (session?.accessToken) {
          headers.Authorization = `Bearer ${session.accessToken}`;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my/expo/registrations?per_page=10&page=1`,
          {
            method: "GET",
            cache: "no-store",
            headers,
          }
        );

        const data = await response.json();
        const payload = data?.data ?? data;
        const listData = getListDataFromPayload(payload);

        return listData.map((item, index) =>
          mapExpoFromApi(item?.expo || item?.event || item, index)
        );
      } catch (error) {
        console.error("Error fetching my expo registrations:", error);
        return [];
      }
    };

    const fetchSavedExpos = async () => {
      try {
        const headers = {
          Accept: "application/json",
        };

        if (session?.accessToken) {
          headers.Authorization = `Bearer ${session.accessToken}`;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my/expo/favorites?per_page=10&page=1`,
          {
            method: "GET",
            cache: "no-store",
            headers,
          }
        );

        const data = await response.json();
        const payload = data?.data ?? data;
        const listData = getListDataFromPayload(payload);
        return listData.map((item, index) =>
          mapExpoFromApi(item?.expo || item?.event || item, index)
        );
      } catch (error) {
        console.error("Error fetching saved expo favorites:", error);
        return [];
      }
    };

    const fetchExpos = async () => {
      try {
        const [myExpoData, savedExpoData] = await Promise.all([
          fetchMyExpos(),
          fetchSavedExpos(),
        ]);

        if (!isMounted) return;

        setMyExpos((myExpoData.length > 0 ? myExpoData : fallbackExpos).slice(0, 5));
        setSavedExpos((savedExpoData.length > 0 ? savedExpoData : fallbackExpos).slice(0, 5));
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchExpos();

    return () => {
      isMounted = false;
    };
  }, [session?.accessToken, status]);

  const sections = useMemo(
    () => [
      { id: "my-expo", title: "My Expo", expos: myExpos, withRegisterAction: true },
      { id: "saved-expo", title: "Saved Expo", expos: savedExpos, withRegisterAction: false },
    ],
    [myExpos, savedExpos]
  );

  return (
    <div className="space-y-5">
      {isLoading ? (
        <div className="rounded-2xl border border-[#EAECF0] bg-white p-6 shadow-sm">
          <div className="h-64 animate-pulse rounded-xl bg-[#F2F4F7]" />
        </div>
      ) : (
        sections.map((section) => (
          <ExproSection
            key={section.id}
            title={section.title}
            expos={section.expos}
            withRegisterAction={section.withRegisterAction}
            onRegisterClick={() => setIsRegistrationModalOpen(true)}
          />
        ))
      )}

      <ExpoRegistrationModal
        open={isRegistrationModalOpen}
        onOpenChange={setIsRegistrationModalOpen}
      />
    </div>
  );
};

export default ExproTab;

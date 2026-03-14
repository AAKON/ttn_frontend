import { Building2, MapPin } from "lucide-react";
import Link from "next/link";

const posterVariants = {
  emerald: {
    wrapper: "bg-gradient-to-br from-[#FCFCFD] via-[#F8FAFC] to-[#EEF4FF]",
    title: "text-[#1D2939]",
    subtitle: "text-[#344054]",
    ribbonA: "border-[#FDB022]",
    ribbonB: "border-[#12B76A]",
    ribbonC: "border-[#F79009]",
  },
  crimson: {
    wrapper: "bg-gradient-to-br from-[#FFF1F3] via-[#FECDD3] to-[#FDA4AF]",
    title: "text-[#7A271A]",
    subtitle: "text-[#912018]",
    ribbonA: "border-[#F04438]",
    ribbonB: "border-[#F79009]",
    ribbonC: "border-[#7F56D9]",
  },
  plum: {
    wrapper: "bg-gradient-to-br from-[#FCFAFF] via-[#F4F3FF] to-[#E0EAFF]",
    title: "text-[#363F72]",
    subtitle: "text-[#344054]",
    ribbonA: "border-[#7F56D9]",
    ribbonB: "border-[#2E90FA]",
    ribbonC: "border-[#F04438]",
  },
};

const ExproCard = ({ expro }) => {
  const variant = posterVariants[expro.variant] || posterVariants.emerald;
  const hasImage = Boolean(expro.imageUrl);

  return (
    <article className="overflow-hidden rounded-2xl border border-[#D0D5DD] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.06)]">
      <div className={`relative h-[190px] overflow-hidden ${variant.wrapper}`}>
        {hasImage ? (
          <img
            src={expro.imageUrl}
            alt={expro.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <>
            <span
              className={`absolute -right-16 -top-14 h-44 w-72 rotate-[32deg] rounded-full border-[20px] ${variant.ribbonA}`}
            />
            <span
              className={`absolute -left-24 bottom-0 h-36 w-80 -rotate-[26deg] rounded-full border-[18px] ${variant.ribbonB}`}
            />
            <span
              className={`absolute right-10 -bottom-16 h-44 w-72 rotate-[24deg] rounded-full border-[16px] ${variant.ribbonC}`}
            />

            <div className="relative z-10 p-4 md:p-5">
              <p className={`text-[52px] font-light leading-none ${variant.title}`}>
                {expro.posterWord}
              </p>
              <p className={`mt-2 max-w-[190px] text-[11px] font-semibold uppercase leading-tight ${variant.subtitle}`}>
                {expro.posterTagline}
              </p>
              <p className={`mt-3 text-[22px] font-semibold leading-none ${variant.subtitle}`}>
                {expro.posterDate}
              </p>
            </div>
          </>
        )}

        {expro.posterCta ? (
          <span className="absolute bottom-4 right-4 rounded-full bg-[#0FAA60] px-5 py-1.5 text-[13px] font-semibold text-white shadow-[0_4px_14px_rgba(16,24,40,0.2)]">
            {expro.posterCta}
          </span>
        ) : null}
      </div>

      <div className="border-t border-[#EAECF0] p-4 md:p-5">
        <p className="text-[14px] font-semibold leading-[20px] text-[#475467]">
          {expro.dateRange}
        </p>

        <h3 className="mt-2.5 min-h-[34px] text-[18px] font-semibold leading-[1.35] text-[#101828]">
          {expro.title}
        </h3>

        <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="inline-flex items-center gap-1.5 text-[14px] leading-[20px] text-[#475467]">
            <MapPin className="h-4 w-4 text-[#667085]" />
            {expro.country}
          </span>
          <span className="inline-flex items-center gap-1.5 text-[14px] leading-[20px] text-[#475467]">
            <Building2 className="h-4 w-4 text-[#667085]" />
            {expro.organizer}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="h-12 rounded-xl border border-[#D0D5DD] bg-[#F9FAFB] text-[16px] font-semibold text-[#344054] transition-colors hover:bg-white"
          >
            Register Now
          </button>
          <Link
            href={`/expro/${expro.id}`}
            className="flex items-center justify-center h-12 rounded-xl border border-[#F7B267] bg-white text-[16px] font-semibold text-[#ED8A19] transition-colors hover:bg-[#FFF7ED]"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ExproCard;

import ExproCard from "./expro-card";

const exproListFake = [
  {
    id: 1,
    posterWord: "Index",
    posterTagline: "The world's leading nonwovens exhibition",
    posterDate: "19-22 May 2026",
    posterCta: "Register Today!",
    dateRange: "7 Feb, 2026 - 9 Feb, 2026",
    title: "INDEXTM26 - The World's Leading Nonwovens Exhibition",
    country: "Bangladesh",
    organizer: "Intex South Asia",
    variant: "emerald",
  },
  {
    id: 2,
    posterWord: "Intex",
    posterTagline: "The premier international textile sourcing show of South Asia",
    posterDate: "25-27 June, 2025",
    posterCta: "",
    dateRange: "7 Feb, 2026 - 9 Feb, 2026",
    title: "Intex Bangladesh 2025",
    country: "Bangladesh",
    organizer: "Intex South Asia",
    variant: "crimson",
  },
  {
    id: 3,
    posterWord: "Intertextile",
    posterTagline: "Shanghai apparel fabrics",
    posterDate: "7-9 Feb, 2026",
    posterCta: "",
    dateRange: "7 Feb, 2026 - 9 Feb, 2026",
    title: "Inter Textile Shanghai Apparel Fabrics Expo",
    country: "China",
    organizer: "Shanghai Apparel Fabrics Expo",
    variant: "plum",
  },
];
const formatExproData = (apiData) => {
  return apiData.map((item) => ({
    id: item.id,
    posterWord: item.poster_word,
    posterTagline: item.poster_tagline,
    posterDate: item.poster_date,
    posterCta: item.poster_cta,
    dateRange: item.date_range,
    title: item.title,
    country: item.country,
    organizer: item.organizer,
    variant: item.variant,
  }));
};

  const ExproListSection = () => {
    const exproList = formatExproData(exproListFake);
    return (
      <section className="mt-2">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {exproList.map((expro) => (
            <ExproCard key={expro.id} expro={expro} />
          ))}
        </div>
      </section>
    );
};

export default ExproListSection;

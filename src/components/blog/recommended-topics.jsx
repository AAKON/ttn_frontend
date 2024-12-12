import Link from "next/link";

const topicsData = [
  "Business",
  "Digitalization",
  "Events",
  "Editor's Picks",
  "Sourcing",
  "Expo & Fair",
];
const RecommendedTopics = () => {
  return (
    <>
      {topicsData?.map((item, index) => (
        <Link
          href="#"
          key={index}
          className="text-gray-700 leading-[16px] text-base font-normal py-3 px-4 rounded-full bg-gray-200"
        >
          {item}
        </Link>
      ))}
    </>
  );
};

export default RecommendedTopics;

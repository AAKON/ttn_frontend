import Link from "next/link";

const RecommendedTopics = ({recomended}) => {

  return (
    <>
      {recomended && recomended?.blog_topics && recomended?.blog_topics?.map((item, index) => (
        <Link
          href={`/recomended/${item?.id}`}
          key={index}
          className="text-gray-700 leading-[16px] text-base font-normal py-3 px-4 rounded-full bg-gray-200"
        >
          {item?.name}
        </Link>
      ))}
    </>
  );
};

export default RecommendedTopics;

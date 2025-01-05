import Image from "next/image";

const ContactTeamCard = ({ src, name, title, email }) => {
  return (
    <div className="w-full lg:w-1/2 xl:w-4/12">
      <div className="flex gap-5 sm:px-2 md:px-3 lg:px-4">
        <div className="size-[96px] shrink-0 rounded-full overflow-hidden">
          <Image
            width={96}
            height={96}
            src={src}
            alt="img"
            className="size-full rounded-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-semibold text-xl text-gray-900">{name}</h2>
          <p className="text-sm text-brand-600">{title}</p>
          <a href={`mailto:${email}`} className="text-md text-gray-900">
            {email}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactTeamCard;

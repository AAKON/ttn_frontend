
import Image from "next/image"

const ContactTeamCard = ({src,name,title,email}) => {
    return (
        <div>
            <div className="flex gap-5 items-center">
                <div className="size-[96px] rounded-full overflow-hidden">
                    <Image width={96} height={96} src={src} alt="img" className="size-full rounded-full object-cover" />
                </div>
                <div>
                    <h2 className="font-semibold text-xl text-gray-900">{name}</h2>
                    <p className="text-sm text-orange-600">{title}</p>
                    <a href={`mailto:${email}`} className="text-md text-gray-900">{email}</a>
                </div>

            </div>
        </div>
    )
}

export default ContactTeamCard
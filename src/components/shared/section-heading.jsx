
export function SectionHeading({heading, description}) {
    return (
        <div className="flex flex-col items-center justify-center text-center gap-2">
            <h4 className="text-2xl leading-normal font-semibold md:text-4xl text-gray-900 capitalize">
                {heading}
            </h4>
            <p className="font-normal text-sm leading-normal md:text-lg text-gray-700">
                {description}
            </p>
        </div>
    );
}

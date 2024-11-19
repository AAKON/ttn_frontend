const Title = ({ heading, description }) => {
    return (
        <div className="flex items-center justify-center flex-col text-center">
            <h1 className="xl:text-5xl text-[30px] font-semibold text-gray-900 pb-2 lg:pb-6">
                {heading}
            </h1>
            <p className="xl:text-xl text-sm font-normal text-gray-600 w-full sm:max-w-[800px] leading-5 xl:leading-7">
                {description}
            </p>
        </div>
    );
};

export default Title;

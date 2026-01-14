import {Section} from "@/shared";
import ResourceCard from "@/ui/resource-card";
import Button from "@/components/shared/button";
import Link from "next/link";
import ResourceSlider from "@/components/resources/resourceSlider";

const Resources = async ({blogsPromise}) => {
    const homeBlogs = await blogsPromise;

    return (
        <>
            {homeBlogs &&
                Array.isArray(homeBlogs?.TNN_picks) &&
                homeBlogs?.TNN_picks.length > 0 && (
                    <Section>
                        <div>
                            <h5 className="font-semibold hidden lg:block text-center capitalize tracking-tight text-4xl pb-[64px] text-gray-900">
                                Resources
                            </h5>
                            <p className="font-semibold text-center pb-8 lg:hidden text-2xl text-gray-900">
                                Resources
                            </p>
                            <ResourceSlider homeBlogsData={homeBlogs?.TNN_picks} />
                            <div className="flex items-center justify-center">
                                <Button
                                    TagName={Link}
                                    href={"/blog"}
                                    className="xl:mt-[64px] mt-[32px]"
                                >
                                    View all Resources
                                </Button>
                            </div>
                        </div>
                    </Section>)}
        </>
    );
};

export default Resources;

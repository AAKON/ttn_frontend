import {Section} from "@/shared";
import ResourceCard from "@/ui/resource-card";
import blog1 from "@/assets/blog1.jpg";
import avatar from "@/assets/avatar.png";
import Button from "@/components/shared/button";
import Link from "next/link";

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
                                Lastest blog posts
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {homeBlogs?.TNN_picks.map((item) => (
                                    <ResourceCard key={item?.id} item={item}/>
                                ))}
                            </div>
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

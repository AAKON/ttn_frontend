import React from 'react';
import Button from "@/components/shared/button";
import Link from "next/link";

function FooterCtaContent(props) {
    return (
        <div className="text-center md:text-left py-8 px-4 lg:py-12 lg:px-20 bg-footer-bg-image bg-no-repeat bg-right bg-cover border-gray-200 border bg-gray-50 rounded-2xl overflow-hidden">
            <div className="md:max-w-[768px]">
                <h3 className="text-lg leading-normal lg:text-3xl lg:leading-[38px] font-semibold lg:pr-10">
                    Leverage Our Platform Expertise for Your Business Growth
                </h3>
                <p className="text-gray-500 pt-2">
                    Add your business for free. Forever.
                </p>
                <div className="flex gap-3 mt-6 justify-center md:justify-start">
                    <Button TagName={Link} href={"/contact"} secondary type="button">
                        Get a quote
                    </Button>
                    <Button TagName={Link} href={"/myaccount/company/add"} type="button" icon>
                        Add Business
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default FooterCtaContent;
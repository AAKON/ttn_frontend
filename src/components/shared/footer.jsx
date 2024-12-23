import { Container } from "@/shared";
import Button from "@/components/shared/button";
import Link from "next/link";
import Image from "next/image";
import NewsletterForm from "@/ui/newsletter-form";
const footerLink = [
  { title: "Company", link: "/company" },
  { title: "Blog", link: "/blog" },
  { title: "About us", link: "/about" },
  { title: "Services", link: "/" },
  { title: "Contact Us", link: "/contact" },
  { title: "Partner", link: "/partner" },
  { title: "Privacy", link: "/privacy-policy" },
];

export const Footer = () => {
  return (
    <footer className="pt-8 xl:pt-20 md:pt-12 border-t border-t-gray-200">
      <Container>
        <FooterBanner />
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-[63.4%_1fr] md:my-12">
          <FooterLinks />
          <FooterContact />
        </div>
        <FooterCopyright />
      </Container>
    </footer>
  );
};

function FooterBanner() {
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

function FooterLinks() {
  return (
    <div className="mt-4 md:mt-0">
      <Link
        href="/"
        className="text-[#737373] font-semibold inline-flex gap-[18px] md:gap-5 items-center"
      >
        <Image src="/logo-sm.svg" alt="logo" width={48} height={48} />
        <span className="text-[27px] font-bold">Textile Network</span>
      </Link>
      <p className="mt-2 md:mt-7 lg:max-w-[380px]">
        Textile Network is an apparel and textile industry-based business
        listing, b2b sourcing, textile jobs, marketing, and business resources
        platform.
      </p>
      <ul className="flex gap-6 md:gap-[30px] items-center mt-8 md:mt-7 flex-wrap">
        {footerLink.map((item, index) => (
          <li key={index} className="text-[#475467] font-semibold">
            <Link href={item?.link}>{item?.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FooterContact() {
  return (
    <div className="mt-8 md:mt-0">
      <h4 className="text-xl font-semibold">Subscribe to our newsletter</h4>
      <p className="pt-1 pb-6">
        Don’t miss our future updates! Get Subscribed Today!
      </p>
      <NewsletterForm />
      <p className="text-sm text-[#475467] pt-[6px] leading-5">
        We care about your data in our{" "}
        <Link href="/privacy-policy" className="underline ">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}

function FooterCopyright() {
  return (
    <div className="mt-3 lg:mt-12 md:mt-5 border-t border-[#eaecf0] py-4 md:py-8 flex flex-col lg:flex-row justify-between gap-4 md:gap-5 items-center">
      <p className="mt-7">
        © {new Date().getFullYear()}. Textile Network. All Rights Reserved.
      </p>
      <ul className="flex gap-[30px] items-center mt-7">

        <li>
          <a href="https://www.linkedin.com/company/thetextilenetwork">
            <Image
                src="/icons/social-icon-2.svg"
                alt="linkedin"
                width={24}
                height={24}
            />
          </a>
        </li>
        <li>
          <a href="https://www.facebook.com/thetextilenetwork">
            <Image
                src="/icons/social-icon-3.svg"
                alt="facebook"
                width={24}
                height={24}
            />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/thetextilenetwork">
            <Image
                src="/icons/instagram.svg"
                alt="pinterest"
                width={24}
                height={24}
            />
          </a>
        </li>
        <li>
          <a href="https://www.pinterest.com/thetextilenetwork">
            <Image
                src="/icons/social-icon-6.svg"
                alt="pinterest"
                width={24}
                height={24}
            />
          </a>
        </li>

        <li>
          <a href="https://whatsapp.com/channel/0029VaGfiPjCxoB4rHKoaY1p/221 ">
            <Image
                src="/icons/whatsup.svg"
                alt="whatsup"
                width={24}
                height={24}
            />
          </a>
        </li>
        <li>
          <a href="https://t.me/thetextilenetworkcom">
            <Image
                src="/icons/telegram.svg"
                alt="telegrap"
                width={24}
                height={24}
            />
          </a>
        </li>
      </ul>
    </div>
  );
}

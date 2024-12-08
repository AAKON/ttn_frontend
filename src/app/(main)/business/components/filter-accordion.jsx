import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

export default function FilterAccordion() {
  const byCategory = [
    "All category",
    "Manufacturing",
    "Retail",
    "Machinery",
    "Dyeing",
    "Trading/Buying",
    "Advisor/Consultant",
    "Media/Publications",
    "Certifications",
    "Trading/Buying",
    "Advisor/Consultant",
    "Media/Publications",
    "Certifications",
    "Solution",
    "Others",
  ];
  const byType = [
    "All Types",
    "Raw",
    "Yarn",
    "Fabric",
    "Dyeing",
    "Washing",
    "Apparel",
    "Printing",
    "Embroidery",
    "Trims & Accessories",
    "Knitting",
    "Chemical",
    "Outwear",
    "Sportswear",
    "Nightwear",
    "Sweater",
    "Jacket",
    "Cap",
    "Woven",
    "Denim",
    "Home Textile",
  ];
  const byCertifications = [
    "Small (Below 1000 Manpower)",
    "Medium (1000-10000 Manpower)",
    "Large (Above 10000 Manpower)",
  ];
  const byCompliance = [
    "Sedex",
    "Eokotex",
    "Leed Gold",
    "Leed Platinum",
    "Green",
    "Disney",
    "Bluesign",
    "ZDHC",
    "REACH",
    "OCS",
    "FWF",
    "RCS",
    "C2C",
    "ISO",
    "RDS",
    "Higg",
    "WRAP",
  ];
  return (
    <Accordion type="single" collapsible>
      {/* By Category start */}
      <AccordionItem value="category" className="py-5 px-6">
        <AccordionTrigger className="bg-white hover:no-underline text-sm font-semibold text-gray-900 leading-5 px-0">
          By Category
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          {byCategory.map((item, idx) => {
            return (
              <div className="grid grid-cols-1" key={idx}>
                <div className="flex items-center space-x-2">
                  <Checkbox id={item.replace(/\s+/g, "_").toLowerCase()} className="h-4 w-4 p-2 border-gray-400 border bg-white text-gray-500" />
                  <label
                    htmlFor={item.replace(/\s+/g, "_").toLowerCase()}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500"
                  >
                    {item}
                  </label>
                </div>
              </div>
            );
          })}
        </AccordionContent>
      </AccordionItem>
      {/* By Category end */}

      {/* By Type start */}
      <AccordionItem value="type" className="py-5 px-6">
        <AccordionTrigger className="bg-white hover:no-underline text-sm font-semibold text-gray-900 leading-5 px-0">
          By Type
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          {byType.map((item, idx) => {
            return (
              <div className="grid grid-cols-1" key={idx}>
                <div className="flex items-center space-x-2">
                  <Checkbox id={item.replace(/\s+/g, "_").toLowerCase()} className="h-4 w-4 p-2 border-gray-400 border bg-white text-gray-500" />
                  <label
                    htmlFor={item.replace(/\s+/g, "_").toLowerCase()}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500"
                  >
                    {item}
                  </label>
                </div>
              </div>
            );
          })}
        </AccordionContent>
      </AccordionItem>
      {/* By Type end */}

      {/* By Certifications start */}
      <AccordionItem value="certifications" className="py-5 px-6">
        <AccordionTrigger className="bg-white hover:no-underline text-sm font-semibold text-gray-900 leading-5 px-0">
        By Certifications
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          {byCertifications.map((item, idx) => {
            return (
              <div className="grid grid-cols-1" key={idx}>
                <div className="flex items-center space-x-2">
                  <Checkbox id={item.replace(/\s+/g, "_").toLowerCase()} className="h-4 w-4 p-2 border-gray-400 border bg-white text-gray-500" />
                  <label
                    htmlFor={item.replace(/\s+/g, "_").toLowerCase()}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500"
                  >
                    {item}
                  </label>
                </div>
              </div>
            );
          })}
        </AccordionContent>
      </AccordionItem>
      {/* By Certifications end */}

      {/* By Compliance start */}
      <AccordionItem value="compliance" className="py-5 px-6">
        <AccordionTrigger className="bg-white hover:no-underline text-sm font-semibold text-gray-900 leading-5 px-0">
        By Certifications
        </AccordionTrigger>
        <AccordionContent className="space-y-4">
          {byCompliance.map((item, idx) => {
            return (
              <div className="grid grid-cols-1" key={idx}>
                <div className="flex items-center space-x-2">
                  <Checkbox id={item.replace(/\s+/g, "_").toLowerCase()} className="h-4 w-4 p-2 border-gray-400 border bg-white text-gray-500" />
                  <label
                    htmlFor={item.replace(/\s+/g, "_").toLowerCase()}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-500"
                  >
                    {item}
                  </label>
                </div>
              </div>
            );
          })}
        </AccordionContent>
      </AccordionItem>
      {/* By Compliance end */}
    </Accordion>
  );
}

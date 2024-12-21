"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import bottomIcon from "@/assets/bottom-icon.svg";
import { Checkbox } from "@/components/ui/checkbox";
import Button from "@/components/shared/button";
import Image from "next/image";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";


const Forms = () => {
  const [code, setcode] = useState("");
  const [listOpen, setlistOpen] = useState(false);

  const HandleEachList = (e) => {
    setlistOpen(false);
    setcode(e.target.innerText);
  };

  //   country codes
  const countryCode = [
    { name: "Afghanistan", code: "AF" },
    { name: "land Islands", code: "AX" },
    { name: "Albania", code: "AL" },
    { name: "Algeria", code: "DZ" },
    { name: "Bangladesh", code: "BD" },
    { name: "United Arab Emirates", code: "AE" },
    { name: "United Kingdom", code: "GB" },
    { name: "United States", code: "US" },
    { name: "Afghanistan", code: "AF" },
    { name: "land Islands", code: "AX" },
    { name: "Albania", code: "AL" },
    { name: "Algeria", code: "DZ" },
    { name: "Bangladesh", code: "BD" },
    { name: "United Arab Emirates", code: "AE" },
    { name: "United Kingdom", code: "GB" },
    { name: "United States", code: "US" },
  ];

  const HandleInput = (e) => {
    console.log(e);
  };

  const HandleForm = (e) => {
    e.preventDefault();
  };
  return (
    <form
      className="w-full md:w-[474px] lg:w-[630px] xl:w-[685px]"
      onSubmit={HandleForm}
    >
      <div className="bg-white lg:mt-0 mt-16 flex flex-col gap-y-4 w-full shadow-card-shadow p-4 xl:p-8 rounded-2xl">
        <h4 className="font-semibold text-2xl xl:text-3xl text-gray-900 md:pb-3 xl:pb-6 pb-6 text-center">
          Get in touch
        </h4>
        {/* Business Category* */}
        <div className="sm:hidden">
          <p className="font-medium text-sm text-gray-700 capitalize pb-[6px]">
            Business Category*
          </p>
          <Select>
            <SelectTrigger className="w-full  border-2 text-gray-500 text-base font-normal">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category</SelectLabel>
                <SelectItem value="Fabric">Fabric</SelectItem>
                <SelectItem value="Cotton">Cotton</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* Company name */}
        <div>
          <p className="font-medium text-sm text-gray-700 capitalize pb-[6px]">
            Company Name
          </p>
          <Input
            onChange={HandleInput}
            className="border-2 outline-0 placeholder:text-base placeholder:text-gray-500 placeholder:font-normal"
            placeholder="Company name"
          />
        </div>
        <div className="flex sm:flex-row gap-y-4 flex-col md:flex-col xl:flex-row  items-center justify-between w-full">
          {/* Your name */}
          <div className="sm:basis-[48%] w-full">
            <p className="font-medium text-sm text-gray-700 capitalize pb-[6px]">
              Your Name
            </p>
            <Input
              onChange={HandleInput}
              className="border-2 outline-0 placeholder:text-base placeholder:text-gray-500 placeholder:font-normal"
              placeholder="Type your name"
            />
          </div>
          {/* Designation */}
          <div className="sm:basis-[48%] w-full">
            <p className="font-medium text-sm text-gray-700 capitalize pb-[6px]">
              Designation
            </p>
            <Input
              onChange={HandleInput}
              className="border-2 outline-0 placeholder:text-base placeholder:text-gray-500 placeholder:font-normal"
              placeholder="Type your designation"
            />
          </div>
        </div>

        <div className="flex sm:flex-row flex-col gap-y-4  xl:flex-row md:flex-col  items-center justify-between w-full">
          {/* Your email */}
          <div className="sm:basis-[48%] w-full">
            <p className="font-medium text-sm text-gray-700 capitalize pb-[6px]">
              Email
            </p>
            <Input
              onChange={HandleInput}
              className="border-2 outline-0 placeholder:text-base placeholder:text-gray-500 placeholder:font-normal"
              placeholder="Type your email"
            />
          </div>
          {/* Phone number */}
          <div className="sm:basis-[48%] w-full">
            <p className="font-medium text-sm text-gray-700 capitalize pb-[6px]">
              Phone number
            </p>
            <div className="relative">
              <Input
                onChange={HandleInput}
                className="border-2 pl-14 outline-0 placeholder:text-base placeholder:text-gray-500 placeholder:font-normal"
                placeholder="Type your number"
              />
              <div
                onClick={() => setlistOpen(true)}
                className="flex gap-x-1 cursor-pointer items-center left-3 top-[50%] -translate-y-[50%] absolute"
              >
                <span className="font-normal text-base text-gray-700">
                  {code ? code : "BD"}
                </span>
                <Image src={bottomIcon} alt="icon" />
              </div>
              {/* country code list */}

              <div
                id="countryCodeList"
                className={`bg-gray-50 py-2 overflow-y-scroll w-full absolute top-11 z-50 left-0 flex flex-col rounded-lg h-[230px] border-2 border-gray-200 ${
                  listOpen ? "scale-100" : "scale-0"
                }`}
              >
                {countryCode?.map((item, index) => (
                  <div
                    onClick={HandleEachList}
                    key={index}
                    className="py-1 px-4 hover:text-gray-50 hover:bg-gray-500 text-sm capitalize text-gray-700"
                  >
                    {item.code}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Message */}
        <div>
          <p className="font-medium text-sm text-gray-700 capitalize pb-[6px]">
            Message
          </p>
          <textarea
            onChange={HandleInput}
            className="border-2 focus:border-gray-900 p-3 min-h-[134px] rounded-xl w-full outline-0 placeholder:text-base placeholder:text-gray-500 placeholder:font-normal"
            placeholder="Leave us a message..."
          />
        </div>
        {/* terms and condition */}
        <div className="flex items-center gap-x-2 lg:gap-x-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              className={
                "p-1 bg-transparent border border-gray-200 checked:!border-brand-600"
              }
            />
            <label
              htmlFor="terms"
              className="font-normal text-sm lg:text-base text-gray-600"
            >
              You agree to our friendly{" "}
              <a href="#" className="underline">
                privacy policy.
              </a>
            </label>
          </div>
        </div>
        {/* Send message */}
        <Button className="xl:mt-7 mt-3">Send message</Button>
      </div>
    </form>
  );
};

export default Forms;

"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Button from "@/components/shared/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    phone: "",
    message: "",
    interests: {
      sourcing: false,
      membership: false,
      branding: false,
      partnership: false,
      support: false,
    },
  });

  const handleChange = (el) => {
    const { name, value, type, checked } = el.target;
    if (type === "checkbox") {
      setFormData((prevState) => ({
        ...prevState,
        interests: {
          ...prevState.interests,
          [name]: checked,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (el) => {
    el.preventDefault();
  };

  return (
    <form
      className="max-w-[620px] mx-auto pt-6 md:p-4 bg-white  rounded-md"
      onSubmit={handleSubmit}
    >
      {/* Company Name section */}
      <div className="mb-4">
        <Label className="block text-gray-900 font-medium">Company Name*</Label>
        <Input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-200 rounded-md px-2 py-2 focus-visible:ring-0  focus-visible:ring-offset-0"
          placeholder="Enter your company name"
        />
      </div>
      {/* Company Name end */}

      {/* First Name and Last Name Fields in Flexbox */}
      <div className="mb-4 flex space-x-4">
        {/* First Name */}
        <div className="flex-1">
          <Label className="block text-gray-700 font-medium mb-2">
            First Name
          </Label>
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            className="w-full border border-gray-200 px-3 py-2 rounded-md focus-visible:ring-0  focus-visible:ring-offset-0"
          />
        </div>

        {/* Last Name */}
        <div className="flex-1">
          <Label className="block text-gray-700 font-medium mb-2">
            Last Name
          </Label>
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            className="w-full border border-gray-200 px-3 py-2 rounded-md focus-visible:ring-0  focus-visible:ring-offset-0"
          />
        </div>
      </div>
      {/* First & Last Name end */}

      {/* Email Section Start */}
      <div className="mb-4">
        <Label className="block text-gray-900 font-medium">Email</Label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-200 rounded-md px-2 py-2 focus-visible:ring-0  focus-visible:ring-offset-0"
          placeholder="Enter your email"
        />
      </div>
      {/* Email end */}

      {/* Coutry with phone number section */}
      <div className="mb-4">
        <Label className="block text-gray-900 font-medium">Phone Number</Label>
        <div className="flex border border-gray-200 rounded-md overflow-hidden">
          <Select>
            <SelectTrigger className="w-[220px] !text-gray-500 text-start">
              <SelectValue placeholder="Select Country" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Country</SelectLabel>
                <SelectItem
                  value="Australia"
                  className="text-bass !text-gray-900"
                >
                  Australia
                </SelectItem>
                <SelectItem
                  value="Bangladesh"
                  className="text-bass !text-gray-900"
                >
                  Bangladesh
                </SelectItem>
                <SelectItem value="Canada" className="text-bass !text-gray-900">
                  Canada
                </SelectItem>
                <SelectItem value="France" className="text-bass !text-gray-900">
                  France
                </SelectItem>
                <SelectItem
                  value="Germany"
                  className="text-bass !text-gray-900"
                >
                  Germany
                </SelectItem>
                <SelectItem value="India" className="text-bass !text-gray-900">
                  India
                </SelectItem>
                <SelectItem value="Japan" className="text-bass !text-gray-900">
                  Japan
                </SelectItem>
                <SelectItem
                  value="United Kingdom"
                  className="text-bass !text-gray-900"
                >
                  United Kingdom
                </SelectItem>
                <SelectItem
                  value="United States"
                  className="text-bass !text-gray-900"
                >
                  United States
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="block w-full p-2 border-none focus-visible:ring-0  focus-visible:ring-offset-0"
            placeholder="Enter phone number"
          />
        </div>
        {/* Country with Phone number end */}

        {/* Message section start*/}
      </div>
      <div className="mb-4">
        <Label className="block text-gray-900 font-medium">Message</Label>
        <Textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          className="mt-1 block w-full h-[140px] border resize-none border-gray-200 rounded-md px-2 pt-2 focus-visible:ring-0  focus-visible:ring-offset-0"
          placeholder="Enter your message"
        />
      </div>
      {/* Message section end */}

      {/* Interests Section */}
      <div className="mb-4">
        <Label className="block text-gray-700 font-medium mb-2">
          Interests
        </Label>
        <div className="flex justify-between">
          {/* Left Column: Sourcing, Membership, Branding */}
          <div className="flex flex-col space-y-2">
            <Label className="flex items-center">
              <Input
                type="checkbox"
                name="sourcing"
                checked={formData.interests.sourcing}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 border-gray-200 rounded focus:ring-indigo-500 cursor-pointer"
              />
              <span className="ml-2 text-gray-700 cursor-pointer">
                Sourcing/Buying
              </span>
            </Label>
            <Label className="flex items-center">
              <Input
                type="checkbox"
                name="membership"
                checked={formData.interests.membership}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 border-gray-200 rounded focus:ring-indigo-500 cursor-pointer"
              />
              <span className="ml-2 text-gray-700 cursor-pointer">
                Membership
              </span>
            </Label>
            <Label className="flex items-center">
              <Input
                type="checkbox"
                name="branding"
                checked={formData.interests.branding}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 border-gray-200 rounded focus:ring-indigo-500 cursor-pointer"
              />
              <span className="ml-2 text-gray-700 cursor-pointer">
                Branding & Marketing
              </span>
            </Label>
          </div>

          {/* Right Column: Partnership, Support */}
          <div className="flex flex-col space-y-2">
            <Label className="flex items-center">
              <Input
                type="checkbox"
                name="partnership"
                checked={formData.interests.partnership}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 border-gray-200 rounded focus:ring-indigo-500 cursor-pointer"
              />
              <span className="ml-2 text-gray-700 cursor-pointer">
                Partnership (Event/Trading/Media)
              </span>
            </Label>
            <Label className="flex items-center">
              <Input
                type="checkbox"
                name="support"
                checked={formData.interests.support}
                onChange={handleChange}
                className="h-4 w-4 text-indigo-600 border-gray-200 rounded focus:ring-indigo-500 cursor-pointer"
              />
              <span className="ml-2 text-gray-700 cursor-pointer">Support</span>
            </Label>
          </div>
        </div>
      </div>
      {/* Interest end */}

      {/* Send Button section */}
      <Button
        type="submit"
        className="w-full text-white py-2 rounded-md  transition duration-300"
      >
        Send
      </Button>
    </form>
  );
};

export default ContactForm;

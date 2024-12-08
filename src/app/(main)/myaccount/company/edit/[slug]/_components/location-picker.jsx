"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";

const LocationPicker = ({ form, labelStyle }) => {
  const [locationSrc, setLocationSrc] = useState(
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2829.2597554008803!2d-0.5816011245661393!3d44.83664317107062!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd5527c3c0e79a0d%3A0xc63fbfc22a16cb52!2sThe%20National%20School%20for%20the%20Judiciary%20(ENM)!5e0!3m2!1sen!2sbd!4v1733497910231!5m2!1sen!2sbd"
  );

  // const handleLocationChange = (event) => {
  //   const selectedLocation = event.target.value;
  //   const dynamicSrc = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(
  //     selectedLocation
  //   )}`;
  //   setLocationSrc(dynamicSrc);
  //   console.log("Dynamic iframe src:", dynamicSrc);
  // };

  return (
    <FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem>
          <FormLabel className={labelStyle}>Pick your location</FormLabel>
          <FormControl>
            <div>
              {/* <input
                type="text"
                className="border border-gray-200 rounded-lg p-2 mb-4"
                placeholder="Enter a location"
                onChange={(e) => {
                  field.onChange(e); // Updates the form state
                  handleLocationChange(e);
                }}
              /> */}
              <div className="border border-gray-200 rounded-2xl overflow-hidden relative">
                <iframe
                  src={locationSrc}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  width="100%"
                  height="280"
                ></iframe>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LocationPicker;

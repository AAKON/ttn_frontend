"use client";
import 'react-phone-input-2/lib/style.css'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import React, {useEffect, useState} from "react";
import PhoneInput from 'react-phone-input-2'

import Button from "@/components/shared/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link2Icon, Loader2 } from "lucide-react";
import { formLabelClasses, inputClasses } from "@/utils/input-style";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {companyBasicReq, companyBusinessContactReq, getBusinessContact, getCompanyOverview} from "@/services/company";
import TagsInput from "@/components/ui/tagsInput";
import { Link } from "@/icons";
import { LinkIcon } from "@/components/icons/linkIcon";
import LocationPicker from "./location-picker";
const labelStyle = formLabelClasses;
const inputStyle = inputClasses + " " + "h-9 bg-gray-50";

const formSchema = z.object({
  address: z.string().min(2, {
    message: "Required.",
  }),
  factory_address: z.string().optional(),
  email: z
    .string()
    .min(3, { message: "Must have at least 3 character" })
    .email({
      message: "Must be a valid email",
    }),
  whatsapp: z.string().optional(),
  phone: z.string().min(3, { message: "Enter a phone number" }),
  website: z.string().optional(),
  lat: z.string().optional(),
  lng: z.string().optional(),
});

const BusinessContactForm = ({ slug }) => {
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
    const [contactData, setContactData] = useState(null);
    const [error, setError] = useState(null);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      factory_address: "",
      email: "",
      whatsapp: "",
      phone: "",
      website: "",
        lat: contactData?.lat_long?.lat ?? "40.718625",
        lng: contactData?.lat_long?.lng ?? "-74.035536",
    },
  });

  const {
    control,
      reset,
    handleSubmit,
      setValue, watch ,formState: { errors },
  } = form;

    // Watch latitude and longitude values from the form
    const lat = watch("lat");
    const lng = watch("lng");

  // fetch business contact info
    const fetchContactData = async () => {
        try {
            setLoading(true); // Optional: Show loading when refetching
            const response = await getBusinessContact(slug);
            setContactData(response);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContactData();
    }, [slug]);

    useEffect(() => {
        if (contactData) {
            const {
                email,
                phone,
                whatsapp,
                address,
                factory_address,
                website,
                lat_long
            } = contactData;

            // Reset all form fields with the data
            reset({
                email,
                phone,
                whatsapp,
                address,
                factory_address,
                website,
                lat : lat_long?.lat ?? "40.718625",
                lng : lat_long?.lng ?? "-74.035536",
            });
        }
    }, [contactData, reset]);

  // Function to handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    const formData = {
      address: data?.address,
      factory_address: data?.factory_address,
      email: data?.email,
      whatsapp: data?.whatsapp,
      phone: data?.phone,
      website: data?.website,
      location: {
        lat: data?.lat,
        lng: data?.lng,
      },
    };
    try {
      const result = await companyBusinessContactReq(slug, formData, toast);
      if (result.status && result.code === 200) {
        //form reset
      }
    } catch (error) {
      console.log("Error in submitting:", error.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-3 lg:gap-3">
              <div className="grid gap-3 grid-cols-1">
                  <FormField
                      control={form.control}
                      name="address"
                      render={({field}) => (
                          <FormItem>
                              <FormLabel className={labelStyle}>Address (Office) <span
                                  className="text-red-600">*</span></FormLabel>
                              <FormControl>
                                  <Input
                                      className={inputStyle}
                                      placeholder="Enter Address"
                                      type="text"
                                      {...field}
                                  />
                              </FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="factory_address"
                      render={({field}) => (
                          <FormItem>
                              <FormLabel className={labelStyle}>Address (Factory)</FormLabel>
                              <FormControl>
                                  <Input
                                      className={inputStyle}
                                      placeholder="Enter Factory Address"
                                      type="text"
                                      {...field}
                                  />
                              </FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
              </div>
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                  <FormField
                      control={form.control}
                      name="email"
                      render={({field}) => (
                          <FormItem>
                              <FormLabel className={labelStyle}>Email <span
                                  className="text-red-600">*</span></FormLabel>
                              <FormControl>
                                  <Input
                                      className={inputStyle}
                                      placeholder="Enter email"
                                      type="email"
                                      {...field}
                                  />
                              </FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
                  <div className="space-y-2">
                      <label className="block text-sm text-gray-900 font-normal mb-3">
                          Phone <span
                          className="text-red-600">*</span>
                      </label>
                      <PhoneInput
                          country={"us"}
                          enableSearch={true}
                          value={contactData?.phone}
                          onChange={(value) => setValue("phone", value)}
                          inputClass="!bg-background !w-full !h-10 !border-gray-200 !rounded-md"
                          buttonClass="bg-gray-50 !h-10 !border-gray-200 !rounded-l-md"
                      />
                      {errors.phone && (
                          <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
                      )}
                  </div>
              </div>
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                  <div className="space-y-2">
                      <label className="block text-sm text-gray-900 font-normal mb-3">
                          WhatsApp
                      </label>
                      <PhoneInput
                          country={"us"}
                          enableSearch={true}
                          value={contactData?.whatsapp}
                          onChange={(value) => setValue("whatsapp", value)}
                          inputClass="!bg-background !w-full !h-10 !border-gray-200 !rounded-md"
                          buttonClass="bg-gray-50 !h-10 !border-gray-200 !rounded-l-md"
                      />
                      {errors.whatsapp && (
                          <p className="mt-2 text-sm text-red-600">{errors.whatsapp.message}</p>
                      )}
                  </div>
                  <FormField
                      control={form.control}
                      name="website"
                      render={({field}) => (
                          <FormItem>
                              <FormLabel className={labelStyle}>Website</FormLabel>
                              <FormControl>
                                  <div className="relative">
                                      <Input
                                          className={inputStyle + " pr-10"}
                                          placeholder="Enter website url"
                                          type="text"
                                          {...field}
                                      />
                                      <LinkIcon className="absolute right-2 top-1/2 -translate-y-1/2"/>
                                  </div>
                              </FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
              </div>
              <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <FormField
                      control={form.control}
                      name="lat"
                      render={({field}) => (
                          <FormItem>
                              <FormLabel className={labelStyle}>Location latitude</FormLabel>
                              <FormControl>
                                  <Input
                                      className={inputStyle + " pr-10"}
                                      placeholder="Enter latitude"
                                      type="text"
                                      {...field}
                                  />
                              </FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
                  <FormField
                      control={form.control}
                      name="lng"
                      render={({field}) => (
                          <FormItem>
                              <FormLabel className={labelStyle}>Location longitude</FormLabel>
                              <FormControl>
                                  <Input
                                      className={inputStyle + " pr-10"}
                                      placeholder="Enter longitude"
                                      type="text"
                                      {...field}
                                  />
                              </FormControl>
                              <FormMessage/>
                          </FormItem>
                      )}
                  />
              </div>
              <div>

              </div>
                  <div className="grid grid-cols-1">
                      <LocationPicker lat={lat} lng={lng} labelStyle={labelStyle}/>
                  </div>
                  <Button type="submit" secondary disabled={loading} className="h-9">
                      {loading ? (
                          <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                              Please wait
                          </>
                      ) : (
                          "Submit"
                      )}
                  </Button>
              </div>
      </form>
    </Form>
);
};

export default BusinessContactForm;

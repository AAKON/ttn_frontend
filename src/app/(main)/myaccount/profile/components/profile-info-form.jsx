"use client";
import 'react-phone-input-2/lib/style.css'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";

import {getProfile, updateUserProfileReq} from "@/services/auth/auth";

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
import { Loader2 } from "lucide-react";
import { formLabelClasses, inputClasses } from "@/utils/input-style";
import FileUploadPreview from "@/components/ui/file-upload-preview";
import {toast} from "@/hooks/use-toast";
import PhoneInput from 'react-phone-input-2'
import ProfileImage from './profile-image';
import { useSession } from "next-auth/react"


const formSchema = z.object({
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
});

const ProfileInfoForm = () => {
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const { data, update } = useSession();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: profile?.first_name ? profile?.first_name : "",
      last_name: profile?.last_name ? profile?.last_name : "",
      email: profile?.email ? profile?.email : "",
      phone: profile?.phone ? profile?.phone : ""
    },
  });

  const { reset, setValue, formState: { errors } } = form; // Destructure the `reset` function

  // Get profile data
  const getProfileData = async () => {
    try {
      const result = await getProfile();
      setProfile(result);

      // Set form values with fetched profile data
      reset({
        first_name: result.first_name || "",
        last_name: result.last_name || "",
        email: result.email || "",
        phone: result.phone || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  // Function to handle form submission
  const onSubmit = async (data) => {
    const {first_name, last_name, email, phone} = data;
    setLoading(true);

    const formData = new FormData();
    formData.append('first_name', first_name);
    formData.append('last_name', last_name);
    formData.append('email', email);
    formData.append('phone', phone);
    if (fileData) {
      formData.append('image', fileData);
    }
    try {
      const result = await updateUserProfileReq(formData, toast);
      if (result.status && result.code === 200) {
        await update({
          profile_image: result?.data?.profile_picture
        });
        // window.location.reload();
        getProfileData();
      }
    }catch (error) {
      console.log("Error in profile update:", error.message);
    } finally {
      setLoading(false);
    }
  };

  console.log(data, 'get session?.profile_image')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-start">
          {/* <FileUploadPreview
            onImageChange={({ file }) => {
              setFileData(file);
            }}
            initialImage={profile?.profile_picture}
          /> */}
          <ProfileImage
            onImageChange={({ file }) => {
              setFileData(file);
            }}
            initialImage={profile?.profile_picture}
          />
        </div>

        <ul className="grid grid-cols-1 gap-3 lg:gap-5">
          <li>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={formLabelClasses}>First Name</FormLabel>
                    <FormControl>
                      <Input
                        className={`${inputClasses} bg-gray-50`}
                        placeholder="Enter your first name"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                      <FormItem>
                        <FormLabel className={formLabelClasses}>Last Name</FormLabel>
                        <FormControl>
                          <Input
                              className={`${inputClasses} bg-gray-50`}
                              placeholder="Enter your last name"
                              type="text"
                              {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                  )}
              />
            </div>
          </li>

          <li>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                      <FormItem>
                        <FormLabel className={formLabelClasses}>Email</FormLabel>
                        <FormControl>
                          <Input
                              className={`${inputClasses} bg-gray-50`}
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
                  Phone Number
                </label>
                <PhoneInput
                    country={"us"}
                    enableSearch={true}
                    value={profile?.phone}
                    onChange={(value) => setValue("phone", value)}
                    inputClass="!bg-background !w-full !h-10 !border-gray-200 !rounded-md"
                    buttonClass="bg-gray-50 !h-10 !border-gray-200 !rounded-l-md"
                />
                {errors.phone && (
                    <p className="mt-2 text-sm text-red-600">{errors.phone.message}</p>
                )}
              </div>
            </div>
          </li>
        </ul>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <Button
              type="submit"
              disabled={loading}
              className="px-[62px]"
          >
            {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                  Please wait
                </>
            ) : (
                "Save"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileInfoForm;

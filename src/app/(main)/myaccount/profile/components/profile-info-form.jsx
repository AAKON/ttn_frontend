"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";

import { getProfile } from "@/services/auth/auth";

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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email("Invalid email address"),
});

const ProfileInfoForm = () => {
  const [fileData, setFileData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const { reset } = form; // Destructure the `reset` function

  // Function to handle form submission
  const onSubmit = async (data) => {
    const formData = {
      ...data,
      profile_pic: fileData,
    };
    console.log(formData);
  };

  // Get profile data
  const getProfileData = async () => {
    try {
      const result = await getProfile();
      setProfile(result);

      // Set form values with fetched profile data
      reset({
        name: result.name || "",
        email: result.email || "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-start">
          <FileUploadPreview
            onImageChange={({ file }) => {
              setFileData(file);
            }}
          />
        </div>

        <ul className="grid grid-cols-1 gap-3 lg:gap-5">
          <li>
            <div className="grid grid-cols-1">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={formLabelClasses}>Name</FormLabel>
                    <FormControl>
                      <Input
                        className={`${inputClasses} bg-gray-50`}
                        placeholder="Enter your name"
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
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={formLabelClasses}>Email</FormLabel>
                    <FormControl>
                      <Input
                        className={`${inputClasses} bg-gray-50`}
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className={formLabelClasses}>Phone</FormLabel>
                    <FormControl>
                      <Input
                        className={`${inputClasses} bg-gray-50`}
                        placeholder="012284634343"
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
        </ul>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <Button
            secondary
            type="submit"
            disabled={loading}
            className="px-[62px]"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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

"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useToast} from "@/hooks/use-toast";
import {useState, useEffect} from "react";

import Button from "@/components/shared/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Loader2} from "lucide-react";
import {formLabelClasses, inputClasses} from "@/utils/input-style";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {companyBasicUpdateReq} from "@/services/company";
import DropDownTags from "@/components/ui/dropDownTags";
import FileUploadPreview from "@/components/ui/file-upload-preview";

const labelStyle = formLabelClasses;
const inputStyle = inputClasses + " " + "h-9 bg-gray-50";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    moto: z.string().optional(),
    business_category_id: z.number({
        required_error: "Please select an category.",
    }),
    certificates: z
        .array(z.any())
        .min(1, {message: "Please add at least one certificates."}),
    company_website: z.string().optional(),
    location_id: z.number({required_error: "Please select location."}),
    manpower: z.string().optional(),
    about: z.string().optional(),
    profile_pic: z.string().optional(),
});

const CompanyBasicForm = ({slug, preData, basic}) => {
    const [loading, setLoading] = useState(false);
    const {toast} = useToast();
    const [fileData, setFileData] = useState(null); // File object
    const [initialImage, setInitialImage] = useState("");

    // Options for the select dropdown
    const tagOptions =
        preData?.certificates?.map((item) => ({
            label: item.name,
            value: item.id,
        })) || [];

    const initialCompliances =
        (basic?.certificates &&
            Array.isArray(basic?.certificates) &&
            basic?.certificates.length > 0 &&
            basic?.certificates?.map((item) => ({
                label: item.name,
                value: item.id,
            }))) ||
        [];

    // Function to handle form submission
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            moto: "",
            business_category_id: "",
            certificates: [],
            company_website: "",
            location_id: "",
            manpower: "",
            about: "",
            profile_pic: "",
        },
    });
    const {
        control,
        handleSubmit,
        formState: {errors},
        setValue,
    } = form;

    useEffect(() => {
        if (basic) {
            setValue("name", basic?.name || "");
            setValue("moto", basic?.moto || "");
            setValue("manpower", basic?.manpower || "");
            setValue("about", basic?.about || "");
            if (basic?.certificates) {
                setValue("certificates", initialCompliances || []);
            }
            setValue("company_website", basic?.company_website || "");
            setValue("about", basic?.about || "");
            setValue("business_category_id", basic?.businessCategory?.id || "");
            setValue("location_id", basic?.location?.id || "");

            setInitialImage(basic?.thumbnail_url || "");
        }
    }, [basic, setValue]);

    const handleImageChange = ({file}) => {
        setFileData((prev) => ({...prev, imageFile: file}));
    };

    const onSubmit = async (data) => {
        console.log(data, "get ddd");

        const {
            name,
            moto,
            business_category_id,
            certificates,
            company_website,
            location_id,
            manpower,
            about,
        } = data;
        const formData = new FormData();

        // Normalize the data to extract values
        const normalizedCompliances = certificates.map((item) =>
            typeof item === "object" ? item.value : item
        );

        formData.append("name", name);
        if (moto.trim() !== "") {
            formData.append("moto", moto);
        }
        formData.append("business_category_id", business_category_id);
        normalizedCompliances.forEach((value, index) => {
            formData.append(`certificates[${index}]`, value);
        });
        if (company_website.trim() !== "") {
            formData.append("company_website", company_website);
        }
        formData.append("location_id", location_id);
        formData.append("manpower", manpower);
        if (about.trim() !== "") {
            formData.append("about", about);
        }
        if (fileData?.imageFile && fileData?.imageFile !== "") {
            formData.append("profile_pic", fileData.imageFile);
        }

        setLoading(true);

        try {
            const result = await companyBasicUpdateReq(slug, formData, toast);
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
                <div className="flex justify-start">
                    <FileUploadPreview
                        initialImage={initialImage}
                        onImageChange={handleImageChange}
                    />
                </div>
                <div className="grid grid-cols-1 gap-3 lg:gap-3">
                    <div className="grid gap-3 grid-cols-12">
                        <div className="col-span-12 md:col-span-6 lg:col-span-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={labelStyle}>Company Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                className={inputStyle}
                                                placeholder="CodeBlue Clothing Pvt Ltd"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6 lg:col-span-4">
                            <FormField
                                control={form.control}
                                name="location_id"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={labelStyle}>Country</FormLabel>
                                        <Select
                                            defaultValue={basic?.location?.id?.toString()}
                                            onValueChange={(value) => field.onChange(Number(value))}
                                        >
                                            <FormControl>
                                                <SelectTrigger
                                                    className={`focus:ring-0 focus:ring-offset-0 focus:ring-offset-none text-gray-900 h-9 font-normal bg-gray-50`}
                                                >
                                                    <SelectValue
                                                        placeholder="Select location"
                                                        className="text-gray-400 font-normal text-sm"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {preData?.locations?.map((location) => (
                                                    <SelectItem
                                                        key={location.id}
                                                        value={String(location.id)}
                                                    >
                                                        {location.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name="moto"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className={labelStyle}>Company Motto</FormLabel>
                                <FormControl>
                                    <Input
                                        className={inputStyle}
                                        placeholder="Tour tagline here"
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
                        name="business_category_id"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className={labelStyle}>Category</FormLabel>
                                <Select
                                    defaultValue={basic?.businessCategory?.id?.toString()}
                                    onValueChange={(value) => field.onChange(Number(value))}
                                >
                                    <FormControl>
                                        <SelectTrigger
                                            className={`focus:ring-0 focus:ring-offset-0 focus:ring-offset-none text-gray-900 h-9 font-normal bg-gray-50`}
                                        >
                                            <SelectValue
                                                placeholder="Select Category"
                                                className="text-gray-400 font-normal text-sm"
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {preData?.categories?.map((category) => (
                                            <SelectItem
                                                key={category.id}
                                                value={String(category.id)}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
                        name="certificates"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Certificates</FormLabel>
                                <DropDownTags
                                    value={field.value}
                                    onChange={field.onChange}
                                    options={tagOptions}
                                />
                                <FormMessage>{errors.tags?.message}</FormMessage>
                            </FormItem>
                        )}
                    />
                    <div className="grid grid-cols-12 gap-3">
                        <div className="col-span-12 md:col-span-6 lg:col-span-8">
                            <FormField
                                control={form.control}
                                name="company_website"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={labelStyle}>Company Website</FormLabel>
                                        <FormControl>
                                            <Input
                                                className={inputStyle}
                                                placeholder="www.companyurl.com"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6 lg:col-span-4">
                            <FormField
                                control={form.control}
                                name="manpower"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={labelStyle}>Company size</FormLabel>
                                        <Select
                                            defaultValue={basic?.manpower}
                                            onValueChange={field.onChange}
                                        >
                                            <FormControl>
                                                <SelectTrigger
                                                    className={`focus:ring-0 focus:ring-offset-0 focus:ring-offset-none text-gray-900 h-9 font-normal bg-gray-50`}
                                                >
                                                    <SelectValue
                                                        placeholder="Select Category"
                                                        className="text-gray-400 font-normal text-sm"
                                                    />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Small (Below 1000 Manpower)">Small (Below 1000 Manpower)</SelectItem>
                                                <SelectItem value="Medium (1000 - 10000 Manpower)">Medium (1000 - 10000 Manpower)</SelectItem>
                                                <SelectItem value="Large (Above 10000 Manpower)">Large (Above 10000 Manpower)</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <FormField
                        control={form.control}
                        name="about"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel className={labelStyle}>About us</FormLabel>
                                <FormControl>
                                    <Textarea
                                        className={`${inputStyle} min-h-[200px] max-h-[500px]`}
                                        placeholder="Enter a description"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-start">
                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-[200px] h-9"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                Please wait
                            </>
                        ) : (
                            "Done"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default CompanyBasicForm;

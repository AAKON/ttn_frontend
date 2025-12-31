"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { companyBasicUpdateReq } from "@/services/company";
import DropDownTags from "@/components/ui/dropDownTags";
import FileUploadPreview from "@/components/ui/file-upload-preview";

const labelStyle = formLabelClasses;
const inputStyle = inputClasses + " " + "h-9 bg-gray-50";

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
	moto: z.string().optional(),
	business_categories: z
		.array(z.any())
		.min(1, { message: "Please select an category" }),
	business_types: z.array(z.any()).min(1, { message: "Please select an type" }),
	location_id: z.number({ required_error: "Please select location." }),
	manpower: z.string({ message: "Please select company size." }),
	about: z.string({ message: "Add about company." }),
	profile_pic: z.string().optional(),
});

const CompanyBasicForm = ({ slug, preData, basic }) => {
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();
	const [fileData, setFileData] = useState(null); // File object
	const [initialImage, setInitialImage] = useState("");

	// Options for the select dropdown category
	const categoryOptions =
		(preData &&
			preData?.business_categories.length > 0 &&
			preData?.business_categories?.map((item) => ({
				label: item.name,
				value: item.id,
			}))) ||
		[];

	// Options for the select dropdown types
	const btypesOptions =
		(preData &&
			preData?.business_types.length > 0 &&
			preData?.business_types?.map((item) => ({
				label: item.name,
				value: item.id,
			}))) ||
		[];

	// Options for the select dropdown
	const tagOptions =
		preData?.certificates?.map((item) => ({
			label: item.name,
			value: item.id,
		})) || [];

	const initialCategories =
		(basic?.businessCategories &&
			Array.isArray(basic?.businessCategories) &&
			basic?.businessCategories.length > 0 &&
			basic?.businessCategories?.map((item) => ({
				label: item.name,
				value: item.id,
			}))) ||
		[];

	const initialBtypes =
		(basic?.businessTypes &&
			Array.isArray(basic?.businessTypes) &&
			basic?.businessTypes.length > 0 &&
			basic?.businessTypes?.map((item) => ({
				label: item.name,
				value: item.id,
			}))) ||
		[];

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
			business_categories: [],
			business_types: [],
			location_id: "",
			manpower: "",
			about: "",
			profile_pic: "",
		},
	});
	const {
		control,
		handleSubmit,
		formState: { errors },
		setValue,
	} = form;

	useEffect(() => {
		if (basic) {
			setValue("name", basic?.name || "");
			setValue("moto", basic?.moto || "");
			setValue("manpower", basic?.manpower || "");
			setValue("about", basic?.about || "");
			if (basic?.businessCategories) {
				setValue("business_categories", initialCategories || []);
			}
			if (basic?.businessTypes) {
				setValue("business_types", initialBtypes || []);
			}
			setValue("about", basic?.about || "");
			setValue("business_category_id", basic?.businessCategory?.id || "");
			setValue("location_id", basic?.location?.id || "");

			setInitialImage(basic?.thumbnail_url || "");
		}
	}, [basic, setValue]);

	const handleImageChange = ({ file }) => {
		setFileData((prev) => ({ ...prev, imageFile: file }));
	};

	const onSubmit = async (data) => {
		const {
			name,
			moto,
			business_categories,
			business_types,
			location_id,
			manpower,
			about,
		} = data;
		const formData = new FormData();

		// Normalize the data to extract values
		const normalizedCategories = business_categories.map((item) =>
			typeof item === "object" ? item.value : item
		);
		// Normalize the data to extract values
		const normalizedBtypes = business_types.map((item) =>
			typeof item === "object" ? item.value : item
		);

		formData.append("name", name);
		if (moto.trim() !== "") {
			formData.append("moto", moto);
		}
		normalizedCategories.forEach((item, index) => {
			formData.append(`business_categories[${index}]`, item);
		});
		normalizedBtypes.forEach((item, index) => {
			formData.append(`business_types[${index}]`, item);
		});
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
				<div className="grid grid-cols-1 gap-3 lg:gap-3">
					<div className="grid gap-3 grid-cols-12">
						<div className="col-span-12 md:col-span-6 lg:col-span-8">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel className={labelStyle}>
											Company Name <span className="text-red-600">*</span>
										</FormLabel>
										<FormControl>
											<Input
												className={inputStyle}
												placeholder="Write your company name"
												type="text"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="col-span-12 md:col-span-6 lg:col-span-4">
							<FormField
								control={form.control}
								name="manpower"
								render={({ field }) => (
									<FormItem>
										<FormLabel className={labelStyle}>
											Company size <span className="text-red-600">*</span>
										</FormLabel>
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
											<SelectContent className="max-h-[300px] overflow-y-auto">
												<SelectItem value="Small (Below 1000 Manpower)">
													Small (Below 1000 Manpower)
												</SelectItem>
												<SelectItem value="Medium (1000 - 10000 Manpower)">
													Medium (1000 - 10000 Manpower)
												</SelectItem>
												<SelectItem value="Large (Above 10000 Manpower)">
													Large (Above 10000 Manpower)
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
					<div>
						<FormField
							control={form.control}
							name="location_id"
							render={({ field }) => (
								<FormItem>
									<FormLabel className={labelStyle}>
										Country <span className="text-red-600">*</span>
									</FormLabel>
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
										<SelectContent className="max-h-[300px] overflow-y-auto">
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
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div>
						<FormField
							control={control}
							name="business_categories"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Category <span className="text-red-600">*</span>
									</FormLabel>
									<DropDownTags
										value={field.value}
										onChange={field.onChange}
										options={categoryOptions}
									/>
									<FormMessage>
										{errors.business_categories?.message}
									</FormMessage>
								</FormItem>
							)}
						/>
					</div>
					<div>
						<FormField
							control={control}
							name="business_types"
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Type <span className="text-red-600">*</span>
									</FormLabel>
									<DropDownTags
										value={field.value}
										onChange={field.onChange}
										options={btypesOptions}
									/>
									<FormMessage>{errors.business_types?.message}</FormMessage>
								</FormItem>
							)}
						/>
					</div>
					<div>
						<FormField
							control={form.control}
							name="moto"
							render={({ field }) => (
								<FormItem>
									<FormLabel className={labelStyle}>Company Motto</FormLabel>
									<FormControl>
										<Input
											className={inputStyle}
											placeholder="Enter company moto"
											type="text"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div>
						<FormField
							control={form.control}
							name="about"
							render={({ field }) => (
								<FormItem>
									<FormLabel className={labelStyle}>
										About us <span className="text-red-600">*</span>
									</FormLabel>
									<FormControl>
										<Textarea
											className={`${inputStyle} min-h-[200px] max-h-[500px]`}
											placeholder="Enter a description"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div>
						<h3 className={labelStyle + " mb-2 mt-2"}>Profile Image</h3>
						<div className="flex justify-start">
							<FileUploadPreview
								initialImage={initialImage}
								onImageChange={handleImageChange}
							/>
						</div>
					</div>
				</div>

				{/* Buttons */}
				<div className="flex justify-start">
					{/* Submit Button */}
					<Button type="submit" disabled={loading} className="w-[200px] h-9">
						{loading ? (
							<>
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
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

"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {string, z} from "zod";
import {useToast} from "@/hooks/use-toast";
import {useState} from "react";

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
import {uploadProductReq} from "@/services/product";
import DragDropFile from "@/components/shared/DragDropFile";

const labelStyle = formLabelClasses;
const inputStyle = inputClasses + " " + "h-9 bg-gray-50 !mt-[6px]";

const formSchema = z.object({
    product_category_id: z.number({
        message: "Please select an category.",
    }),
    moq: z.string().optional(),
    name: z.string().optional(),
    price_range: z.string().optional(),
    file: z.any().refine(val => val.length > 0, "Product image is required")
});

const ProductsForm = ({preData, slug, onSuccess}) => {
    const [loading, setLoading] = useState(false);
    const {toast} = useToast();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            product_category_id: "",
            moq: "",
            file: [],
            name: "",
            price_range: "",
        },
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: {errors},
    } = form;

    // Function to handle form submission
    const onSubmit = async (data) => {

        setLoading(true);

        const {name, product_category_id, price_range} = data;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("product_category_id", product_category_id);
        formData.append("price_range", price_range);
        if (data.file && data.file.length > 0) {
            formData.append('image', data.file[0]);
        }

        try {
            const result = await uploadProductReq(slug, formData, toast);
            if (result.status && result.code === 200) {
                reset();
                onSuccess();
            }
        } catch (error) {
            console.log("Error in product create:", error.message);
        } finally {
            setLoading(false);
        }


    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <p className="font-semibold leading-7 text-xl text-gray-900 pb-4">
                    Products/Services
                </p>
                <FormField
                    control={form.control}
                    name="product_category_id"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className={labelStyle}>Category</FormLabel>
                            <Select onValueChange={(value) => field.onChange(Number(value))}>
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
                                        <SelectItem key={category.id} value={String(category.id)}>
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col">
                        <FormLabel className={`${labelStyle} mb-3`}>Product Image</FormLabel>
                        <DragDropFile
                            name="file" control={control}
                        />
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className={labelStyle}>Product Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            className={inputStyle}
                                            placeholder="Enter product title"
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
                            name="price_range"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className={labelStyle}>Product Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            className={inputStyle}
                                            placeholder="Your Product Price"
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
                            name="moq"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className={labelStyle}>MOQ</FormLabel>
                                    <FormControl>
                                        <Input
                                            className={inputStyle}
                                            placeholder="500 Piece/Pieces (Min. Order)"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>


                {/* Buttons */}
                <div className="flex justify-end">
                    {/* Submit Button */}
                    <Button secondary type="submit" disabled={loading} className="h-9 w-[200px]">
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

export default ProductsForm;

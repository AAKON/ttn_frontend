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
    name: z.string().min(3,{ message: 'Product name is required'}),
    price_min: z.coerce.number().min(1,{ message: 'Minimum price is required'}),
    price_max:  z.coerce.number().min(1,{ message: 'Maximum price is required'}),
    moq_min:  z.coerce.number().min(1,{ message: 'Minimum order is required'}),
    moq_max:  z.coerce.number().min(1,{ message: 'Maximum order is required'}),
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
            price_min: "",
            price_max: "",
            moq_min: "",
            moq_max: ""
        },
    });

    const {
        control,
        handleSubmit,
        reset,
        watch,
        formState: {errors},
    } = form;

    // Function to handle form submission
    const onSubmit = async (data) => {

        setLoading(true);

        const {name, product_category_id, price_min, price_max, moq_min, moq_max} = data;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("product_category_id", product_category_id);
        formData.append("price_range", `${price_min}-${price_max}`);
        formData.append("moq", `${moq_min}-${moq_max}`);
        if (data.file && data.file.length > 0) {
            formData.append('image', data.file[0]);
        }

        try {
            const result = await uploadProductReq(slug, formData, toast);
            if (result.status && result.code === 200) {
                reset({file: null});
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
                            <FormLabel className={labelStyle}>Category <span className="text-red-600">*</span></FormLabel>
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
                        <FormLabel className={`${labelStyle} mb-3`}>Product Image <span
                            className="text-red-600">*</span></FormLabel>
                        <DragDropFile
                            name="file" control={control}
                            defaultValue={watch('file')}
                        />
                    </div>
                    <div className="flex flex-col gap-y-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel className={labelStyle}>Product Title <span
                                        className="text-red-600">*</span></FormLabel>
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
                        <div className="flex flex-nowrap gap-2 items-center">
                            <FormField
                                control={form.control}
                                name="price_min"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={labelStyle}>Product Price (Min) <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                        <Input
                                                className={inputStyle}
                                                placeholder="Your Product Price"
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="w-2.5">
                                <div className="h-[1px] bg-gray-300 w-full"></div>
                            </div>
                            <FormField
                                control={form.control}
                                name="price_max"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={labelStyle}>Product Price (Max) <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                        <Input
                                                className={inputStyle}
                                                placeholder="Your Product Price"
                                                type="number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-nowrap gap-2 items-center">
                            <FormField
                                control={form.control}
                                name="moq_min"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={labelStyle}>MOQ (Min) <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                className={inputStyle}
                                                placeholder="500 Piece/Pieces (Min. Order)"
                                                type="number"
                                                min={1}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <div className="w-2.5">
                                <div className="h-[1px] bg-gray-300 w-full"></div>
                            </div>
                            <FormField
                                control={form.control}
                                name="moq_max"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={labelStyle}>MOQ (Max) <span
                                            className="text-red-600">*</span></FormLabel>
                                        <FormControl>
                                            <Input
                                                className={inputStyle}
                                                placeholder="500 Piece/Pieces (Min. Order)"
                                                type="number"
                                                min={1}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
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

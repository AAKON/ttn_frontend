"use client";
import {EditIcon} from "@/components/icons";
import Button from "@/components/shared/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogOverlay
} from "@/components/ui/dialog";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {string, z} from "zod";
import {useToast} from "@/hooks/use-toast";
import {useState} from "react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {Loader2} from "lucide-react";
import {formLabelClasses, inputClasses} from "@/utils/input-style";
import {ScrollArea} from "@/components/ui/scroll-area";
import DragDropFile from "@/components/shared/DragDropFile";
import {updateProductReq, uploadProductReq} from "@/services/product";

const labelStyle = formLabelClasses;
const inputStyle = inputClasses + " " + "h-9 bg-gray-50";

const formSchema = z.object({
    product_category_id: z.string({required_error: "Please select category."}),
    image: z.any().optional(),
    name: z.string().min(3, {message: "Product name is required"}),
    price_min: z.coerce.number().min(1, {message: "Minimum price is required"}),
    price_max: z.union([z.coerce.number(), z.nan()]).optional(),
    moq: z.coerce.number().min(1, {message: "Minimum order is required"})
});

const ProductEditModal = ({
                              children = (
                                  <Button secondary type="button">
                                      <EditIcon stroke="#667085"/>
                                  </Button>
                              ),
                              preData,
                              slug,
                              data,
                              onSuccess,
                          }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleDialogClose = () => {
        setIsOpen(false);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[600px] z-50">
                <DialogHeader>
                    <DialogTitle>Edit product</DialogTitle>
                </DialogHeader>
                <ScrollArea className="py-4 h-[85svh]">
                    <ProductUpdateForm
                        preData={preData}
                        slug={slug}
                        data={data}
                        onUpdateSuccess={() => {
                            console.log("onUpdateSuccess triggered.");
                            console.log("onSuccess value:", onSuccess);
                            handleDialogClose();
                            if (typeof onSuccess === "function") {
                                console.log("Calling onSuccess...");
                                onSuccess(); // Call the passed down function
                            } else {
                                console.warn("onSuccess is not a valid function:", onSuccess);
                            }
                        }}
                    />
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

const ProductUpdateForm = ({preData, slug, data, onUpdateSuccess}) => {
    const [loading, setLoading] = useState(false);
    const {toast} = useToast();

    const id = data?.id;

    const tagOptions =
        (preData &&
            preData.length > 0 &&
            preData.map((item) => ({
                label: item.name,
                value: item.id,
            }))) ||
        [];

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            product_category_id: data?.product_category_id ? data?.product_category_id?.toString() : null,
            image: data?.image_url || "",
            name: data?.name || "",
            // Parse price_range into price_min and price_max
            price_min: data?.price_range
                ? Number(data?.price_range.split("-")[0])
                : "",
            price_max: data?.price_range?.includes("-")
                ? Number(data?.price_range.split("-")[1])
                : "",
            moq: data?.moq ? Number(data.moq) : "",
        },
    });

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = form;

    const onSubmit = async (data) => {
        setLoading(true);
        const {
            name,
            product_category_id,
            image,
            price_min,
            price_max,
            moq
        } = data;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("product_category_id", product_category_id);
        if (price_max) {
            formData.append("price_range", `${price_min}-${price_max}`);
        } else {
            formData.append("price_range", price_min);
        }
        formData.append("moq", moq);
        if (image && Array.isArray(image) && image.length > 0) {
            formData.append("image", image[0]);
        }

        try {
            const result = await updateProductReq(slug, id, formData, toast);
            if (result.status && result.code === 200) {
                onUpdateSuccess();
            }
        } catch (error) {
            console.log("Error in product update:", error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="product_category_id"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>
                                Category <span className="text-red-600">*</span>
                            </FormLabel>
                            <Select
                                defaultValue={data?.product_category_id?.toString()}
                                onValueChange={(value) => field.onChange(value)}
                                value={field.value}
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
                                    {tagOptions &&
                                        tagOptions.length > 0 &&
                                        tagOptions?.map((category) => (
                                            <SelectItem key={category?.value} value={String(category?.value)}>
                                                {category?.label}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex flex-col">
                    <FormLabel className={`${labelStyle} mb-3`}>
                        Product Image <span className="text-red-600">*</span>
                    </FormLabel>
                    <DragDropFile
                        name="image"
                        control={control}
                        initialFile={data?.image_url}
                        defaultValue={data?.image_url}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className={labelStyle}>
                                Product Title <span className="text-red-600">*</span>
                            </FormLabel>
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

                <div className="flex flex-nowrap gap-2 items-stretch">
                    <FormField
                        control={form.control}
                        name="price_min"
                        onValueChange={(value) => field.onChange(value)}
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormLabel className={labelStyle}>
                                    Product Price (Min) <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className={inputStyle}
                                        placeholder="Product min price"
                                        type="number"
                                        {...field}
                                        onBlur={() => {
                                            const maxPrice = form.watch("price_max");
                                            const minPrice = field.value;
                                            if (
                                                minPrice &&
                                                maxPrice &&
                                                Number(minPrice) >= Number(maxPrice)
                                            ) {
                                                form.setError("price_min", {
                                                    type: "validate",
                                                    message: "Min price must be less than max price",
                                                });
                                            } else {
                                                form.clearErrors("price_min");
                                                form.clearErrors("price_max");
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className="w-2.5 flex item-center">
                        <div
                            className={`h-[1px] bg-gray-300 self-center w-full ${
                                form.formState.errors.price_min ||
                                form.formState.errors.price_max
                                    ? "mt-[-15px]"
                                    : "mt-[30px]"
                            }`}
                        ></div>
                    </div>
                    <FormField
                        control={form.control}
                        name="price_max"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormLabel className={labelStyle}>
                                    Product Price (Max)
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className={inputStyle}
                                        placeholder="Product max price"
                                        type="number"
                                        {...field}
                                        onBlur={() => {
                                            const minPrice = form.watch("price_min");
                                            const maxPrice = field.value;
                                            if (
                                                minPrice &&
                                                maxPrice &&
                                                Number(maxPrice) <= Number(minPrice)
                                            ) {
                                                form.setError("price_max", {
                                                    type: "validate",
                                                    message: "Max price must be greater than min price",
                                                });
                                            } else {
                                                form.clearErrors("price_min");
                                                form.clearErrors("price_max");
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex flex-nowrap gap-2 items-stretch">
                    <FormField
                        control={form.control}
                        name="moq"
                        render={({field}) => (
                            <FormItem className="w-full">
                                <FormLabel className={labelStyle}>
                                    Minimum Order Quantity (MOQ) <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className={inputStyle}
                                        placeholder="500 Piece/Pieces (Min. Order)"
                                        type="number"
                                        min={1}
                                        {...field}
                                        onBlur={() => {
                                            const maxQty = form.watch("moq_max");
                                            const minQty = field.value;
                                            if (
                                                minQty &&
                                                maxQty &&
                                                Number(minQty) >= Number(maxQty)
                                            ) {
                                                form.setError("moq_min", {
                                                    type: "validate",
                                                    message: "Min order must be less than max order",
                                                });
                                            } else {
                                                form.clearErrors("moq_min");
                                                form.clearErrors("moq_max");
                                            }
                                        }}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className="w-2.5 flex item-center">
                        <div
                            className={`h-[1px] bg-gray-300 self-center w-full ${
                                form.formState.errors.moq_min || form.formState.errors.moq_max
                                    ? "mt-[-15px]"
                                    : "mt-[30px]"
                            }`}
                        ></div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button
                        type="submit"
                        disabled={loading}
                        className="h-9 min-w-40 self-end"
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

export default ProductEditModal;
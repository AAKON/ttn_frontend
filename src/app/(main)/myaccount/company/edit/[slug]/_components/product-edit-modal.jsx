"use client";
import {EditIcon} from "@/components/icons";
import Button from "@/components/shared/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
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
import {Input} from "@/components/ui/input";
import {Loader2} from "lucide-react";
import {formLabelClasses, inputClasses} from "@/utils/input-style";
import {ScrollArea} from "@/components/ui/scroll-area"
import DragDropFile from "@/components/shared/DragDropFile";
import DropDownTags from "@/components/ui/dropDownTags";
import {updateProductReq, uploadProductReq} from "@/services/product";

const labelStyle = formLabelClasses;
const inputStyle = inputClasses + " " + "h-9 bg-gray-50";

const formSchema = z.object({
    product_category_id: z
        .array(z.number())
        .optional(),
    image: z.any().optional(),
    tag: z.string().optional(),
    name: z.string().optional(),
    price_range: z.string().optional(),
});

const ProductEditModal = ({
                              children = (
                                  <Button secondary type="button">
                                      <EditIcon stroke="#667085"/>
                                  </Button>
                              ), preData, slug, data, onSuccess
                          }) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleDialogClose = () => {
        setIsOpen(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[600px] z-[9999]">
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


const ProductUpdateForm = ({ preData, slug, data, onUpdateSuccess }) => {
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    console.log(data, 'form data get');

    const id = data?.id;

    const tagOptions = preData?.categories.map((item) => ({
        label: item.name,
        value: item.id,
    })) || [];

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            product_category_id: data?.product_category_id ? [Number(data.product_category_id)] : [],
            image: data?.image_url || "",
            tag: "",
            name: data?.name || "",
            price_range: data?.price_range || "",
        },
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = form;

    const onSubmit = async (data) => {
        console.log(data, 'get form data');
        setLoading(true);
        const { name, product_category_id, image, price_range } = data;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("product_category_id", product_category_id);
        formData.append("price_range", price_range);
        if (image && Array.isArray(image) && image.length > 0) {
            formData.append('image', image[0]);
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
                    control={control}
                    name="product_category_id"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Category</FormLabel>
                            <DropDownTags
                                value={field.value}
                                onChange={field.onChange}
                                options={tagOptions}
                            />
                            <FormMessage>{errors.categories?.message}</FormMessage>
                        </FormItem>
                    )}
                />

                <div className="flex flex-col">
                    <FormLabel className={`${labelStyle} mb-3`}>Product Image</FormLabel>
                    <DragDropFile
                        name="image"
                        control={control}
                        initialFile={data?.image_url}
                        defaultValue={data?.image_url}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="tag"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className={labelStyle}>Tag</FormLabel>
                            <FormControl>
                                <Input
                                    className={inputStyle}
                                    placeholder="Cap"
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className={labelStyle}>Product name</FormLabel>
                            <FormControl>
                                <Input
                                    className={inputStyle}
                                    placeholder="Your Product Name"
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
                    name="price_range"
                    render={({ field }) => (
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
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end">
                    <Button type="submit" disabled={loading} className="h-9 min-w-40 self-end">
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


export default ProductEditModal;

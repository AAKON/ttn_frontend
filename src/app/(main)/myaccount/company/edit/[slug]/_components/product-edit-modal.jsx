"use client";
import {EditIcon} from "@/components/icons";
import Button from "@/components/shared/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
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
import {companyBasicReq} from "@/services/company";
import TagsInput from "@/components/ui/tagsInput";
import PhotoUploadBox from "./photo-upload-box";
import {ScrollArea} from "@/components/ui/scroll-area"
import {uploadProductReq} from "@/services/product";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import DragDropUploadImage from "@/components/ui/drag-drop-upload";
import DragDropFile from "@/components/shared/DragDropFile";

const labelStyle = formLabelClasses;
const inputStyle = inputClasses + " " + "h-9 bg-gray-50";

const formSchema = z.object({
    categories: z
        .array(z.string())
        .min(1, {message: "Please add at least one category."}),
    product_card_image: z.string().optional(),
    tag: z.string().optional(),
    product_name: z.string().optional(),
    product_price: z.string().optional(),
});

const ProductEditModal = ({
                              children = (
                                  <Button secondary type="button">
                                      <EditIcon stroke="#667085"/>
                                  </Button>
                              ), slug, preData
                          }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[600px] z-[9999]">
                <DialogHeader>
                    <DialogTitle>Edit product</DialogTitle>
                </DialogHeader>
                <ScrollArea className="py-4 h-[80svh]">
                    <ProductUpdateForm slug={slug} preData={preData}/>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};

const ProductUpdateForm = ({slug, preData}) => {
    const [loading, setLoading] = useState(false);
    const {toast} = useToast();
    const [fileData, setFileData] = useState(null); // File object

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            product_category_id: "",
            tag: "",
            image: "",
            name: "",
            price_range: "",
        },
    });

    const handleImageChange = ({file}) => {
        setFileData((prev) => ({...prev, imageFile: file}));
    };

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = form;

    // Function to handle form submission
    const onSubmit = async (data) => {
        const {name, product_category_id, price_range} = data;
        console.log(data, "get fff data");

        const formData = new FormData();
        formData.append("name", name);
        formData.append("product_category_id", product_category_id);
        formData.append("price_range", price_range);
        if (fileData) {
            formData.append("image", fileData.imageFile);
        }

        try {
            const result = await uploadProductReq(slug, formData, toast);
            if (result.status && result.code === 200) {
                //form reset
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
                <div className="flex flex-col">
                    <FormLabel className={`${labelStyle} mb-3`}>Product Image</FormLabel>
                    <DragDropFile
                        name="file"
                        control={control}
                        initialFile={'https://ttn.technostupid.com/storage/13/conversions/Castorino-Nutria-And-Montone-Sheepskin-thumbnail.jpg'}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="tag"
                    render={({field}) => (
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
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
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

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-3">
                    <Button secondary type="submit" disabled={loading} className="h-9">
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

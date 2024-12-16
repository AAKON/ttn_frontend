"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import {useEffect, useState} from "react";

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
import { formLabelClasses, inputClasses } from "@/utils/input-style";
import { LinkIcon } from "@/components/icons/linkIcon";
import {
  DeleteIcon,
  EditIcon,
  EmailIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/icons";
import {companyDecissionMakerReq, getDecissionMakers} from "@/services/company";
import {Loader2} from "lucide-react";
import {getCompanyProducts} from "@/services/product";

const labelStyle = formLabelClasses;
const inputStyle = inputClasses + " " + "h-9 bg-gray-50";

const formSchema = z.object({
    name: z.string().min(3, { message: "Name must be 3 characters" }),
    designation: z.string().min(3, { message: "Designation must be 3 characters" }),
    email: z.string().email({ message: "Must be a valid email" }),
    phone: z.string().min(5, { message: "Must be valid phone number" }),
    whatsapp: z.string().optional(),
});

const DecisionMakersForm = ({slug}) => {
  const [cards, setCards] = useState([]); // State to store cards for preview
  const [editIndex, setEditIndex] = useState(null); // Index of the card being edited
    const [loading, setLoading] = useState(false);
    const [dmData, setDmData] = useState(null);
    const [error, setError] = useState(null);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "", designation: "", email: "", phone: "", whatsapp: ""
    },
  });
  const { control, handleSubmit, setValue, reset } = form;


    const fetchDecissionMakers = async () => {
        try {
            setLoading(true);
            const response = await getDecissionMakers(slug);
            const data = response?.decisionMakers;
            setDmData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDecissionMakers();
    }, [slug]);


  const onSubmit = async(data) => {
      setLoading(true);
      const { name, designation, email, phone, whatsapp  } = data;

      const formData = new FormData();
      formData.append("name", name);
      formData.append("designation", designation);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("whatsapp", whatsapp);

      try {
          const result = await companyDecissionMakerReq(slug, formData, toast);
          if (result.status && result.code === 200) {
              reset();
              fetchDecissionMakers();
          }
      } catch (error) {
          console.log("Error in create :: decission maker", error.message);
      } finally {
          setLoading(false);
      }

  };

  const deleteCard = (index) => {
    setCards((prev) => prev.filter((_, i) => i !== index));
    toast({
      title: "Contact Deleted!",
      description: "The contact has been successfully removed.",
    });
  };

  const editCard = (index) => {
    setEditIndex(index);
    const cardToEdit = cards[index];
    reset({ contacts: [cardToEdit] }); // Populate form with card data
  };

    console.log(dmData, 'get decission data')

  return (
    <div className="space-y-6">
      {/* Form Section */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-4">
              <p className="text-gray-500 text-sm pb-2">Contact</p>
              <div className="grid grid-cols-1 gap-3 lg:gap-3">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelStyle}>Name</FormLabel>
                      <FormControl>
                        <Input
                          className={inputStyle}
                          placeholder="Enter Name"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="designation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelStyle}>Designation</FormLabel>
                      <FormControl>
                        <Input
                          className={inputStyle}
                          placeholder="Enter Designation"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelStyle}>Email</FormLabel>
                      <FormControl>
                        <Input
                          className={inputStyle}
                          placeholder="Enter Email"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelStyle}>Phone</FormLabel>
                      <FormControl>
                        <Input
                          className={inputStyle}
                          placeholder="Enter Phone"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="whatsapp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelStyle}>
                        Whatsapp link
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className={inputStyle + " pr-10"}
                            placeholder="Enter whatsapp number"
                            type="text"
                            {...field}
                          />
                          <LinkIcon className="absolute right-2 top-1/2 -translate-y-1/2" />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          <div className="flex justify-end">
            <Button type="submit" secondary disabled={loading} className="h-9 w-[200px]">
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

      {/* Preview Cards */}
        {dmData && Array.isArray(dmData) && dmData.length > 0 && (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 lg:gap-y-6 gap-x-8">
        {dmData.map((card) => (
          <div className="" key={card?.id}>
            <p className="text-gray-500 text-sm leading-[20px]">
              Contact {card?.id}
            </p>
              {card?.name && (
                  <h5 className="text-gray-900 text-lg leading-[24px] font-semibold capitalize">
                      {card?.name}
                  </h5>
              )}
              {card?.designation && (
                  <p className="text-gray-500 text-sm leading-[20px]">
                      {card?.designation}
                  </p>
              )}
              <ul className="grid gap-2 grid-cols-1 mt-2">
                  {card?.email && (
                      <li className="text-gray-900 text-sm leading-[20px] flex items-center gap-2">
                <EmailIcon width={20} height={20} stroke="#F7931E" />
                <span>{card?.email}</span>
              </li>)}
                {card?.phone && (
              <li className="text-gray-900 text-sm leading-[20px] flex items-center gap-2">
                <PhoneIcon width={20} height={20} stroke="#F7931E" />
                <span>{card?.phone}</span>
              </li>)}
                {card?.whatsapp_link && (
              <li className="text-gray-900 text-sm leading-[20px] flex items-center gap-2">
                <WhatsAppIcon width={20} height={20} stroke="#F7931E" />
                <span>{card?.whatsapp_link}</span>
              </li>)}
            </ul>
            <div className="flex gap-3 h-10 mt-2">
              <Button
                className="flex-1 text-red-[#F04438]"
                secondary
                onClick={() => deleteCard(card?.id)}
              >
                Delete <DeleteIcon stroke="#F04438" />
              </Button>
              <Button
                className="w-10 !p-1"
                secondary
                onClick={() => editCard(card?.id)}
              >
                <EditIcon stroke="#667085" />
              </Button>
            </div>
          </div>
        ))}
      </div>)}
    </div>
  );
};

export default DecisionMakersForm;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

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

const labelStyle = formLabelClasses;
const inputStyle = inputClasses + " " + "h-9 bg-gray-50";

const formSchema = z.object({
  contacts: z.array(
    z.object({
      name: z.string().optional(),
      designation: z.string().optional(),
      email: z.string().optional(),
      phone: z.string().optional(),
      whatsapp_link: z.string().optional(),
    })
  ),
});

const DecisionMakersForm = () => {
  const [contacts, setContacts] = useState([{ id: Date.now() }]); // Initial contact
  const [cards, setCards] = useState([]); // State to store cards for preview
  const [editIndex, setEditIndex] = useState(null); // Index of the card being edited
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contacts: [
        { name: "", designation: "", email: "", phone: "", whatsapp_link: "" },
      ],
    },
  });

  const { control, handleSubmit, setValue, reset } = form;

  const onSubmit = (data) => {
    if (editIndex !== null) {
      // If editing, update the specific card
      const updatedCards = [...cards];
      updatedCards[editIndex] = data.contacts[0];
      setCards(updatedCards);
      toast({
        title: "Contact Updated!",
        description: "The contact has been successfully updated.",
      });
      setEditIndex(null);
    } else {
      // Add a new card
      setCards((prev) => [...prev, ...data.contacts]);
      toast({
        title: "Contacts Saved!",
        description: "The entered contacts have been successfully added.",
      });
    }

    reset(); // Clear the form
  };

  const addNewContact = () => {
    setContacts((prev) => [...prev, { id: Date.now() }]);
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

  return (
    <div className="space-y-6">
      {/* Form Section */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {contacts.map((contact, index) => (
            <div key={contact.id} className="space-y-4">
              <p className="text-gray-500 text-sm pb-2">Contact {index + 1}</p>
              <div className="grid grid-cols-1 gap-3 lg:gap-3">
                <FormField
                  control={control}
                  name={`contacts.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelStyle}>Name</FormLabel>
                      <FormControl>
                        <Input
                          className={inputStyle}
                          placeholder="Name"
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
                  name={`contacts.${index}.designation`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelStyle}>Designation</FormLabel>
                      <FormControl>
                        <Input
                          className={inputStyle}
                          placeholder="Designation"
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
                  name={`contacts.${index}.email`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelStyle}>Email</FormLabel>
                      <FormControl>
                        <Input
                          className={inputStyle}
                          placeholder="Email"
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
                  name={`contacts.${index}.phone`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelStyle}>Phone</FormLabel>
                      <FormControl>
                        <Input
                          className={inputStyle}
                          placeholder="Phone"
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
                  name={`contacts.${index}.whatsapp_link`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={labelStyle}>
                        Whatsapp link
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            className={inputStyle + " pr-10"}
                            placeholder="Whatsapp link"
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
          ))}
          <div className="flex justify-end">
            <Button type="submit" secondary className="h-9 w-[200px]">
              {editIndex !== null ? "Update" : "Save"}
            </Button>
          </div>
        </form>
      </Form>

      {/* Preview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-4 lg:gap-y-6 gap-x-8">
        {cards.map((card, index) => (
          <div className="" key={index}>
            <p className="text-gray-500 text-sm leading-[20px]">
              Contact {index}
            </p>
            <h5 className="text-gray-900 text-lg leading-[24px] font-semibold capitalize">
              {card.name || "Unnamed Contact"}
            </h5>
            <p className="text-gray-500 text-sm leading-[20px]">
              {card.designation}
            </p>
            <ul className="grid gap-2 grid-cols-1 mt-2">
              <li className="text-gray-900 text-sm leading-[20px] flex items-center gap-2">
                <EmailIcon width={20} height={20} stroke="#F7931E" />
                <span>{card.email || "No Email"}</span>
              </li>
              <li className="text-gray-900 text-sm leading-[20px] flex items-center gap-2">
                <PhoneIcon width={20} height={20} stroke="#F7931E" />
                <span>{card.phone || "No Phone"}</span>
              </li>
              <li className="text-gray-900 text-sm leading-[20px] flex items-center gap-2">
                <WhatsAppIcon width={20} height={20} stroke="#F7931E" />
                <span>{card.whatsapp_link || "No Link"}</span>
              </li>
            </ul>
            <div className="flex gap-3 h-10 mt-2">
              <Button
                className="flex-1 text-red-[#F04438]"
                secondary
                onClick={() => deleteCard(index)}
              >
                Delete <DeleteIcon stroke="#F04438" />
              </Button>
              <Button
                className="w-10 !p-1"
                secondary
                onClick={() => editCard(index)}
              >
                <EditIcon stroke="#667085" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DecisionMakersForm;

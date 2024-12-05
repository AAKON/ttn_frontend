"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { DropdownSelect } from "./dropdown-select";
import { DeleteIcon } from "@/components/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Styling classes
const labelStyle = "text-sm font-medium text-gray-700";
const inputStyle = "h-9 bg-gray-50";

// Zod schema for form validation
const formSchema = z.object({
  turnoverData: z.array(
    z.object({
      year: z.string().min(1, { message: "Year is required" }),
      turnover: z.string().min(1, { message: "Turnover is required" }),
    })
  ),
});

const YearlyTurnover = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      turnoverData: [{ year: "", turnover: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "turnoverData",
  });

  // Watch for changes in turnoverData
  const watchedData = form.watch("turnoverData");

  // Handle form submission (for debugging purpose)
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid gap-3">
          {fields.map((field, index) => (
            <div key={field.id} className="grid grid-cols-[1fr_1fr_36px] gap-3">
              {/* Year Dropdown */}
              <FormField
                control={form.control}
                name={`turnoverData.${index}.year`}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className={labelStyle}>Year</FormLabel>
                    <FormControl>
                      <DropdownSelect
                        placeholder="Select year"
                        data={[
                          "2013", "2014", "2015", "2016", "2017",
                          "2018", "2019", "2020", "2021", "2022",
                          "2023", "2024",
                        ]}
                        {...field}
                        className={inputStyle}
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Turnover Input */}
              <FormField
                control={form.control}
                name={`turnoverData.${index}.turnover`}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className={labelStyle}>
                      Turnover (Million USD)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        placeholder="Enter turnover"
                        className={inputStyle}
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />

              {/* Delete Button */}
              <Button
                type="button"
                secondary
                className="size-9 gap-0 !p-1 mt-8"
                onClick={() => remove(index)}
              >
                <DeleteIcon stroke="#F04438" />
              </Button>
            </div>
          ))}

          {/* Add New Row Button */}
          <Button
            type="button"
            secondary
            className="h-9 w-full"
            onClick={() => append({ year: "", turnover: "" })}
          >
            Add new row
          </Button>
        </div>
      </form>

      {/* Chart */}
      <ResponsiveContainer height={240}>
        <BarChart
          data={watchedData.map((row) => ({
            year: row.year,
            turnover: Number(row.turnover) || 0,
          }))}
          margin={{ top: 0, right: 0, left: -18, bottom: 0 }}
        >
          <CartesianGrid stroke="#F2F4F7" horizontal vertical={false} />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend verticalAlign="top" />
          <Bar
            dataKey="turnover"
            name="Turnover (Million USD)"
            stackId="a"
            fill="#F9A94B"
          />
        </BarChart>
      </ResponsiveContainer>
    </Form>
  );
};

export default YearlyTurnover;

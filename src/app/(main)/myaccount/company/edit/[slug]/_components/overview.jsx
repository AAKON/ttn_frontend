"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {z} from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import {Input} from "@/components/ui/input";
import {formLabelClasses, inputClasses} from "@/utils/input-style";

import {companyOverviewReq} from "@/services/company";
import Button from "@/components/ui/button";
import {DeleteIcon} from "@/components/icons";

const labelStyle = formLabelClasses;
const inputStyle = inputClasses + " " + "h-9 bg-gray-50";

import Image from "next/image";
import marketShare from "@/assets/marketShare.svg";

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
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React, {useState} from "react";
import {useToast} from "@/hooks/use-toast";
import {Loader2} from "lucide-react";

const formSchema = z.object({

    manpower: z.string().min(1, {
        message: "Manpower is required",
    }),
    production_capacity: z.string().min(1, {
        message: "Production capacity is required",
    }),
    total_units: z.string().min(1, {
        message: "Number of machines is required",
    }),
    moq: z.string().min(1, {
        message: "MOQ is required",
    }),
    lead_time: z.string().min(1, {
        message: "Lead time is required",
    }),
    shipment_term: z.string().min(1, {
        message: "Delivery terms is required",
    }),
    payment_policy: z.string().min(1, {
        message: "Payment policy is required",
    }),

    market_share: z.array(
        z.object({
            location_id: z.string().min(1, 'Required'),
            percentage: z.string().min(1, 'Required'),
        })
    ),
    yearly_turnover: z.array(
        z.object({
            year: z.string().min(1, 'Required'),
            turnover: z.string().min(1, 'Required'),
        })
    ),

});

const OverviewForm = ({slug}) => {
    const [loading, setLoading] = useState(false);
    const {toast} = useToast();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            manpower: "",
            production_capacity: "",
            total_units: "",
            moq: "",
            lead_time: "",
            shipment_term: "",
            payment_policy: "",
            countries: [{country: "", percentage: ""}],
            turnoverData: [{year: "", turnover: ""}],
            market_share: [{ location_id: '', percentage: '' }],
            yearly_turnover: [{ year: '', turnover: '' }],
        },
    });

    const { control, handleSubmit, formState } = form;
    const { errors } = formState;

    const {
        fields: turnoverFields,
        append: appendTurnover,
        remove: removeTurnover,
    } = useFieldArray({
        control: form.control,
        name: "yearly_turnover",
    });

    // Watch for changes in turnoverData
    const watchedData = form.watch("yearly_turnover");

    const groupOneFieldArray = useFieldArray({
        control,
        name: 'market_share',
    });

    const groupTwoFieldArray = useFieldArray({
        control,
        name: 'yearly_turnover',
    });



    // Function to handle form submission
    const onSubmit = async (data) => {
        const {moq, lead_time, shipment_term, payment_policy, total_units, production_capacity, market_share, yearly_turnover} = data;

        const formData = {
            shipment_term, payment_policy, total_units, production_capacity, market_share, yearly_turnover
        }

        setLoading(true);

        try {
          const result = await companyOverviewReq(slug, data, toast);
          if (result.status && result.code === 200) {
            //form reset
          }
        } catch (error) {
          console.log("Error in Overview Update:", error.message);
        } finally {
          setLoading(false);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 mt-12">
                    <h3 className="text-base font-semibold text-gray-900">Overview</h3>
                    <div className="grid grid-cols-1 gap-3 lg:gap-3">
                        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="manpower"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={labelStyle}>Manpower</FormLabel>
                                        <FormControl>
                                            <Input
                                                className={inputStyle}
                                                placeholder="Lorem ipsum"
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
                                name="production_capacity"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={labelStyle}>
                                            Production capacity
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className={inputStyle}
                                                placeholder="02 tons"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="total_units"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={labelStyle}>No of machines</FormLabel>
                                        <FormControl>
                                            <Input
                                                className={inputStyle}
                                                placeholder="Lorem ipsum"
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
                        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="lead_time"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={labelStyle}>Lead Time</FormLabel>
                                        <FormControl>
                                            <Input
                                                className={inputStyle}
                                                placeholder="90 Days"
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
                                name="shipment_term"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={labelStyle}>delivery terms</FormLabel>
                                        <FormControl>
                                            <Input
                                                className={inputStyle}
                                                placeholder="FOB /C&F/CIF"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="payment_policy"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel className={labelStyle}>Payment Policy</FormLabel>
                                        <FormControl>
                                            <Input
                                                className={inputStyle}
                                                placeholder="LC/TT/Bank Transfer"
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
                </div>

                {/* Business Insight */}
                <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8 mt-12">
                    <h3 className="text-base font-semibold text-gray-900">
                        Business Insight
                    </h3>
                    <div>
                        <p className="text-gray-500 text-sm pb-6">Market Share</p>
                        <div className="group_input">
                            {/*group repeater fields  */}
                            {groupOneFieldArray.fields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1fr_36px]"
                                >
                                    <Controller
                                        name={`market_share.${index}.location_id`}
                                        control={control}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className={labelStyle}>Select Country</FormLabel>
                                                <Select
                                                    onValueChange={(value) => field.onChange(value)}
                                                    value={field.value}
                                                >
                                                    <FormControl>
                                                        <SelectTrigger
                                                            className={`focus:ring-0 focus:ring-offset-0 focus:ring-offset-none text-gray-900 h-9 font-normal bg-gray-50`}
                                                        >
                                                            <SelectValue
                                                                placeholder="Select Country"
                                                                className="text-gray-400 font-normal text-sm"
                                                            />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="1">
                                                            Bangladesh
                                                        </SelectItem>
                                                        <SelectItem value="2">
                                                            Indonesia
                                                        </SelectItem>
                                                        <SelectItem value="3">
                                                            Srilanka
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage>
                                                    {errors.market_share?.[index]?.location_id?.message}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={`market_share.${index}.percentage`}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel className={labelStyle}>Percentage</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        className={inputStyle}
                                                        placeholder="CodeBlue Clothing Pvt Ltd"
                                                        type="text"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage>
                                                    {errors.market_share?.[index]?.percentage?.message}
                                                </FormMessage>
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        secondary
                                        type="button"
                                        onClick={() => groupOneFieldArray.remove(index)}
                                        className="size-9 gap-0 !p-1 mt-[32px]"
                                    >
                                        <DeleteIcon stroke="#F04438"/>
                                    </Button>

                                </div>
                            ))}

                            {/* Add New Country Button */}
                            <Button
                                secondary
                                icon
                                type="button"
                                className="h-9 w-full mt-3"
                                onClick={() =>
                                    groupOneFieldArray.append({
                                        location_id: '',
                                        percentage: '',
                                    })
                                }
                            >
                                Add new Country
                            </Button>
                        </div>


                        <div className="border rounded-[16px] mt-3">
                            <Image src={marketShare} alt="marketShare" className="w-full"/>
                        </div>

                        <div className="border-t border-t-gray-200 pt-6 mt-6">
                            <p className="text-gray-500 text-sm pb-6">Yearly Turnover</p>
                            <div className="group_input">
                                <div className="grid gap-3">
                                    {groupTwoFieldArray.fields.map((field, index) => (
                                        <div
                                            key={field.id}
                                            className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1fr_36px]"
                                        >
                                            <Controller
                                                name={`yearly_turnover.${index}.year`}
                                                control={control}
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel className={labelStyle}>Select Year</FormLabel>
                                                        <Select
                                                            onValueChange={(value) => field.onChange(value)}
                                                            value={field.value}
                                                        >
                                                            <FormControl>
                                                                <SelectTrigger
                                                                    className={`focus:ring-0 focus:ring-offset-0 focus:ring-offset-none text-gray-900 h-9 font-normal bg-gray-50`}
                                                                >
                                                                    <SelectValue
                                                                        placeholder="Select Year"
                                                                        className="text-gray-400 font-normal text-sm"
                                                                    />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="2016">
                                                                    2016
                                                                </SelectItem>
                                                                <SelectItem value="2017">
                                                                    2017
                                                                </SelectItem>
                                                                <SelectItem value="2018">
                                                                    2018
                                                                </SelectItem>
                                                                <SelectItem value="2019">
                                                                    2019
                                                                </SelectItem>
                                                                <SelectItem value="2020">
                                                                    2020
                                                                </SelectItem>
                                                                <SelectItem value="2021">
                                                                    2021
                                                                </SelectItem>
                                                                <SelectItem value="2022">
                                                                    2022
                                                                </SelectItem>
                                                                <SelectItem value="2023">
                                                                    2023
                                                                </SelectItem>
                                                                <SelectItem value="2024">
                                                                    2024
                                                                </SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage>
                                                            {errors.yearly_turnover?.[index]?.year?.message}
                                                        </FormMessage>
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name={`yearly_turnover.${index}.turnover`}
                                                render={({field}) => (
                                                    <FormItem>
                                                        <FormLabel className={labelStyle}>Turnover</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                className={inputStyle}
                                                                placeholder="CodeBlue Clothing Pvt Ltd"
                                                                type="text"
                                                                {...field}
                                                            />
                                                        </FormControl>
                                                        <FormMessage>
                                                            {errors.yearly_turnover?.[index]?.turnover?.message}
                                                        </FormMessage>
                                                    </FormItem>
                                                )}
                                            />

                                            <Button
                                                secondary
                                                type="button"
                                                onClick={() => groupTwoFieldArray.remove(index)}
                                                className="size-9 gap-0 !p-1 mt-[32px]"
                                            >
                                                <DeleteIcon stroke="#F04438"/>
                                            </Button>

                                        </div>
                                    ))}
                                    {/* Add New Country Button */}
                                    <Button
                                        secondary
                                        icon
                                        type="button"
                                        className="h-9 w-full"
                                        onClick={() =>
                                            groupTwoFieldArray.append({
                                                year: '',
                                                turnover: '',
                                            })
                                        }
                                    >
                                        Add new Turnover
                                    </Button>
                                </div>
                            </div>

                            <div className="border-t border-t-gray-200 pt-6 mt-6">
                                <p className="text-gray-500 text-sm pb-6">Yearly Turnover</p>
                                {/* Chart */}
                                <ResponsiveContainer height={240}>
                                    <BarChart
                                        data={watchedData.map((row) => ({
                                            year: row.year,
                                            turnover: Number(row.turnover) || 0,
                                        }))}
                                        margin={{top: 0, right: 0, left: -18, bottom: 0}}
                                    >
                                        <CartesianGrid
                                            stroke="#F2F4F7"
                                            horizontal
                                            vertical={false}
                                        />
                                        <XAxis dataKey="year"/>
                                        <YAxis/>
                                        <Tooltip/>
                                        <Legend verticalAlign="top"/>
                                        <Bar
                                            dataKey="turnover"
                                            name="Turnover (Million USD)"
                                            stackId="a"
                                            fill="#F9A94B"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="h-9 w-full"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                        Please wait
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </div>
                    </div>
                </div>

            </form>
        </Form>
    );
};

export default OverviewForm;

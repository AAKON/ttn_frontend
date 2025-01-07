
import {Input} from "@/components/ui/input";
import {formLabelClasses, inputClasses} from "@/utils/input-style";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectGroup,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

const labelStyle = formLabelClasses;
const inputStyle = inputClasses + " " + "h-9 bg-gray-50";


const BasicCompanyView = ({basic}) => {

    return (
        <>
            <div className="flex justify-start">

            </div>
            <div className="grid grid-cols-1 gap-3 lg:gap-3">
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                    <div className="flex flex-col space-y-2">
                        <label className="opacity-70 text-sm text-gray-900 font-normal">Company Name</label>
                        <Input value={basic.name} disabled={true}/>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="opacity-70 text-sm text-gray-900 font-normal">Company Motto</label>
                        <Input value={basic.moto} disabled={true}/>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
                    <div className="flex flex-col space-y-2">
                        <label className="opacity-70 text-sm text-gray-900 font-normal">Tags</label>
                        <Input value="empty" disabled={true}/>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <label className="opacity-70 text-sm text-gray-900 font-normal">Category</label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="1">Category</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                </div>

                <div className="grid grid-cols-1 gap-3 lg:grid-cols-[4fr_2fr_1fr]">


                </div>


            </div>

        </>
    );
};

export default BasicCompanyView;

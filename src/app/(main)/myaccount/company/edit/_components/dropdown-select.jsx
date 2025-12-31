import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { inputClasses } from "@/utils/input-style";
inputClasses;

export function DropdownSelect({ className = "", placeholder, data = [] }) {
	return (
		<Select className={className}>
			<SelectTrigger className="h-9 border border-gray-200 bg-gray-50 text-gray-500 font-normal text-sm focus:ring-0 focus:ring-offset-0 focus:ring-offset-none">
				<SelectValue
					placeholder={placeholder}
					className="text_16 text-red-400"
				/>
			</SelectTrigger>
			<SelectContent className="max-h-[200px] overflow-y-scroll">
				<SelectGroup>
					<SelectLabel className="flex gap-2 items-center">
						Select One
					</SelectLabel>
					{data?.map((item) => (
						<SelectItem key={item} value={item}>
							{item}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

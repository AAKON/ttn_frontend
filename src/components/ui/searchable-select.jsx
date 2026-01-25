"use client";

import * as React from "react";
import { Check, ChevronDown, ChevronsUpDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

export const SearchableSelect = React.forwardRef(
	(
		{
			options = [],
			value,
			onValueChange,
			placeholder = "Select item...",
			searchPlaceholder = "Search...",
			emptyMessage = "No item found.",
			className,
			triggerClassName,
			...props
		},
		ref,
	) => {
		const [open, setOpen] = React.useState(false);
		const [searchTerm, setSearchTerm] = React.useState("");

		const filteredOptions = options.filter((option) =>
			option.label?.toLowerCase().includes(searchTerm.toLowerCase()),
		);

		const selectedOption = options.find((option) => option.value === value);

		return (
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						ref={ref}
						type="button"
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className={cn(
							"w-full justify-between font-normal",
							!value && "text-muted-foreground",
							triggerClassName,
						)}
						{...props}
					>
						{selectedOption ? selectedOption.label : placeholder}
						<ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className={cn(
						"w-[var(--radix-popover-trigger-width)] p-0 z-[10005]",
						className,
					)}
					align="start"
				>
					<div className="flex items-center border-b px-3">
						<Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
						<Input
							placeholder={searchPlaceholder}
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="flex h-10 w-full !border-none !outline-none !ring-0 !ring-offset-0 !ring-offset-transparent"
						/>
					</div>
					<ScrollArea className="h-60">
						<div className="p-1">
							{filteredOptions.length === 0 ?
								<div className="py-6 text-center text-sm text-muted-foreground">
									{emptyMessage}
								</div>
								: filteredOptions.map((option) => (
									<div
										key={option.value}
										className={cn(
											"relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
											value === option.value &&
											"bg-accent text-accent-foreground",
										)}
										onClick={() => {
											onValueChange(option.value);
											setOpen(false);
											setSearchTerm("");
										}}
									>
										<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
											{value === option.value && <Check className="h-4 w-4" />}
										</span>
										{option.label}
									</div>
								))
							}
						</div>
					</ScrollArea>
				</PopoverContent>
			</Popover>
		);
	},
);
SearchableSelect.displayName = "SearchableSelect";

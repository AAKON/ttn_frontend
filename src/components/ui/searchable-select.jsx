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
			multiple = false,
			...props
		},
		ref,
	) => {
		const [open, setOpen] = React.useState(false);
		const [searchTerm, setSearchTerm] = React.useState("");

		const filteredOptions = options.filter((option) =>
			option.label?.toLowerCase().includes(searchTerm.toLowerCase()),
		);

		// For single select
		const selectedOption = options.find((option) => option.value === value);

		// For multi-select: check if a value is selected
		const isSelected = (optionValue) => {
			if (multiple) {
				return Array.isArray(value) && value.includes(optionValue);
			}
			return value === optionValue;
		};

		// Get display text for trigger button
		const getDisplayText = () => {
			if (multiple) {
				if (!Array.isArray(value) || value.length === 0) {
					return placeholder;
				}
				const selectedLabels = options
					.filter((opt) => value.includes(opt.value))
					.map((opt) => opt.label);
				if (selectedLabels.length === 1) {
					return selectedLabels[0];
				}
				return `${selectedLabels.length} selected`;
			}
			return selectedOption ? selectedOption.label : placeholder;
		};

		// Handle option click
		const handleOptionClick = (optionValue) => {
			if (multiple) {
				const currentValues = Array.isArray(value) ? value : [];
				if (currentValues.includes(optionValue)) {
					// Remove if already selected
					onValueChange(currentValues.filter((v) => v !== optionValue));
				} else {
					// Add if not selected
					onValueChange([...currentValues, optionValue]);
				}
				// Don't close popover for multi-select
			} else {
				onValueChange(optionValue);
				setOpen(false);
				setSearchTerm("");
			}
		};

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
							"w-full h-11 justify-between font-normal",
							!value && "text-muted-foreground",
							multiple && Array.isArray(value) && value.length === 0 && "text-muted-foreground",
							triggerClassName,
						)}
						{...props}
					>
						{getDisplayText()}
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
							className="flex h-11 w-full !border-none !outline-none !ring-0 !ring-offset-0 !ring-offset-transparent"
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
											isSelected(option.value) &&
											"bg-accent text-accent-foreground",
										)}
										onClick={() => handleOptionClick(option.value)}
									>
										<span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
											{isSelected(option.value) && <Check className="h-4 w-4" />}
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

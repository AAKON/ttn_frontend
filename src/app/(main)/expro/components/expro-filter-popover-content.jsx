"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";
import * as React from "react";

export const initialData = {
    country: [
        { id: "bangladesh", label: "Bangladesh", count: 12 },
        { id: "india", label: "India", count: 8 },
        { id: "china", label: "China", count: 15 },
        { id: "pakistan", label: "Pakistan", count: 4 },
    ],
    year: [
        { id: "2024", label: "2024", count: 20 },
        { id: "2023", label: "2023", count: 18 },
        { id: "2022", label: "2022", count: 10 },
        { id: "2021", label: "2021", count: 5 },
    ],
    organizer: [
        { id: "intex", label: "Intex", count: 5 },
        { id: "texpo", label: "Texpo", count: 5 },
        { id: "cems", label: "CEMS Global", count: 0 },
        { id: "indotex", label: "IndoTex", count: 0 },
        { id: "btma", label: "Bangladesh Textile Mill Association (BTMA)", count: 5 },
        { id: "canton", label: "Canton Fair", count: 5 },
        { id: "world-expo", label: "World Expo", count: 0 },
        { id: "shanghai-expo", label: "Shanghai Expo", count: 0 },
    ],
};

export function ExproFilterPopoverContent({
    onClose,
    selectedFilters = { country: [], year: [], organizer: [] },
    onApply
}) {
    const [searchQueries, setSearchQueries] = React.useState({
        country: "",
        year: "",
        organizer: "",
    });

    const [tempFilters, setTempFilters] = React.useState(selectedFilters);

    // Sync temp state with props whenever the popover opens or props change
    React.useEffect(() => {
        setTempFilters(selectedFilters);
    }, [JSON.stringify(selectedFilters)]);

    const handleSearchChange = (section, value) => {
        setSearchQueries((prev) => ({ ...prev, [section]: value }));
    };

    const handleToggle = (section, id) => {
        setTempFilters((prev) => {
            const currentSection = prev[section] || [];
            const isSelected = currentSection.includes(id);
            return {
                ...prev,
                [section]: isSelected
                    ? currentSection.filter((item) => item !== id)
                    : [...currentSection, id],
            };
        });
    };

    const handleReset = () => {
        setTempFilters({
            country: [],
            year: [],
            organizer: [],
        });
    };

    const renderFilterList = (section, data) => {
        const query = searchQueries[section].toLowerCase();
        const filteredData = data.filter((item) =>
            item.label.toLowerCase().includes(query)
        );

        return (
            <div className="space-y-4 pt-1">
                {/* Search Input */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                    <Input
                        placeholder={`Search ${section}`}
                        className="pl-10 border-[#D0D5DD] bg-transparent focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-gray-400"
                        value={searchQueries[section]}
                        onChange={(e) => handleSearchChange(section, e.target.value)}
                    />
                </div>

                {/* List */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {filteredData.map((item) => (
                        <div key={item.id} className="flex items-center justify-between group">
                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id={`${section}-${item.id}`}
                                    className="w-2 h-2 border-[#D0D5DD] data-[state=checked]:border-[#ED8A19] data-[state=checked]:text-[#ED8A19] !bg-transparent"
                                    checked={tempFilters[section]?.includes(item.id)}
                                    onCheckedChange={() => handleToggle(section, item.id)}
                                />
                                <label
                                    htmlFor={`${section}-${item.id}`}
                                    className="text-sm font-medium leading-none text-[#344054] cursor-pointer group-hover:text-[#101828]"
                                >
                                    {item.label}
                                </label>
                            </div>
                            {item.count > 0 && (
                                <span className="text-xs font-medium text-gray-500 bg-transparent px-2 py-0.5 rounded">
                                    {item.count}
                                </span>
                            )}
                        </div>
                    ))}
                    {filteredData.length === 0 && (
                        <p className="text-sm text-center text-gray-500 py-4">No results found</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col h-full max-h-[85vh] w-full bg-white rounded-lg">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b">
                <h3 className="text-lg font-bold text-[#101828]">Filter</h3>
                <button
                    onClick={onClose}
                    className="p-1 rounded-full transition-colors"
                >
                    <X className="h-5 w-5 text-gray-500" />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-2">
                <Accordion
                    type="single"
                    collapsible
                    defaultValue="organizer"
                    className="w-full space-y-3"
                >
                    {/* By Country */}
                    <AccordionItem value="country" className="border rounded-[8px] py-2 px-3">
                        <AccordionTrigger className="bg-transparent text-[#344054] font-semibold py-2 px-1 no-underline hover:no-underline">
                            By Country
                        </AccordionTrigger>
                        <AccordionContent>
                            {renderFilterList("country", initialData.country)}
                        </AccordionContent>
                    </AccordionItem>

                    {/* By Year */}
                    <AccordionItem value="year" className="border rounded-[8px] py-2 px-3">
                        <AccordionTrigger className="bg-transparent text-[#344054] font-semibold py-2 px-1 no-underline hover:no-underline">
                            By Year
                        </AccordionTrigger>
                        <AccordionContent>
                            {renderFilterList("year", initialData.year)}
                        </AccordionContent>
                    </AccordionItem>

                    {/* By Organizer */}
                    <AccordionItem value="organizer" className="border rounded-[8px] py-2 px-3">
                        <AccordionTrigger className="bg-transparent text-[#344054] font-semibold py-2 px-1 no-underline hover:no-underline">
                            By Organizer
                        </AccordionTrigger>
                        <AccordionContent>
                            {renderFilterList("organizer", initialData.organizer)}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            {/* Footer */}
            <div className="grid grid-cols-2 gap-3 px-4 py-4 border-t mt-auto">
                <Button
                    variant="outline"
                    className="w-full border-[#D0D5DD] text-[#344054] font-semibold h-11 hover:bg-gray-50 bg-white"
                    onClick={handleReset}
                >
                    Reset
                </Button>
                <Button
                    variant="outline"
                    className="w-full border-[#ED8A19] text-[#ED8A19] font-semibold h-11 hover:bg-orange-50 bg-white"
                    onClick={() => {
                        onApply(tempFilters);
                        onClose();
                    }}
                >
                    Filter
                </Button>
            </div>
        </div>
    );
}

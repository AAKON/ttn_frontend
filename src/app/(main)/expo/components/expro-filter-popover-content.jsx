"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import * as React from "react";

const CURRENT_YEAR = new Date().getFullYear();
const FUTURE_YEAR_COUNT = 4;

const yearOptions = Array.from({ length: FUTURE_YEAR_COUNT }, (_, index) => {
    const year = String(CURRENT_YEAR + index);
    return {
        id: year,
        label: year,
        count: 0,
    };
});

export const initialData = {
    country: [
        { id: "bangladesh", label: "Bangladesh", },
        { id: "india", label: "India", },
        { id: "china", label: "China", },
        { id: "pakistan", label: "Pakistan", },
    ],
    year: yearOptions,
    organizer: [],
};

const normalizeOrganizerOptions = (items = []) =>
    items
        .map((item) => {
            const id = item?.id ?? item?.company_id ?? item?.company?.id;
            const label =
                item?.name ??
                item?.label ??
                item?.company_name ??
                item?.title ??
                item?.company?.name;
            const rawCount =
                item?.count ?? item?.expo_count ?? item?.expos_count ?? item?.total;
            const rawExpoCount =
                item?.expo_count ?? item?.expos_count ?? item?.count ?? item?.total;

            if (id === undefined || id === null || !label) return null;

            const parsedCount = Number(rawCount);
            const parsedExpoCount = Number(rawExpoCount);
            const count = Number.isFinite(parsedCount) ? parsedCount : 0;
            const expoCount = Number.isFinite(parsedExpoCount) ? parsedExpoCount : 0;

            return {
                id: String(id),
                label: String(label),
                count,
                expo_count: expoCount,
            };
        })
        .filter(Boolean);

export function ExproFilterPopoverContent({
    open = false,
    onClose,
    selectedFilters = { country: [], year: [], organizer: [] },
    organizerOptions = [],
    onOrganizerOptionsLoaded,
    onApply
}) {
    const [searchQueries, setSearchQueries] = React.useState({
        country: "",
        year: "",
        organizer: "",
    });

    const [tempFilters, setTempFilters] = React.useState(selectedFilters);
    const [organizerData, setOrganizerData] = React.useState(organizerOptions);
    const [isOrganizerLoading, setIsOrganizerLoading] = React.useState(false);
    const [organizerLoadError, setOrganizerLoadError] = React.useState("");

    // Sync temp state with props whenever the popover opens or props change
    React.useEffect(() => {
        setTempFilters(selectedFilters);
    }, [JSON.stringify(selectedFilters)]);

    React.useEffect(() => {
        if (!open) return;

        let isCancelled = false;
        const controller = new AbortController();
        const timeoutId = setTimeout(async () => {
            setIsOrganizerLoading(true);
            setOrganizerLoadError("");

            try {
                const queryParams = new URLSearchParams({
                    per_page: 50,
                    page: "1",
                });
                const organizerQuery = searchQueries.organizer.trim();
                if (organizerQuery) {
                    queryParams.set("name", organizerQuery);
                }

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/expo/companies?${queryParams.toString()}`,
                    { method: "GET", cache: "no-store", signal: controller.signal }
                );

                if (!response.ok) {
                    throw new Error(`Failed with status ${response.status}`);
                }

                const data = await response.json();
                const payload = data?.data ?? data;
                const listData = Array.isArray(payload?.data)
                    ? payload.data
                    : Array.isArray(payload)
                        ? payload
                        : Array.isArray(payload?.items)
                            ? payload.items
                            : [];
                const normalizedOptions = normalizeOrganizerOptions(listData);

                if (isCancelled) return;

                setOrganizerData(normalizedOptions);
                if (typeof onOrganizerOptionsLoaded === "function") {
                    onOrganizerOptionsLoaded(normalizedOptions);
                }
            } catch (error) {
                if (isCancelled) return;
                if (error?.name === "AbortError") return;
                console.error("Error fetching organizer options:", error);
                setOrganizerLoadError("Failed to load organizers.");
            } finally {
                if (!isCancelled) {
                    setIsOrganizerLoading(false);
                }
            }
        }, 300);

        return () => {
            isCancelled = true;
            clearTimeout(timeoutId);
            controller.abort();
        };
    }, [open, searchQueries.organizer, onOrganizerOptionsLoaded]);

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
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:min-h-[20px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#D0D5DD]">
                    {filteredData.map((item) => {
                        const organizerCount = Number(item.expo_count);
                        const defaultCount = Number(item.count);
                        const rightSideCount = section === "organizer"
                            ? (Number.isFinite(organizerCount) ? organizerCount : 0)
                            : (Number.isFinite(defaultCount) ? defaultCount : 0);
                        const shouldShowCount = rightSideCount > 0;

                        return (
                            <div key={item.id} className="flex items-center justify-between group">
                                <div className="flex items-center space-x-3">
                                    <Checkbox
                                        id={`${section}-${item.id}`}
                                        className="h-4 !w-3 rounded-[4px] border-[#D0D5DD] bg-transparent data-[state=checked]:border-[#ED8A19] data-[state=checked]:!bg-transparent data-[state=checked]:text-[#ED8A19] focus-visible:ring-[#FEC88B]"
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
                                {shouldShowCount && (
                                    <span className="text-xs font-medium text-gray-500 bg-transparent px-2 py-0.5 rounded">
                                        {rightSideCount}
                                    </span>
                                )}
                            </div>
                        );
                    })}
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
                    className="group rounded-full bg-transparent p-1 transition-colors hover:bg-gray-100"
                >
                    <X className="h-5 w-5 text-gray-500 transition-colors group-hover:text-gray-700" />
                </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-2">
                <Accordion
                    type="single"
                    collapsible
                    className="w-full space-y-3 "
                >
                    {/* By Country */}
                    <AccordionItem value="country" className="border rounded-[8px] py-2 px-3 bg-gray-100">
                        <AccordionTrigger className="bg-transparent text-[#344054] font-semibold py-2 px-1 no-underline hover:no-underline">
                            By Country
                        </AccordionTrigger>
                        <AccordionContent>
                            {renderFilterList("country", initialData.country)}
                        </AccordionContent>
                    </AccordionItem>

                    {/* By Year */}
                    <AccordionItem value="year" className="border rounded-[8px] py-2 px-3 bg-gray-100">
                        <AccordionTrigger className="bg-transparent text-[#344054] font-semibold py-2 px-1 no-underline hover:no-underline">
                            By Year
                        </AccordionTrigger>
                        <AccordionContent>
                            {renderFilterList("year", initialData.year)}
                        </AccordionContent>
                    </AccordionItem>

                    {/* By Organizer */}
                    <AccordionItem value="organizer" className="border rounded-[8px] py-2 px-3 bg-gray-100">
                        <AccordionTrigger className="bg-transparent text-[#344054] font-semibold py-2 px-1 no-underline hover:no-underline">
                            By Organizer
                        </AccordionTrigger>
                        <AccordionContent>
                            {isOrganizerLoading ? (
                                <p className="py-4 text-center text-sm text-gray-500">
                                    Loading organizers...
                                </p>
                            ) : organizerLoadError ? (
                                <p className="py-4 text-center text-sm text-red-500">
                                    {organizerLoadError}
                                </p>
                            ) : (
                                renderFilterList("organizer", organizerData)
                            )}
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

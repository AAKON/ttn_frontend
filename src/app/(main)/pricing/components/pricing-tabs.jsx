'use client'
import React, {useState, useEffect} from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import AccordionCard from "@/app/(main)/pricing/accordion-card";
import {Container} from "@/shared";
import {getPricingList} from "@/services/pricing";

function PricingTabs(props) {
    const arr = ["B2B Partnership", "Marketing Partnership"];
    const [active, setactive] = useState(arr[0]);

    // Mapping tab names to API types
    const tabTypeMap = {
        "B2B Partnership": "b2b",
        "Marketing Partnership": "marketing",
    };


// Fetch data when the active tab changes
    useEffect(() => {
        const fetchData = async () => {
            const tabType = tabTypeMap[active];
            try {
                const result = await getPricingList(tabType);
                console.log('Data fetched:', result);
                // Handle API response (e.g., update state)
            } catch (error) {
                console.error('Error fetching pricing list:', error);
            }
        };

        fetchData(); // Call the inner function
    }, [active]); // Runs when 'active' changes

    return (
        <Container>
            {/* Tabs part start */}
            <Tabs
                defaultValue="B2B Partnership"
                className="max-w-full mx-auto pt-10 "
            >
                <TabsList className="ml-[440px] py-10 px-4 gap-x-4 rounded-lg">
                    {arr.map((el, idx) => {
                        return (
                            <TabsTrigger
                                key={idx}
                                value={el}
                                onClick={() => setactive(el)}
                                className={`!text-[20px] !px-10 !py-4 ml-2 
            ${
                                    active == el
                                        ? "font-semibold  text-gray-900 bg-white"
                                        : "font-medium  text-gray-600 !bg-transparent"
                                }`}
                            >
                                {el}
                            </TabsTrigger>
                        );
                    })}
                </TabsList>

                <TabsContent value="B2B Partnership">
                    <div>
                        {/* b2b Accordion part Start */}
                        <AccordionCard
                            item={"item-1"}
                            title={"MEDIA & EVENT PARTNERSHIP"}
                            text={"Free"}
                            price={"/Price"}
                        />

                        <AccordionCard
                            item={"item-2"}
                            title={"MEDIA & EVENT PARTNERSHIP"}
                            text={"Win-Win"}
                            price={"/Price"}
                        />

                        <AccordionCard
                            item={"item-3"}
                            title={"MEDIA & EVENT PARTNERSHIP"}
                            text={"Contact for Price"}
                        />

                        <AccordionCard
                            item={"item-4"}
                            title={"MEDIA & EVENT PARTNERSHIP"}
                            text={"1499$"}
                            price={"/Price"}
                        />

                        {/* b2b Accordion part end */}
                    </div>
                </TabsContent>

                <TabsContent value="Marketing Partnership">
                    <div>
                        {/* marketing Accordion part Start */}
                        <AccordionCard
                            item={"item-1"}
                            title={"MEDIA & EVENT PARTNERSHIP"}
                            text={"Paid"}
                            price={"/Price"}
                        />

                        <AccordionCard
                            item={"item-2"}
                            title={"MEDIA & EVENT PARTNERSHIP"}
                            text={"Win"}
                            price={"/Price"}
                        />

                        <AccordionCard
                            item={"item-3"}
                            title={"MEDIA & EVENT PARTNERSHIP"}
                            text={"Contact for Price"}
                        />

                        <AccordionCard
                            item={"item-4"}
                            title={"MEDIA & EVENT PARTNERSHIP"}
                            text={"1799$"}
                            price={"/Price"}
                        />
                        {/* marketing Accordion part end */}
                    </div>
                </TabsContent>
            </Tabs>
        </Container>
    );
}

export default PricingTabs;
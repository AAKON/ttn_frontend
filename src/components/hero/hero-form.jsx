import React from 'react';
import Button from "@/components/ui/button";
import {Categories, Country} from "@/components/hero/hero";
import Counter from "@/components/counter/counter";

const style = {
    boxShadow: "0px 4px 12px 0px rgba(0,0,0,0.04)"
}

function HeroForm(props) {
    return (
        <div className="bg-white p-3 rounded-xl mt-4" style={style}>
            <form
                action=""
                className="flex items-center justify-between gap-y-3 gap-x-2 flex-wrap md:flex-nowrap"
            >
                <div className="flex w-full items-center gap-2 rounded-lg py-3 px-6 md:order-2">
                <span>
                  <svg
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                        d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                        stroke="#D0D5DD"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                  </svg>
                </span>
                    <input
                        className="w-full flex-1 placeholder:text-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0 focus:ring-offset-none bg-transparent focus:border-none"
                        type="search"
                        placeholder="T-shirt manufacturer"
                    />
                </div>
                <div className="md:order-1 lg:border-r lg:border-r-gray-300">
                    <Categories/>
                </div>
                <div className="md:order-3">
                    <Country />
                </div>
                <div className="flex-1 md:order-4">
                    <Button className="w-full md:w-[210px]" type="submit">
                        Search
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default HeroForm;
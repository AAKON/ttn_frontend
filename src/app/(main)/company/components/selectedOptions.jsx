import React from "react";
import Button from "@/components/shared/button";
import Image from "next/image";
import countryIcon from "@/assets/country_icon.svg";
import { Cross } from "@/icons";
import grid_icon from "@/assets/grid.svg";
import layer_icon from "@/assets/layer_icon.svg";
import user_icon from "@/assets/user_icon.svg";
import batch_icon from "@/assets/batch_icon.svg";

function SelectedOptions(props) {
  return (
    <>
      <div className="mt-4">
        <div className="flex gap-x-5 mt-8">
          <div className="flex items-center gap-x-2">
            <Button
              type="button"
              secondary
              className="h-9 items-center leading-none text-sm text-gray-700 !font-normal gap-[6px] !px-3 rounded-full"
            >
              <Image
                src={countryIcon}
                alt="Country Icon"
                width={16}
                height={16}
              />
              Bangladesh
              <span className="cursor-pointer size-4 flex items-center justify-center ml-[10px]">
                <Cross strokeColor="#D0D5DD" width={8} height={8} />
              </span>
            </Button>
            <Button
              type="button"
              secondary
              className="h-9 items-center leading-none text-sm text-gray-700 !font-normal gap-[6px] !px-3 rounded-full"
            >
              <Image
                src={grid_icon}
                alt="Country Icon"
                width={16}
                height={16}
              />
              Machinery
              <span className="cursor-pointer size-4 flex items-center justify-center ml-[10px]">
                <Cross strokeColor="#D0D5DD" width={8} height={8} />
              </span>
            </Button>
            <Button
              type="button"
              secondary
              className="h-9 items-center leading-none text-sm text-gray-700 !font-normal gap-[6px] !px-3 rounded-full"
            >
              <Image
                src={layer_icon}
                alt="Country Icon"
                width={16}
                height={16}
              />
              Yarn
              <span className="cursor-pointer size-4 flex items-center justify-center ml-[10px]">
                <Cross strokeColor="#D0D5DD" width={8} height={8} />
              </span>
            </Button>
            <Button
              type="button"
              secondary
              className="h-9 items-center leading-none text-sm text-gray-700 !font-normal gap-[6px] !px-3 rounded-full"
            >
              <Image
                src={user_icon}
                alt="Country Icon"
                width={16}
                height={16}
              />
              Small
              <span className="cursor-pointer size-4 flex items-center justify-center ml-[10px]">
                <Cross strokeColor="#D0D5DD" width={8} height={8} />
              </span>
            </Button>
            <Button
              type="button"
              secondary
              className="h-9 items-center leading-none text-sm text-gray-700 !font-normal gap-[6px] !px-3 rounded-full"
            >
              <Image
                src={batch_icon}
                alt="Country Icon"
                width={16}
                height={16}
              />
              Lead Platinum
              <span className="cursor-pointer size-4 flex items-center justify-center ml-[10px]">
                <Cross strokeColor="#D0D5DD" width={8} height={8} />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelectedOptions;

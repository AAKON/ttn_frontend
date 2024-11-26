import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/ui/button";
import { X } from "lucide-react";

const ReportCard = ({ setreport }) => {
  const handleClick = () => {
    setreport(false);
  };

  return (
    <Card className="rounded-sm">
      <CardHeader className="space-y-4">
        <div className="flex items-start justify-between">
          <CardTitle>Report</CardTitle>
          <CardDescription onClick={handleClick} className="cursor-pointer">
            <X className="text-[16px]" />
          </CardDescription>
        </div>
        <CardDescription>Why are you reporting this list?</CardDescription>
      </CardHeader>

      <div className="flex flex-col gap-4">
        <CardContent className="px-4 py-0">
          <ReportContent />
        </CardContent>

        <CardContent className="px-4 py-0">
          <ReportContent />
        </CardContent>

        <CardContent className="px-4 py-0">
          <ReportContent />
        </CardContent>
      </div>

      <CardContent className="px-4 py-2 mt-6">
        <Label htmlFor="message" className="text-gray-900 text-sm font-normal">
          It’s something else
        </Label>
        <Textarea
          className="mt-[6px] focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Enter your message..."
        ></Textarea>
      </CardContent>

      <CardFooter className="mt-6">
        <Button className="w-full p-3">Submit Report</Button>
      </CardFooter>
    </Card>
  );
};

function ReportContent() {
  return (
    <div className="flex gap-2">
      <Checkbox
        id="terms1"
        className="px-0 py-0 h-4 w-4 bg-transparent border-gray-400 data-[state=checked]:bg-transparent data-[state=checked]:text-black data-[state=checked]:text-xs"
      />
      <div className="grid gap-1.5">
        <Label
          htmlFor="terms1"
          className="text-sm text-gray-700 font-medium leading-[20px]"
        >
          Your reason here
        </Label>
        <p className="text-sm text-gray-600 font-medium leading-[20px]">
          Save my login details for next time.
        </p>
      </div>
    </div>
  );
}

export default ReportCard;

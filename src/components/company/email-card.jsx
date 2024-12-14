import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Button from "@/components/shared/button";
import { X } from "lucide-react";

const EmailCard = ({ setemail }) => {
  const handleClick = () => {
    setemail(false);
  };

  return (
    <Card className="rounded-sm">
      <CardHeader className="flex-row items-start justify-between px-4">
        <CardTitle>Email us</CardTitle>
        <CardDescription onClick={handleClick} className="cursor-pointer">
          <X className="text-[16px]" />
        </CardDescription>
      </CardHeader>

      <CardContent className="px-4 py-0">
        <Label htmlFor="email" className="text-gray-900 text-sm font-normal">
          Enter you email
        </Label>
        <Input
          id="email"
          placeholder="you@company.com"
          className="mt-[6px] focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </CardContent>

      <CardContent className="px-4 py-2">
        <Label htmlFor="text" className="text-gray-900 text-sm font-normal">
          Subject
        </Label>
        <Input
          id="text"
          placeholder="Email subject"
          type={"text"}
          className="mt-[6px] focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </CardContent>

      <CardContent className="px-4 py-2">
        <Label htmlFor="message" className="text-gray-900 text-sm font-normal">
          Message
        </Label>
        <Textarea
          className="mt-[6px] focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Enter your message..."
        ></Textarea>
      </CardContent>

      <CardFooter className="mt-6">
        <Button className="w-full p-3">Send</Button>
      </CardFooter>
    </Card>
  );
};

export default EmailCard;

"use client";
import React, { useState } from "react";
import Link from "next/link";
import { AuthHeader } from "@/shared";
import Button from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { Seller } from "@/components/auth/register/seller";
import { Buyer } from "@/components/auth/register/buyer";
import { Talent } from "@/components/auth/register/talent";

export default function Register() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const cards = [
    {
      icon: "/icons/briefcase.svg",
      title: "I'm a seller, selling apparel items",
      component: <Seller />,
    },
    {
      icon: "/icons/cart.svg",
      title: "I’m a buyer, looking for manufaturers",
      component: <Buyer />,
    },
    {
      icon: "/icons/light.svg",
      title: "I’m a talent, looking for opportunities ",
      component: <Talent />,
    },
  ];

  const handleCardClick = (cardIndex) => {
    setSelectedCard(cardIndex);
  };
  const handleCreateAccount = () => {
    setIsFormVisible(true);
  };

  return (
    <div className="container mx-auto">
      <div className="auth-wrap flex flex-col justify-center items-center">
        <AuthHeader logo={"/logo-sm.svg"} />
        {!isFormVisible ? (
          <div className="w-full pb-20">
            <div className="text-center pt-2">
              <h1 className="auth_title">Join as Buyer / Seller / Talent</h1>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-10 py-6 sm:py-8 md:py-10">
              {cards.map((card, index) => (
                <Card
                  key={index}
                  className={`w-[296px] border-[#D0D5DD] hover:border-[#F7931E] ${
                    selectedCard === index ? "border-[#F7931E] active-card" : ""
                  } ${
                    index !== 0
                      ? "pointer-events-none cursor-not-allowed opacity-25"
                      : ""
                  }`}
                  onClick={() => handleCardClick(index)}
                >
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-stretch">
                      <div className="h-[100px] sm:h-[144px] md:h-[125px]">
                        <div className="h-full pt-3 sm:pt-4 flex flex-col justify-between">
                          <Image
                            src={card.icon}
                            width={32}
                            height={32}
                            alt="icon"
                          />
                          <p className="text-[#101828] text-base sm:text-lg md:text-xl font-medium">
                            {card.title}
                          </p>
                        </div>
                      </div>
                      <div className="btype-check">
                        <Checkbox
                          checked={selectedCard === index}
                          className="bg-transparent rounded focus:border-[#F7931E] w-4 h-4 p-0 m-0"
                          readOnly
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="flex flex-col justify-center items-center">
              <Button
                className="mt-2 min-w-[155px]"
                type="submit"
                disabled={selectedCard === null}
                onClick={handleCreateAccount}
              >
                Create account
              </Button>
              <div className="pt-2.5 text-center">
                <p className="frm_cr">
                  Already have an account?{" "}
                  <Link
                    className="text-primary text-base font-semibold"
                    href="/login"
                  >
                    Log in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div>{cards[selectedCard].component}</div>
        )}
      </div>
    </div>
  );
}

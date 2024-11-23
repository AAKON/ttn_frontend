"use client"
import { useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Plus, Minus } from '@/icons'


const FrequentlyAskedQuestions = () => {
    const [imgToggle, setimgToggle] = useState(null)

    const handleClick = (idx) => {
        setimgToggle(imgToggle === idx ? null : idx);
    }

    let arr = [
        { 
            id:1,
            title: "Is there a free trial available?",
            driscription: " Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible."
        },
        {   
            id:2,
            title: "Can I change my plan later?",
            driscription: "Yes! Send us a message and we’ll process your cancellation no questions asked."
        },
        {   
            id:3,
            title: "What is your cancellation policy?",
            driscription: "Yes! Send us a message and we’ll process your cancellation no questions asked."
        },
        {   
            id:4,
            title: "Can other info be added to an invoice?",
            driscription: "We accept most major credit cards, PayPal, and Google Pay."
        },
        {   
            id:5,
            title: "How does billing work?",
            driscription: "Yes! Send us a message and we’ll process your cancellation no questions asked."
        },
        {   
            id:6,
            title: "How do I change my account email?",
            driscription: "Yes! Send us a message and we’ll process your cancellation no questions asked."
        }
    ]

    return (
        <div>
            <Accordion type="single" collapsible>
                {
                    arr.map((el, idx) => (
                        <AccordionItem key={idx} value={`item-${idx + 1}`} className="py-6">
                            <AccordionTrigger onClick={() => handleClick(idx)} className={"bg-transparent px-0 py-0 text-gray-900 Business-Contact justify-start gap-6 text-base leading-[24px] font-medium  hover:no-underline"}>
                                {
                                    imgToggle == idx ?
                                        <Minus />
                                        :
                                        <Plus />
                                }
                                {el.title}
                            </AccordionTrigger>
                            <AccordionContent className="ml-12 text-gray-600 text-base pt-2 pb-0">
                                {el.driscription}
                            </AccordionContent>
                        </AccordionItem>
                    ))
                }
            </Accordion>
        </div >
    )
}

export default FrequentlyAskedQuestions
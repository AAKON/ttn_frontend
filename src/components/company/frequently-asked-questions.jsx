"use client"
import { useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Plus, Minus } from '@/icons'
import {Empty} from "@/shared";


const FrequentlyAskedQuestions = ({faqs}) => {
    const [imgToggle, setimgToggle] = useState(null);

    const handleClick = (idx) => {
        setimgToggle(imgToggle === idx ? null : idx);
    }

    return (
        <div>
            {faqs && Array.isArray(faqs) && faqs.length > 0 ?
                <Accordion type="single" collapsible>
                    {
                        faqs.map((el) => (
                            <AccordionItem key={el?.id} value={`item-${el?.id}`} className="py-6">
                                <AccordionTrigger onClick={() => handleClick(el?.id)} className={"bg-transparent px-0 py-0 text-gray-900 Business-Contact justify-start gap-6 text-base leading-[24px] font-medium  hover:no-underline"}>
                                    {
                                        imgToggle == el?.id ?
                                            <Minus />
                                            :
                                            <Plus />
                                    }
                                    {el?.question}
                                </AccordionTrigger>
                                <AccordionContent className="ml-12 text-gray-600 text-base pt-2 pb-0">
                                    {el?.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))
                    }
                </Accordion>
                : <Empty message={'No Faq found'} />}
        </div >
    )
}

export default FrequentlyAskedQuestions
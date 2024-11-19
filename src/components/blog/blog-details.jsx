import React from 'react'
import Image from 'next/image'
import detailsImg1 from "@/assets/detailsImg1.jpg"
import detailsImg2 from "@/assets/detailsImg2.jpg"
import detailsImg3 from "@/assets/detailsImg3.jpg"
import { CalendarIcon } from "lucide-react"
import { CopyIcon, Facebook, Link, Twiter, UserEdit } from '@/icons'
import Button from '@/components/ui/button'

const BlogDetails = async({blog}) => {

    return (
        <div>
            <div className='lg:w-[1024px] w-container mx-auto'>
                <h1 className="lg:w-[770px] lg:text-[48px]  w-container text-[36px] font-semibold text-gray-900 pt-[70px] mx-auto text-center">
                    {blog.title}
                </h1>

                <p className='lg:text-[20px] text-gray-600 lg:leading-[30px] lg:w-[800px] lg:block hidden mx-auto text-center mt-6'>
                    How do you create compelling presentations that wow your colleagues.
                </p>

                <p className='text-[18px] text-gray-600 leading-[28px] w-full lg:hidden block mx-auto text-center mt-6'>
                    How do you create compelling presentations that wow your colleagues and impress your managers? Here’s how to get started.
                </p>

                <div className="flex justify-center gap-4 mt-8">
                    {blog?.author &&
                    <div className="flex items-center gap-2 lg:text-base text-sm">
                        <UserEdit color={"#182230"} />
                        {blog?.author}
                    </div>}
                    {blog?.updated_at &&
                    <div className="flex items-center gap-2 lg:text-base text-sm">
                        <CalendarIcon />
                        <span>{blog?.updated_at}</span>
                    </div>}
                </div>


                <div className="mt-16 px-4">

                    <div className="lg:w-[1024px] lg:h-[560px] w-container mx-auto">
                        <Image
                            src={
                                blog?.featured_image
                                    ? blog.featured_image
                                    : detailsImg1
                            }
                            width={0}
                            height={0}
                            sizes="100vw"
                            alt="feature image"
                            className="w-full h-full"
                        />
                    </div>
                    <article className="paragraph lg:text-lg text-gray-600 lg:leading-[30px] lg:mt-20 mt-[32px]" dangerouslySetInnerHTML={{__html: blog?.content}}/>

                </div>

                <div className="flex lg:flex-row flex-col justify-between lg:gap-0 gap-6 lg:mt-[114px] mt-[90px]">

                    <div className="flex gap-2 items-center">
                        {blog?.blog_types && blog?.blog_types?.map((blogType) => (
                                <Button key={blogType?.id} className='bg-transparent bg-opacity-15 border-opacity-[60%] border-2 py-0 px-2 text-sm border-brand-200 rounded-[16px] text-brand-700'>
                                    {blogType?.name}
                                </Button>
                            ))}
                    </div>

                    <div className="flex gap-4">
                        <Button className='bg-transparent text-gray-700 border border-gray-300'>
                            <CopyIcon />
                            Copy link
                        </Button>

                        <Button className='bg-transparent text-gray-700 border border-gray-300 p-[10px]'>
                            <Twiter />
                        </Button>

                        <Button className='bg-transparent text-gray-700 border border-gray-300 p-[10px]'>
                            <Facebook />
                        </Button>

                        <Button className='bg-transparent text-gray-700 border border-gray-300 p-[10px]'>
                            <Link />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogDetails
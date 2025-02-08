"use client";

import React, {useRef} from "react";
import {jsPDF} from "jspdf";
import html2canvas from "html2canvas";
import {FileDownloadIcon} from "@/icons";
import Image from "next/image";
import CodeBlue from "@/assets/CodeBlue.svg";
import TagsView from "@/app/(main)/company/[slug]/components/tags-view";
import AU from "@/assets/AU.png";


const DownloadProfile = ({profileData}) => {
    const profileRef = useRef(null);

    const generatePDF = async () => {
        if (!profileRef.current) return;

        const canvas = await html2canvas(profileRef.current, {
            scale: 2, // Increase resolution
            useCORS: true, // Ensure external fonts/images load properly
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save("profile-35.pdf");
    };

    const name = profileData?.company?.name;
    const profileImage = profileData?.company?.profile_pic_url;
    const moto = profileData?.company?.moto;
    const btypes = profileData?.company?.business_types;
    const tagList = btypes && btypes.length > 0 ? btypes.map((btype) => btype.name) : [];
    const about = profileData?.company?.about;
    const categories = profileData?.company?.business_categories;
    const companySize = profileData?.company?.manpower;
    const location = profileData?.company?.location;
    const langIcon = profileData?.company?.location?.flag_path ?? '';
    const viewCount = profileData?.company?.view_count;


    return (
        <div className="mt-4">
            {/* Hidden div to capture profile content */}
            <div ref={profileRef} className="bg-white p-3 w-full">
                <div className="max-w-screen-md mx-auto p-2.5 rounded-lg border border-gray-200">
                    <div className="flex flex-col gap-2.5">
                        <div className="flex items-center gap-2">
                            <Image
                                className="border rounded-full object-cover w-10 h-10"
                                src={profileImage ? profileImage : CodeBlue}
                                width={40}
                                height={40}
                                alt={name || "profile image"}
                            />
                            <div className="flex flex-col gap-2">
                                <div className="text-brand-600 text-sm font-semibold uppercase"
                                     style={{fontSize: '10px', marginBottom: 0, lineHeight: ".5"}}>
                                    {moto}
                                </div>
                                <p className="text-gray-900 font-semibold"
                                     style={{fontSize: '12px', marginBottom: '10px', lineHeight: "1.5"}}>
                                    {name}
                                </p>
                            </div>
                        </div>
                        {(tagList && tagList.length > 0) &&
                            (<div className="flex flex-wrap gap-1">
                                {tagList.map((tag, index) => (
                                    <p
                                        key={index}
                                        className="border border-gray-300 bg-transparent text-gray-600 rounded-lg inline-flex items-center justify-center"
                                        style={{
                                            fontSize: "7px",
                                            lineHeight: ".4",
                                            padding: "0 4px",
                                            margin: 0,
                                            height: "12px",
                                            display: "block",
                                        }}
                                    >
                                      {tag}
                                    </p>
                                ))}
                            </div>)}
                    </div>
                    <div className="flex flex-col gap-1 mt-1">
                        {categories && categories.length > 0 && (
                            <div>
                                <p style={{fontSize: '9px', margin: '0', lineHeight: "1", color: 'rgb(102, 112, 133)'}}>Category</p>
                                {categories.map((category, index) => (
                                    <small key={category?.id} style={{fontSize: '8px', lineHeight: "1", color: '#000'}}>
                                        {category?.name}
                                        {index < categories.length - 1 && ', '}
                                    </small>
                                ))}
                            </div>)}
                        {companySize && (
                        <div>
                            <p style={{fontSize: '9px', margin: '0', lineHeight: "1", color: 'rgb(102, 112, 133)'}}>Company Size</p>
                            <small style={{fontSize: '8px', lineHeight: "1", color: '#000'}}>{companySize}</small>
                        </div>)}
                        {location && (
                            <div className="flex items-center gap-1">
                                <div style={{fontSize: '9px', margin: '0', lineHeight: "1", color: 'rgb(102, 112, 133)'}}>Location</div>
                                <div className="flex items-center gap-1">
                                    {langIcon ? (
                                            <div className="overflow-hidden">
                                                <Image src={langIcon} width="14" height="14" className="w-3.5 h-3.5 rounded-full bg-cover object-center"
                                                       alt={""} />
                                            </div>
                                    ) : <div className="w-5 h-5 rounded-full bg-gray-300">{location?.name}</div>}
                                    <small style={{fontSize: '8px', lineHeight: "1", color: '#000'}}>{location?.name}</small>
                                </div>
                            </div>)}
                        {viewCount && (
                            <div className="flex gap-1">
                                <p style={{fontSize: '9px', margin: '0', lineHeight: "1", color: 'rgb(102, 112, 133)'}}>Views</p>
                                <small style={{fontSize: '8px', lineHeight: "1", color: '#000'}}>{viewCount}</small>
                            </div>)}

                    </div>
                    {about &&
                        (<div className="py-2">
                            <div style={{fontSize: '9px', marginBottom: '5px', lineHeight: "1", color: 'rgb(102, 112, 133)'}}>About Company</div>
                            <p style={{fontSize: '8px', marginBottom: '8px', lineHeight: "1.5", color: '#000'}}>{about}</p>
                        </div>)}
                </div>
            </div>

            {/* Button to download PDF */}
            <h3 className="text-gray-500 text-[14px] flex items-center gap-[4px] cursor-pointer" onClick={generatePDF}>
                <FileDownloadIcon/>
                <p className="text-gray-500 text-[14px] border-b border-gray-500">
                    Download Profile
                </p>
            </h3>
        </div>
    );
};

export default DownloadProfile;

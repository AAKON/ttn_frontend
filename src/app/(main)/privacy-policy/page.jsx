import {Container, SectionHeading} from "@/components/shared";
import "@/styles/privacy-policy.css"
import {getPartnerList} from "@/services/partner";
import {getTerms} from "@/services/contact";
import ErrorMessage from "@/components/shared/errormessage";
import React from "react";

async function PrivacyPolicy(props) {
    try {
        const pagePromise = getTerms();
        const termsData = await pagePromise;

        return (
            <section dangerouslySetInnerHTML={{__html: termsData}}>
            </section>
        );
    } catch (error) {
            return <ErrorMessage message={error?.message} />;
        }
}

export default PrivacyPolicy;
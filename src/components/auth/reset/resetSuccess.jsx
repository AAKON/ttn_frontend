import React from 'react';
import Link from "next/link";
import {BackLink} from "@/components/auth/backLink";

function ResetSuccess(props) {
    return (
        <div className="w-full sm:w-[360px] mx-auto">
            <div className="text-center pt-2">
                <h1 className="auth_title">Password reset</h1>
                <p className="gray-500 pt-3">Your password has been successfully reset. Click below to log in
                    magically.</p>
            </div>
            <div className="auth-form pt-8">
                <div className="flex flex-col gap-8">
                    <Link href="/login"
                          className="w-full font-semibold text-base rounded-lg leading-[44px] bg-primary text-white mt-2 block text-center"
                          type="submit">
                        Continue
                    </Link>
                    <BackLink title="Back to log in" link="/login"/>
                </div>
            </div>
        </div>
    );
}

export default ResetSuccess;
// components/Error.jsx
import React from "react";

export const Error = ({ error })=> {
    return (
        <div className="error-state">
            <p>{error.message || "Something went wrong. Please try again later."}</p>
        </div>
    );
}

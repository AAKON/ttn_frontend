// components/Empty.jsx
import React from "react";

export const Empty = ({ message }) => {
    return <div className="py-6 empty-state">{message || "No data available."}</div>;
}

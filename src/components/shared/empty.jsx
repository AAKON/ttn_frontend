// components/Empty.jsx
import React from "react";

export const Empty = ({ message }) => {
    return <div className="empty-state py-6 text-red-600">{message || "No data available."}</div>;
}

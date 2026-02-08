"use client";
import React, { useState } from "react";
import CommentsSection from "./CommentsSection";

export default function SourcingClientWrapper({ initialSourcing, sourcingId }) {
	const [sourcing, setSourcing] = useState(initialSourcing);

	const handleCommentsUpdate = (updatedComments) => {
		setSourcing(prev => ({
			...prev,
			comments: updatedComments
		}));
	};

	// Don't show comments section when status is pending
	if (sourcing.status === "pending") {
		return null;
	}

	return (
		<CommentsSection
			sourcingId={sourcingId}
			comments={sourcing.comments}
			onCommentsUpdate={handleCommentsUpdate}
		/>
	);
}

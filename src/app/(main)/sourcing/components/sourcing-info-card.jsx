import React from "react";

const SourcingInfoCard = ({ icon, label, value }) => {
	return (
		<div className="bg-gray-50 p-4 rounded-lg">
			<div className="flex items-center gap-2 mb-2">
				<span className="text-sm font-medium text-gray-500">{label}</span>
			</div>
			<div className="flex items-center gap-2">
				{icon}
				<span className="text-md font-medium text-gray-900">{value}</span>
			</div>
		</div>
	);
};

export default SourcingInfoCard;

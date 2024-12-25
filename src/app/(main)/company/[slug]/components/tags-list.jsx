import React from 'react';

function TagsList({initialTags}) {
    return (
        <>
            {initialTags.map((tag, index) => (
                <span key={index} className="border border-gray-300 px-2 py-[1px] text-sm text-gray-400 font-semibold leading-[21px] rounded-lg">
                    {tag}
                </span>
            ))}
        </>
    );
}

export default TagsList;
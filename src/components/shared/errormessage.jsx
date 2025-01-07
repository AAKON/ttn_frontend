import React from 'react';

function ErrorMessage({message}) {
    return (
        <div className="p-4 text-base text-red-600">{message}</div>
    );
}

export default ErrorMessage;
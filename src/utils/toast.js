// utils/toast.js
export const showSuccessToast = (toast, message, options = {}) => {
    // If message is an object (like API response with comment data), use default message
    const displayMessage = (typeof message === 'object' && message !== null)
        ? 'Submitted successfully!'
        : (message || 'Submitted successfully!');

    toast({
        title: 'Success',
        description: displayMessage,
        variant: 'success',
        ...options,
    });
};

export const showErrorToast = (toast, message, options = {}) => {
    // If message is an object, use default error message
    const displayMessage = (typeof message === 'object' && message !== null)
        ? 'Request failed!'
        : (message || 'Request failed!');

    toast({
        title: 'Error',
        description: displayMessage,
        variant: 'destructive',
        ...options,
    });
};

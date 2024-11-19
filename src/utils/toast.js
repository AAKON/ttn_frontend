// utils/toast.js
export const showSuccessToast = (toast, message) => {
    toast({
        title: 'Success',
        description: message,
        variant: 'success',
    });
};

export const showErrorToast = (toast, message) => {
    toast({
        title: 'Error',
        description: message,
        variant: 'error',
    });
};

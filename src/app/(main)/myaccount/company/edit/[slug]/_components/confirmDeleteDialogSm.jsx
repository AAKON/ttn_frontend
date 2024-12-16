import React, {useState} from "react";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogAction,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import Button from "@/components/shared/button";
import {DeleteIcon} from "@/icons";
import { Loader2 } from "lucide-react";

function ConfirmDeleteDialogSm({ open, setOpen, onConfirm, isDeleting }) {

    const handleConfirm = () => {
        onConfirm();
    };


    return (
        <AlertDialog className="z-50" onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    secondary
                    className="size-7 !p-1 !rounded-none border-none"
                    type="button"
                >
                    <DeleteIcon stroke="#F04438" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this product? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button secondary className="text-[#F04438]" disabled={isDeleting} >Cancel</Button>
                    </AlertDialogCancel>
                    <Button className="h-10" onClick={handleConfirm} disabled={isDeleting}>
                        {isDeleting ? (
                            <>
                                <Loader2 className="mr-.5 h-4 w-4 animate-spin" />
                                Deleting...
                            </>
                        ) : (
                            "Confirm"
                        )}
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default ConfirmDeleteDialogSm;

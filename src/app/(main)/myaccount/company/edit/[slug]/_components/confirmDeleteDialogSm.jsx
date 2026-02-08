import React, { useState } from "react";
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
import { DeleteIcon } from "@/icons";
import { Loader2 } from "lucide-react";
import { Trash } from "lucide-react";

function ConfirmDeleteDialogSm({ open, isDelCompany = false, setOpen, onConfirm, isDeleting, showLabel = true, triggerClassName, triggerVariant = "deleteOutline" }) {

    const handleConfirm = () => {
        onConfirm();
    };


    return (
        <AlertDialog className="z-50" open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                {isDelCompany ? (
                    <Button
                        type="button"
                        deleteOutline={triggerVariant === "deleteOutline"}
                        secondary={triggerVariant === "secondary"}
                        className={triggerClassName || "group text-red-600 border-red-600"}
                    >
                        <Trash width={20} />
                        {showLabel && "Remove"}
                    </Button>) : (
                    <Button
                        secondary
                        className="size-7 !p-1 !rounded-none border-none"
                        type="button"
                    >
                        <DeleteIcon stroke="#F04438" />
                    </Button>)}

            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete? This action cannot be undone.
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

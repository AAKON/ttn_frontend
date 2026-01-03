import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Button from "@/components/shared/button";
import { Bars, Cross } from "@/icons";
import AuthNavDropdown from "@/components/shared/authNavbar/authNavDropdown";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SourcingRequestSheet from "@/components/shared/sourcing/sourcing-request-sheet";

function AuthNavbar({ showMobileNav, setShowMobileNav }) {
	const { data, status } = useSession();
	const [showSourcingSheet, setShowSourcingSheet] = React.useState(false);

	return (
		<div className="flex justify-end items-center gap-3 md:gap-4">
			<SourcingRequestSheet
				open={showSourcingSheet}
				onOpenChange={setShowSourcingSheet}
			/>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						icon
						className="h-9 lg:h-11 cursor-pointer focus:outline-none focus:ring-0"
					>
						Add
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="w-[165px] p-2 z-[10001]">
					<DropdownMenuItem
						className="cursor-pointer py-3 rounded-xl border-b border-gray-200 font-semibold text-md text-gray-900"
						onSelect={() => {
							setTimeout(() => {
								setShowSourcingSheet(true);
							}, 200);
						}}
					>
						Sourcing
					</DropdownMenuItem>
					<DropdownMenuItem asChild className="cursor-pointer py-3">
						<Link
							href="/myaccount/company/add"
							className="w-full font-semibold text-md text-gray-900"
						>
							Listing
						</Link>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			{status === "authenticated" ? (
				<AuthNavDropdown userInfo={data?.user} />
			) : (
				<Button
					TagName={Link}
					href="/login"
					secondary
					className="!text-gray-900 focus:outline-none focus:ring-0"
				>
					Login
				</Button>
			)}
			<button
				onClick={() => setShowMobileNav(!showMobileNav)}
				className="lg:hidden size-9 lg:size-10 bg-transparent p-2 flex items-center justify-center"
			>
				{showMobileNav ? <Cross /> : <Bars />}
			</button>
		</div>
	);
}

export default AuthNavbar;

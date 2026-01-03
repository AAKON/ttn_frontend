"use client";

export default function testPage() {
	return (
		<div className="p-14">
			<SheetDemo />
		</div>
	);
}

import * as React from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export function SelectScrollable() {
	return (
		<Select>
			<SelectTrigger className="w-[280px] bg-slate-700">
				<SelectValue placeholder="Select a timezone" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>North America</SelectLabel>
					<SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
					<SelectItem value="cst">Central Standard Time (CST)</SelectItem>
					<SelectItem value="mst">Mountain Standard Time (MST)</SelectItem>
					<SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
					<SelectItem value="akst">Alaska Standard Time (AKST)</SelectItem>
					<SelectItem value="hst">Hawaii Standard Time (HST)</SelectItem>
				</SelectGroup>
				<SelectGroup>
					<SelectLabel>Europe & Africa</SelectLabel>
					<SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
					<SelectItem value="cet">Central European Time (CET)</SelectItem>
					<SelectItem value="eet">Eastern European Time (EET)</SelectItem>
					<SelectItem value="west">
						Western European Summer Time (WEST)
					</SelectItem>
					<SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
					<SelectItem value="eat">East Africa Time (EAT)</SelectItem>
				</SelectGroup>
				<SelectGroup>
					<SelectLabel>Asia</SelectLabel>
					<SelectItem value="msk">Moscow Time (MSK)</SelectItem>
					<SelectItem value="ist">India Standard Time (IST)</SelectItem>
					<SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
					<SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
					<SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
					<SelectItem value="ist_indonesia">
						Indonesia Central Standard Time (WITA)
					</SelectItem>
				</SelectGroup>
				<SelectGroup>
					<SelectLabel>Australia & Pacific</SelectLabel>
					<SelectItem value="awst">
						Australian Western Standard Time (AWST)
					</SelectItem>
					<SelectItem value="acst">
						Australian Central Standard Time (ACST)
					</SelectItem>
					<SelectItem value="aest">
						Australian Eastern Standard Time (AEST)
					</SelectItem>
					<SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
					<SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
				</SelectGroup>
				<SelectGroup>
					<SelectLabel>South America</SelectLabel>
					<SelectItem value="art">Argentina Time (ART)</SelectItem>
					<SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
					<SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
					<SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}

import { X } from "lucide-react";

// =====================================================================
import { Button } from "@/components/ui/button";

function SheetDemo() {
	const [open, setOpen] = React.useState(false);
	return (
		<>
			<Button variant="solid" onClick={() => setOpen(true)}>
				Open
			</Button>
			{open && (
				<>
					<div
						className="fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
						onClick={() => setOpen(false)}
					/>
					<div className="fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500 inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right">
						<button
							className="absolute right-4 top-4 rounded-sm bg-transparent p-1"
							onClick={() => setOpen(false)}
						>
							<X className="h-4 w-4" />
							<span className="sr-only">Close</span>
						</button>
						<div className="flex flex-col space-y-2 text-center sm:text-left">
							<h2 className="text-lg font-semibold text-foreground">
								Edit profile
							</h2>
							<p className="text-sm text-muted-foreground">
								Make changes to your profile here. Click save when you're done.
							</p>
						</div>
						<div className="grid flex-1 auto-rows-min gap-6 px-4">
							<SelectScrollable />
						</div>
						<div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
							<Button type="submit">Save changes</Button>
							<Button variant="outline" onClick={() => setOpen(false)}>
								Close
							</Button>
						</div>
					</div>
				</>
			)}
		</>
	);
}

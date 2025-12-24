"use client";
import React, { useState } from "react";
import { getSession } from "next-auth/react";
import { submitComment, submitReply, getSourcingDetails } from "@/services/sourcing";
import { User, Loader2 } from "lucide-react";
import Button from "@/components/shared/button";
import { ReplyIcon } from "@/components/icons/reply-icon";
import { SendIcon } from "@/components/icons/send-icon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
	comment: z.string().min(1, { message: "Comment is required" }),
});

export default function CommentsSection({ sourcingId, comments, onCommentsUpdate }) {
	const [submittingComment, setSubmittingComment] = useState(false);
	const [activeReplyId, setActiveReplyId] = useState(null);
	const [replyText, setReplyText] = useState("");
	const [submittingReply, setSubmittingReply] = useState(false);

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			comment: "",
		},
	});

	const transformCommentsData = (apiComments) => {
		return apiComments?.map((comment) => ({
			id: comment.id,
			user_name:
				`${comment.user?.first_name} ${comment.user?.last_name}`.trim() ||
				"Anonymous",
			user_avatar: null,
			comment: comment.comment,
			date: new Date(comment.created_at).toLocaleDateString("en-US", {
				day: "numeric",
				month: "short",
				year: "numeric",
			}),
			replies:
				comment.replies?.map((reply) => ({
					id: reply.id,
					user_name:
						`${reply.user?.first_name} ${reply.user?.last_name}`.trim() ||
						"Anonymous",
					user_avatar: null,
					comment: reply.reply,
					date: new Date(reply.created_at).toLocaleDateString("en-US", {
						day: "numeric",
						month: "short",
						year: "numeric",
					}),
				})) || [],
		})) || [];
	};

	const refreshComments = async () => {
		const session = await getSession();
		const token = session?.accessToken;
		const updatedResponse = await getSourcingDetails(sourcingId, token);

		if (updatedResponse && updatedResponse.status) {
			const transformedComments = transformCommentsData(updatedResponse.data.comments);
			onCommentsUpdate(transformedComments);
		}
	};

	const onSubmit = async (data) => {
		setSubmittingComment(true);
		const { comment } = data;

		try {
			const result = await submitComment(sourcingId, comment, toast);
			if (result.status && result.code === 201) {
				form.reset();
				await refreshComments();
			}
		} catch (error) {
			console.error("Error submitting comment:", error);
		} finally {
			setSubmittingComment(false);
		}
	};

	const handleReplySubmit = async (commentId) => {
		if (!replyText.trim()) return;
		setSubmittingReply(true);
		try {
			const result = await submitReply(commentId, replyText, toast);
			if (result.status && result.code === 201) {
				setReplyText("");
				setActiveReplyId(null);
				await refreshComments();
			}
		} catch (error) {
			console.error("Error submitting reply:", error);
		} finally {
			setSubmittingReply(false);
		}
	};

	return (
		<div className="bg-white p-4 lg:p-6 xl:p-8 rounded-lg border border-gray-100">
			<h3 className="text-lg font-semibold text-gray-900 mb-4">
				Comments ({comments.length})
			</h3>

			{/* Add Comment */}
			<div>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="flex gap-3 items-end">
							<FormField
								control={form.control}
								name="comment"
								render={({ field }) => (
									<FormItem className="flex-1">
										<FormControl>
											<Textarea
												placeholder="Add your comments..."
												className="resize-none min-h-[48px] h-[48px] max-h-[100px] lg:max-h-[100px] px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-gray-500 overflow-y-auto focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
												{...field}
												onInput={(e) => {
													e.target.style.height = "48px";
													e.target.style.height = `${e.target.scrollHeight}px`;
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<Button
								secondary
								type="submit"
								disabled={submittingComment}
								className="!bg-gray-100 lg:!bg-white px-3 lg:px-6 !h-12"
							>
								{submittingComment ? (
									<>
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
										<span className="hidden lg:block">Please wait</span>
									</>
								) : (
									<>
										<SendIcon className="lg:hidden" />
										<span className="hidden lg:block">Submit</span>
									</>
								)}
							</Button>
						</div>
					</form>
				</Form>
			</div>

			{/* Divider */}
			{comments.length > 0 && (
				<div className="border-b border-gray-100 my-4 lg:my-6 xl:my-8" />
			)}

			{/* Comments List */}
			<div className="space-y-4">
				{comments.map((comment) => (
					<div key={comment.id} className="mb-4 last:border-0 last:mb-0">
						<div className="mb-4 flex gap-3">
							<div className="size-12 rounded-full border border-gray-300 bg-gray-200 flex items-center justify-center flex-shrink-0">
								<User className="w-6 h-6 text-gray-600" />
							</div>
							<div className="flex-1 bg-gray-50 p-5 rounded-[16px]">
								<p className="text-gray-900 text-sm md:text-md lg:text-lg mb-2">
									{comment.comment}
									{comment.comment.includes("...") && (
										<button className="ml-2 inline p-0 bg-transparent text-brand-600">
											Show more
										</button>
									)}
								</p>
								<div className="flex justify-between items-center gap-4 text-xs text-gray-500">
									<button
										onClick={() =>
											setActiveReplyId(
												activeReplyId === comment.id ? null : comment.id
											)
										}
										className="flex items-center gap-1 ml-2 p-0 bg-transparent text-brand-600 text-md md:text-md lg:text-lg hover:underline"
									>
										Reply
										<ReplyIcon stroke="#C67618" className="w-4 h-4" />
									</button>
									<span className="text-gray-500 text-sm md:text-md">
										{comment.date}
									</span>
								</div>
							</div>
						</div>

						{/* Reply Form */}
						{activeReplyId === comment.id && (
							<div className="ml-12 mb-6 flex gap-3 items-end animate-in fade-in slide-in-from-top-2 duration-200">
								<div className="size-12 rounded-full border border-gray-300 bg-gray-200 flex items-center justify-center flex-shrink-0">
									<User className="w-6 h-6 text-gray-600" />
								</div>
								<div className="flex-1 flex gap-3 items-end">
									<Textarea
										placeholder="Add your comments..."
										className="resize-none min-h-[48px] h-[48px] max-h-[100px] px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500 overflow-y-auto focus-visible:ring-0 focus-visible:ring-offset-0"
										value={replyText}
										onChange={(e) => setReplyText(e.target.value)}
										onInput={(e) => {
											e.target.style.height = "48px";
											e.target.style.height = `${e.target.scrollHeight}px`;
										}}
									/>
									<Button
										secondary
										onClick={() => handleReplySubmit(comment.id)}
										disabled={submittingReply || !replyText.trim()}
										className="!bg-gray-100 px-6 !h-12 border border-gray-200 cursor-pointer"
									>
										{submittingReply ? (
											<Loader2 className="h-4 w-4 animate-spin" />
										) : (
											"Submit"
										)}
									</Button>
								</div>
							</div>
						)}
						{comment.replies && comment.replies.length > 0 && (
							<div className="pl-12 mb-4 last:border-0 space-y-3 last:mb-0">
								{comment.replies.map((reply) => (
									<div key={reply.id} className="flex gap-3">
										<div className="size-10 rounded-full border border-gray-300 bg-gray-200 flex items-center justify-center flex-shrink-0">
											<User className="w-5 h-5 text-gray-600" />
										</div>
										<div className="flex-1 bg-gray-50 p-4 rounded-[12px]">
											<p className="text-gray-900 text-sm md:text-md mb-2">
												{reply.comment}
												{reply.comment.includes("...") && (
													<button className="ml-2 inline p-0 bg-transparent text-brand-600">
														Show more
													</button>
												)}
											</p>
											<div className="flex justify-end items-center gap-4 text-xs text-gray-500">
												<span className="text-gray-500 text-sm md:text-md">
													{reply.date}
												</span>
											</div>
										</div>
									</div>
								))}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
}

"use client";

import React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, List, ListOrdered } from "lucide-react";

const TiptapEditor = React.forwardRef(
	({ value, onChange, placeholder, className }, ref) => {
		const editor = useEditor({
			extensions: [
				StarterKit.configure({
					bulletList: {
						keepMarks: true,
						keepAttributes: false,
					},
					orderedList: {
						keepMarks: true,
						keepAttributes: false,
					},
					hardBreak: {
						keepMarks: false,
					},
				}),
			],
			content: value || "",
			immediatelyRender: false,
			editorProps: {
				attributes: {
					class: "tiptap-editor prose prose-sm max-w-none focus:outline-none px-3 py-2",
					...(placeholder && { 'data-placeholder': placeholder }),
				},
			},
			onUpdate: ({ editor }) => {
				const html = editor.getHTML();
				onChange?.(html);
			},
		});

		// Update editor content when value prop changes externally
		React.useEffect(() => {
			if (editor && value !== editor.getHTML()) {
				editor.commands.setContent(value || "");
			}
		}, [value, editor]);

		if (!editor) {
			return null;
		}

		return (
			<div
				className={`border border-gray-300 rounded-md bg-white overflow-hidden ${className || ""
					}`}
			>
				{/* Toolbar */}
				<div className="border-b border-gray-200 bg-gray-50 p-2 flex gap-1">
					<button
						type="button"
						onClick={() => editor.chain().focus().toggleBold().run()}
						disabled={!editor.can().chain().focus().toggleBold().run()}
						className={`p-2 rounded bg-brand-200 transition-colors ${editor.isActive("bold")
							? "bg-brand-700 text-white"
							: "text-brand-900"
							}`}
						title="Bold"
					>
						<Bold className="w-4 h-4" />
					</button>

					<button
						type="button"
						onClick={() => editor.chain().focus().toggleItalic().run()}
						disabled={!editor.can().chain().focus().toggleItalic().run()}
						className={`p-2 rounded bg-brand-200 transition-colors ${editor.isActive("italic")
							? "bg-brand-700 text-white"
							: "text-brand-900"
							}`}
						title="Italic"
					>
						<Italic className="w-4 h-4" />
					</button>

					<div className="w-px bg-border mx-1" />

					<button
						type="button"
						onClick={() => editor.chain().focus().toggleBulletList().run()}
						className={`p-2 rounded bg-brand-200 transition-colors ${editor.isActive("bulletList")
							? "bg-brand-700 text-white"
							: "text-brand-900"
							}`}
						title="Bullet List"
					>
						<List className="w-4 h-4" />
					</button>

					<button
						type="button"
						onClick={() => editor.chain().focus().toggleOrderedList().run()}
						className={`p-2 rounded bg-brand-200 transition-colors ${editor.isActive("orderedList")
							? "bg-brand-700 text-white"
							: "text-brand-900"
							}`}
						title="Numbered List"
					>
						<ListOrdered className="w-4 h-4" />
					</button>
				</div>

				{/* Editor Content */}
				<div className="tiptap-content min-h-[100px]">
					<EditorContent editor={editor} />
				</div>
			</div>
		);
	}
);

TiptapEditor.displayName = "TiptapEditor";

export { TiptapEditor };

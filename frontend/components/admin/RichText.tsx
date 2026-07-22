"use client";

import { useEffect } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo2,
  Redo2,
} from "lucide-react";
import { cn } from "@/lib/utils";

function Btn({
  onClick,
  active,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => {
        e.preventDefault();
        onClick();
      }}
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        "flex size-8 items-center justify-center rounded text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100",
        active && "bg-zinc-800 text-orange",
      )}
    >
      {children}
    </button>
  );
}

export function RichText({
  value,
  onChange,
  placeholder,
}: {
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { rel: "noopener noreferrer", target: "_blank" },
      }),
      Image.configure({ inline: false, HTMLAttributes: { loading: "lazy" } }),
      Placeholder.configure({ placeholder: placeholder || "Write the content…" }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class: "cm-prose min-h-[18rem] max-w-none px-4 py-3.5 text-zinc-100 outline-none",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  // sync when the value changes externally (switching entries)
  useEffect(() => {
    if (!editor) return;
    const incoming = value || "";
    if (incoming !== editor.getHTML()) editor.commands.setContent(incoming, { emitUpdate: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  if (!editor) return <div className="h-72 rounded-md border border-zinc-700 bg-zinc-900" />;

  function setLink(ed: Editor) {
    const prev = ed.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", prev || "https://");
    if (url === null) return;
    if (url === "") {
      ed.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    ed.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  return (
    // Bounded height + internal scrolling: the body scrolls inside the editor
    // instead of pushing the toolbar off-screen, so formatting controls stay
    // reachable no matter how long the content gets.
    <div className="flex max-h-[65vh] flex-col overflow-hidden rounded-md border border-zinc-700 bg-zinc-900 transition-colors focus-within:border-orange/50">
      <div className="sticky top-0 z-10 flex shrink-0 flex-wrap items-center gap-0.5 border-b border-zinc-800 bg-zinc-950 p-1.5">
        <Btn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} label="Bold">
          <Bold className="size-4" />
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} label="Italic">
          <Italic className="size-4" />
        </Btn>
        <span className="mx-1 h-5 w-px bg-zinc-800" />
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })} label="Heading">
          <Heading2 className="size-4" />
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })} label="Subheading">
          <Heading3 className="size-4" />
        </Btn>
        <span className="mx-1 h-5 w-px bg-zinc-800" />
        <Btn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} label="Bulleted list">
          <List className="size-4" />
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} label="Numbered list">
          <ListOrdered className="size-4" />
        </Btn>
        <Btn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} label="Quote">
          <Quote className="size-4" />
        </Btn>
        <Btn onClick={() => setLink(editor)} active={editor.isActive("link")} label="Link">
          <LinkIcon className="size-4" />
        </Btn>
        <Btn
          onClick={() => {
            const url = window.prompt("Image URL");
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          label="Image"
        >
          <ImageIcon className="size-4" />
        </Btn>
        <span className="mx-1 h-5 w-px bg-zinc-800" />
        <Btn onClick={() => editor.chain().focus().undo().run()} label="Undo">
          <Undo2 className="size-4" />
        </Btn>
        <Btn onClick={() => editor.chain().focus().redo().run()} label="Redo">
          <Redo2 className="size-4" />
        </Btn>
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}

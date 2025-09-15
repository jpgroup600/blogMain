import { Media } from "@/types/payload-types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Text leaf node
type SlateText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
};

// All possible block/inline elements your renderer supports
type ElementType =
  | "paragraph"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "blockquote"
  | "ul"
  | "ol"
  | "li"
  | "link"
  | "code-block"
  | "upload"; // keep if you’ll handle later

// Rich-text element node
type SlateElement = {
  type: ElementType;
  url?: string;
  newTab?: boolean;
  alt?: string;
  children: SlateNode[];
  value?: Media;
};

// Union type for any node
export type SlateNode = SlateText | SlateElement;

// Recursive renderer for Slate JSON from Payload CMS
export function renderRichText(nodes: SlateNode[]): React.ReactNode {
  return nodes.map((node, i) => {
    // ✅ Text leaf
    if ("text" in node) {
      let text: React.ReactNode = node.text;

      if (node.bold) text = <strong key={i}>{text}</strong>;
      if (node.italic) text = <em key={i}>{text}</em>;
      if (node.underline) text = <u key={i}>{text}</u>;
      if (node.strikethrough) text = <s key={i}>{text}</s>;
      if (node.code) text = <code key={i}>{text}</code>;

      return text;
    }

    // ✅ Block & inline elements
    switch (node.type) {
      case "paragraph":
        return (
          <p
            className="text-paragraph mb-[26px] text-lg leading-[170%]"
            key={i}
          >
            {renderRichText(node.children)}
          </p>
        );
      case "h1":
        return (
          <h1 className="heading-1" key={i}>
            {renderRichText(node.children)}
          </h1>
        );
      case "h2":
        return (
          <h2 className="heading-2" key={i}>
            {renderRichText(node.children)}
          </h2>
        );
      case "h3":
        return (
          <h3 className="heading-3" key={i}>
            {renderRichText(node.children)}
          </h3>
        );
      case "h4":
        return (
          <h4 className="heading-4" key={i}>
            {renderRichText(node.children)}
          </h4>
        );
      case "h5":
        return (
          <h5 className="heading-5" key={i}>
            {renderRichText(node.children)}
          </h5>
        );
      case "h6":
        return (
          <h6 className="heading-6" key={i}>
            {renderRichText(node.children)}
          </h6>
        );
      case "blockquote":
        return (
          <blockquote
            key={i}
            className="font-display border-accent mb-[26px] ml-4 border-l-4 px-6 py-0.5 text-[26px] leading-[160%] italic"
          >
            {renderRichText(node.children)}
          </blockquote>
        );
      case "ul":
        return (
          <ul key={i} className="mb-[26px] list-disc pl-6">
            {renderRichText(node.children)}
          </ul>
        );
      case "ol":
        return (
          <ol key={i} className="mb-[26px] list-decimal pl-6">
            {renderRichText(node.children)}
          </ol>
        );
      case "li":
        return (
          <li
            className="text-dark dark:text-paragraph text-lg leading-[170%]"
            key={i}
          >
            {renderRichText(node.children)}
          </li>
        );
      case "link":
        return (
          <Link
            key={i}
            href={node.url!}
            target={node.newTab ? "_blank" : "_self"}
            rel="noopener noreferrer"
          >
            {renderRichText(node.children)}
          </Link>
        );
      case "upload":
        return (
          <Image
            width={1366}
            height={689}
            key={i}
            src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${node.value?.url}`}
            alt={node.value?.alt || ""}
            className="my-[26px] w-full rounded-lg object-cover"
          />
        );
      case "code-block":
        return (
          <pre key={i} className="overflow-x-auto bg-gray-100 p-4">
            <code>
              {node.children
                .map((child) => ("text" in child ? child.text : ""))
                .join("")}
            </code>
          </pre>
        );
      default:
        // fallback
        return (
          <p
            className="text-dark dark:text-paragraph mb-[26px] text-lg leading-[170%]"
            key={i}
          >
            {renderRichText(node.children)}
          </p>
        );
    }
  });
}

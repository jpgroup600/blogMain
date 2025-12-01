import { Blog, Media } from "@/types/payload-types";
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
  textColor?: string;
  highlightColor?: string;
  fontSize?: string;
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
  | "upload"
  | "textAlign"
  | "block";

type GridCell = {
  id?: string;
  colSpan?: number;
  media?: Media | string | null;
  text?: SlateNode[];
};

type GridRow = {
  id?: string;
  backgroundColor?: string;
  cells?: GridCell[];
};

type GridFields = {
  columns?: number;
  gap?: string;
  rows?: GridRow[];
};

type GridBlockNode = {
  type: "block";
  blockType: "gridBlock";
  fields?: GridFields;
  children: SlateNode[];
};

// Rich-text element node
type SlateElement =
  | {
      type: Exclude<ElementType, "block">;
      url?: string;
      newTab?: boolean;
      alt?: string;
      children: SlateNode[];
      value?: Media;
      textAlign?: "left" | "center" | "right" | "justify";
    }
  | GridBlockNode;

// Union type for any node
export type SlateNode = SlateText | SlateElement;

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(value, max));

const resolveMediaSrc = (file?: Media | null) => {
  if (!file?.url) return null;
  if (file.url.startsWith("http")) return file.url;
  return `${process.env.NEXT_PUBLIC_PAYLOAD_URL ?? ""}${file.url}`;
};

const renderMedia = (media?: Media | string | null) => {
  if (!media || typeof media === "string") return null;
  const src = resolveMediaSrc(media);
  if (!src) return null;

  if (media.mimeType?.startsWith("video")) {
    return (
      <video className="w-full rounded-xl" controls preload="metadata" src={src}>
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    <Image
      width={1366}
      height={768}
      className="w-full rounded-xl object-cover"
      src={src}
      alt={media.alt || ""}
    />
  );
};

const renderGridBlock = (node: GridBlockNode, key: number) => {
  const columns = clamp(node.fields?.columns ?? 2, 1, 6);
  const gap = node.fields?.gap ?? "1.5rem";
  const rows = node.fields?.rows ?? [];

  return (
    <div key={`grid-${key}`} className="my-10 space-y-8">
      {rows.map((row, rowIndex) => {
        const wrapperStyle: React.CSSProperties | undefined = row.backgroundColor
          ? {
              backgroundColor: row.backgroundColor,
              borderRadius: "1rem",
              padding: "1.5rem",
            }
          : undefined;

        return (
          <div key={row.id ?? `row-${rowIndex}`} style={wrapperStyle}>
            <div
              className="grid"
              style={{
                display: "grid",
                gap,
                gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
              }}
            >
              {(row.cells ?? []).map((cell, cellIndex) => {
                const span = clamp(cell.colSpan ?? 1, 1, columns);
                return (
                  <div
                    key={cell.id ?? `cell-${rowIndex}-${cellIndex}`}
                    className="flex flex-col gap-2"
                    style={{ gridColumn: `span ${span}` }}
                  >
                    {renderMedia(cell.media)}
                    {cell.text?.length ? renderRichText(cell.text) : null}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const toNumber = (value: unknown): number | undefined =>
  typeof value === "number" ? value : undefined;

const toStringValue = (value: unknown): string | undefined =>
  typeof value === "string" ? value : undefined;

const toGridRows = (value: unknown): GridRow[] | undefined =>
  Array.isArray(value) ? (value as GridRow[]) : undefined;

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
      const style: React.CSSProperties = {};
      if (node.textColor) style.color = node.textColor;
      if (node.highlightColor) style.backgroundColor = node.highlightColor;
      if (node.fontSize) style.fontSize = node.fontSize;
      if (Object.keys(style).length) {
        text = (
          <span key={`${i}-style`} style={style}>
            {text}
          </span>
        );
      }

      return text;
    }

    // ✅ Block & inline elements
    switch (node.type) {
      case "paragraph":
        return (
          <p
            className="text-paragraph mb-[26px] text-lg leading-[170%]"
            key={i}
            style={node.textAlign ? { textAlign: node.textAlign } : undefined}
          >
            {renderRichText(node.children)}
          </p>
        );
      case "h1":
        return (
          <h1
            className="heading-1"
            key={i}
            style={node.textAlign ? { textAlign: node.textAlign } : undefined}
          >
            {renderRichText(node.children)}
          </h1>
        );
      case "h2":
        return (
          <h2
            className="heading-2"
            key={i}
            style={node.textAlign ? { textAlign: node.textAlign } : undefined}
          >
            {renderRichText(node.children)}
          </h2>
        );
      case "h3":
        return (
          <h3
            className="heading-3"
            key={i}
            style={node.textAlign ? { textAlign: node.textAlign } : undefined}
          >
            {renderRichText(node.children)}
          </h3>
        );
      case "h4":
        return (
          <h4
            className="heading-4"
            key={i}
            style={node.textAlign ? { textAlign: node.textAlign } : undefined}
          >
            {renderRichText(node.children)}
          </h4>
        );
      case "h5":
        return (
          <h5
            className="heading-5"
            key={i}
            style={node.textAlign ? { textAlign: node.textAlign } : undefined}
          >
            {renderRichText(node.children)}
          </h5>
        );
      case "h6":
        return (
          <h6
            className="heading-6"
            key={i}
            style={node.textAlign ? { textAlign: node.textAlign } : undefined}
          >
            {renderRichText(node.children)}
          </h6>
        );
      case "blockquote":
        return (
          <blockquote
            key={i}
            className="font-display border-accent mb-[26px] ml-4 border-l-4 px-6 py-0.5 text-[26px] leading-[160%] italic"
            style={node.textAlign ? { textAlign: node.textAlign } : undefined}
          >
            {renderRichText(node.children)}
          </blockquote>
        );
      case "ul":
        return (
          <ul
            key={i}
            className="mb-[26px] list-disc pl-6"
            style={node.textAlign ? { textAlign: node.textAlign } : undefined}
          >
            {renderRichText(node.children)}
          </ul>
        );
      case "ol":
        return (
          <ol
            key={i}
            className="mb-[26px] list-decimal pl-6"
            style={node.textAlign ? { textAlign: node.textAlign } : undefined}
          >
            {renderRichText(node.children)}
          </ol>
        );
      case "li":
        return (
          <li
            className="text-dark dark:text-paragraph text-lg leading-[170%]"
            key={i}
            style={node.textAlign ? { textAlign: node.textAlign } : undefined}
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
          <div key={i} className="my-[26px]">
            {renderMedia(node.value)}
          </div>
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
      case "block":
        if ("blockType" in node && node.blockType === "gridBlock") {
          return renderGridBlock(node, i);
        }
        return null;
      case "textAlign":
        return (
          <div key={i} style={{ textAlign: node.textAlign || "left" }}>
            {renderRichText(node.children)}
          </div>
        );
      default: {
        const fallbackNode = node as {
          textAlign?: "left" | "center" | "right" | "justify";
          children?: SlateNode[];
        };
        return (
          <p
            className="text-dark dark:text-paragraph mb-[26px] text-lg leading-[170%]"
            key={i}
            style={
              fallbackNode.textAlign
                ? { textAlign: fallbackNode.textAlign }
                : undefined
            }
          >
            {renderRichText(fallbackNode.children ?? [])}
          </p>
        );
      }
    }
  });
}

export function renderContentBuilder(blocks?: Blog["contentBuilder"]): React.ReactNode {
  if (!blocks || blocks.length === 0) return null;

  return blocks.map((block, index) => {
    if (!block) return null;

    if (block.blockType === "richTextBlock") {
      return (
        <div key={block.id ?? `rt-${index}`} className="space-y-4">
          {renderRichText((block.content ?? []) as SlateNode[])}
        </div>
      );
    }

    if (block.blockType === "gridBlock") {
      const blockRecord = block as Record<string, unknown>;
      return renderGridBlock(
        {
          type: "block",
          blockType: "gridBlock",
          fields: {
            columns: toNumber(blockRecord.columns),
            gap: toStringValue(blockRecord.gap),
            rows: toGridRows(blockRecord.rows),
          },
          children: [],
        },
        10_000 + index,
      );
    }

    return null;
  });
}

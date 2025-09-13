import React from "react";
import Image from "next/image";

// Recursive renderer for Slate JSON from Payload CMS
export function renderRichText(nodes: any[]): React.ReactNode {
  return nodes.map((node, i) => {
    // Leaf node with text formatting
    if (node.text !== undefined) {
      let text: React.ReactNode = node.text;

      if (node.bold) text = <strong key={i}>{text}</strong>;
      if (node.italic) text = <em key={i}>{text}</em>;
      if (node.underline) text = <u key={i}>{text}</u>;
      if (node.strikethrough) text = <s key={i}>{text}</s>;
      if (node.code) text = <code key={i} className="bg-gray-100 px-1 rounded">{text}</code>;

      return text;
    }

    // Block node types
    switch (node.type) {
      case "paragraph":
        return <p key={i} className="mb-4">{renderRichText(node.children)}</p>;
      case "h1":
        return <h1 key={i} className="text-3xl font-bold mb-4">{renderRichText(node.children)}</h1>;
      case "h2":
        return <h2 key={i} className="text-2xl font-bold mb-3">{renderRichText(node.children)}</h2>;
      case "h3":
        return <h3 key={i} className="text-xl font-bold mb-3">{renderRichText(node.children)}</h3>;
      case "h4":
        return <h4 key={i} className="text-lg font-bold mb-2">{renderRichText(node.children)}</h4>;
      case "blockquote":
        return (
          <blockquote key={i} className="my-4 border-l-4 border-gray-300 pl-4 italic">
            {renderRichText(node.children)}
          </blockquote>
        );
      case "ul":
        return <ul key={i} className="list-disc pl-6 mb-4">{renderRichText(node.children)}</ul>;
      case "ol":
        return <ol key={i} className="list-decimal pl-6 mb-4">{renderRichText(node.children)}</ol>;
      case "li":
        return <li key={i} className="mb-1">{renderRichText(node.children)}</li>;
      case "link":
        return (
          <a key={i} href={node.url} target={node.newTab ? "_blank" : "_self"} 
             rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {renderRichText(node.children)}
          </a>
        );
      case "upload":
        // Handle PayloadCMS upload elements (images)
        if (node.value && typeof node.value === 'object') {
          return (
            <div key={i} className="my-6">
              <Image
                src={`${process.env.NEXT_PUBLIC_PAYLOAD_URL}${node.value.url}`}
                alt={node.value.alt || ""}
                width={node.value.width || 800}
                height={node.value.height || 400}
                className="rounded-lg w-full h-auto"
              />
            </div>
          );
        }
        return null;
      default:
        // Handle children if they exist
        if (node.children) {
          return <div key={i}>{renderRichText(node.children)}</div>;
        }
        return null;
    }
  });
}

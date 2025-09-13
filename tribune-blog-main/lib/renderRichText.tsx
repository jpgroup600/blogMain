// import React from "react";

// // Recursive renderer for Slate JSON from Payload CMS
// export function renderRichText(nodes: any[]): React.ReactNode {
//   return nodes.map((node, i) => {
//     // Leaf node with text formatting
//     if (node.text) {
//       let text: React.ReactNode = node.text;

//       if (node.bold) text = <strong key={i}>{text}</strong>;
//       if (node.italic) text = <em key={i}>{text}</em>;
//       if (node.underline) text = <u key={i}>{text}</u>;
//       if (node.strikethrough) text = <s key={i}>{text}</s>;
//       if (node.code) text = <code key={i}>{text}</code>;

//       return text;
//     }

//     // Block node types
//     switch (node.type) {
//       case "paragraph":
//         return <p key={i}>{renderRichText(node.children)}</p>;
//       case "h1":
//         return <h1 key={i}>{renderRichText(node.children)}</h1>;
//       case "h2":
//         return <h2 key={i}>{renderRichText(node.children)}</h2>;
//       case "h3":
//         return <h3 key={i}>{renderRichText(node.children)}</h3>;
//       case "h4":
//         return <h4 key={i}>{renderRichText(node.children)}</h4>;
//       case "blockquote":
//         return (
//           <blockquote
//             key={i}
//             className="my-4 border-l-4 border-gray-300 pl-4 italic"
//           >
//             {renderRichText(node.children)}
//           </blockquote>
//         );
//       case "ul":
//         return (
//           <ul key={i} className="list-disc pl-6">
//             {renderRichText(node.children)}
//           </ul>
//         );
//       case "ol":
//         return (
//           <ol key={i} className="list-decimal pl-6">
//             {renderRichText(node.children)}
//           </ol>
//         );
//       case "li":
//         return <li key={i}>{renderRichText(node.children)}</li>;
//       case "link":
//         return (
//           <a
//             key={i}
//             href={node.url}
//             target={node.newTab ? "_blank" : "_self"}
//             rel="noopener noreferrer"
//           >
//             {renderRichText(node.children)}
//           </a>
//         );
//       case "image":
//         return (
//           <img key={i} src={node.url} alt={node.alt || ""} className="my-4" />
//         );
//       case "code-block":
//         return (
//           <pre key={i} className="overflow-x-auto bg-gray-100 p-4">
//             <code>
//               {node.children.map((child: any) => child.text).join("")}
//             </code>
//           </pre>
//         );
//       default:
//         // Fallback to paragraph if type unknown
//         return <p key={i}>{renderRichText(node.children)}</p>;
//     }
//   });
// }

// // <div>{renderRichText(blog.content)}</div>

import { visit, SKIP } from "unist-util-visit";

// replaces all properties of source with those of target
function replace(source, target) {
  for (const property in source) {
    delete source[property];
  }

  Object.assign(source, target);
}

function extractCaption(node) {
  const alt = node.alt || "";
  
  // Regular expressions to find the blocks
  const captionMatch = alt.match(/\{caption=([^\{\}]+)\}/);
  const creditMatch = alt.match(/\{credit=([^\{\}]+)\}/);
  
  let caption = captionMatch ? captionMatch[1] : null;
  let credit = creditMatch ? creditMatch[1] : null;
  let cleanedAlt = alt;

  // Remove the matches from the alt text
  if (captionMatch) cleanedAlt = cleanedAlt.replace(captionMatch[0], "");
  if (creditMatch) cleanedAlt = cleanedAlt.replace(creditMatch[0], "");

  cleanedAlt = cleanedAlt.trim();

  // If no explicit caption block was found, use the remaining alt text as the caption
  if (!caption && cleanedAlt.length > 0) {
    caption = cleanedAlt;
    cleanedAlt = ""; 
  }

  return {
    caption,
    credit,
    alt: cleanedAlt || caption || "",
  };
}

export function remarkImageCaptions() {
  return function (tree) {
    visit(tree, ["image"], (node) => {
      // Check if this image is already inside a figure (to prevent recursion)
      // Though unist-util-visit doesn't easily show parents without visit-parents,
      // the SKIP return value is more efficient.
      
      const { alt, caption, credit } = extractCaption(node);
      
      // If we have neither a caption nor a credit, don't wrap in figure
      if (!caption && !credit) return;

      const imgElem = { ...node, alt };
      
      const captionChildren = [];
      if (caption) {
        captionChildren.push({ type: "text", value: caption });
      }
      if (caption && credit) {
        captionChildren.push({ type: "text", value: " | " });
      }
      if (credit) {
        captionChildren.push({
          type: "element",
          data: { 
            hName: "span",
            hProperties: { className: ["font-semibold"] }
          },
          children: [{ type: "text", value: `Credit: ${credit}` }],
        });
      }

      const captionElem = {
        type: "element",
        data: { 
          hName: "figcaption",
          hProperties: { className: ["text-sm", "text-base-600", "dark:text-base-500", "mt-2", "text-center", "italic"] }
        },
        children: captionChildren,
      };

      const figureElem = {
        type: "element",
        data: { hName: "figure" },
        children: [imgElem, captionElem],
      };

      replace(node, figureElem);
      
      // CRITICAL: Skip the children of the newly replaced node to prevent infinite recursion
      return SKIP;
    });
  };
}
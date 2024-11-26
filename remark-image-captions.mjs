import { visit } from "unist-util-visit";

// replaces all properties of source with those of target
function replace(source, target) {
  for (const property in source) {
    delete source[property];
  }

  Object.assign(source, target);
}

function extractCaption(node) {
  const captionRegex = /(\{caption=([^\{\}]+)\})/;
  if (!node.alt || !captionRegex.test(node.alt)) {
    return { alt: node.alt };
  }

  const [captionWithControl, _, caption] = captionRegex.exec(node.alt);
  return {
    caption,
    alt: node.alt.replace(captionWithControl, ""),
  };
}

export function remarkImageCaptions() {
  return function (tree) {
    visit(tree, ["image"], (node) => {
      const { alt, caption } = extractCaption(node);
      if (!caption) return;

      const imgElem = { ...node, alt };
      const captionElem = {
        type: "element",
        data: { hName: "figcaption" },
        children: [{ type: "text", value: caption }],
      };
      const figureElem = {
        type: "element",
        data: { hName: "figure" },
        children: [imgElem, captionElem],
      };

      replace(node, figureElem);
    });
  };
}

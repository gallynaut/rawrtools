import path from "node:path";
import fs from "node:fs";

export function getOutputPath(output: string, mdx = false): string {
  const extension = mdx ? "mdx" : "md";
  let filePath = "";
  filePath = output.startsWith("/") ? output : path.join(process.cwd(), output);

  const fileExtension = filePath.split(".").pop();
  if (!fileExtension || fileExtension === filePath) {
    return path.join(filePath, `anchor.${extension}`);
  }

  if (fileExtension !== extension) {
    return `${filePath.slice(0, -1 * fileExtension.length)}${extension}`;
  }

  return filePath;
}

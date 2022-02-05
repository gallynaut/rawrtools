import path from "path";
import fs from "fs";

export function getOutputPath(output: string, mdx = false): string {
  const ext = mdx ? "mdx" : "md";
  let filePath = "";
  if (output.startsWith("/")) {
    filePath = output;
  } else {
    filePath = path.join(process.cwd(), output);
  }

  const fileExt = filePath.split(".").pop();
  if (!fileExt || fileExt === filePath) {
    return path.join(filePath, `anchor.${ext}`);
  }
  if (fileExt !== ext) {
    return `${filePath.slice(0, -1 * fileExt.length)}${ext}`;
  }
  return filePath;
}

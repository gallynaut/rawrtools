import fs from "fs";
import path from "path";
import { AnchorItem } from "./types";

export function insertHyperlinks(
  fileString: string,
  hyperlinks: Record<string, string>
): string {
  let outputString = fileString;

  for (const k in hyperlinks) {
    const regex = new RegExp("^(?!#).*[(?:\\s)](" + k + ")\\b", "gm");
    outputString = outputString.replace(
      regex,
      (match: string, p1: string, offset: number, string: string) => {
        const line = string.slice(offset, offset + match.length);
        const regex = new RegExp("\\b" + p1 + "\\b", "g");
        return line.replace(regex, hyperlinks[k]);
      }
    );
  }
  return outputString;
}

export function writeAccount(
  item: AnchorItem,
  outputPath: string,
  hyperlinks: Record<string, string>
) {
  let outputString = "";
  if (item.type === "enum") {
    outputString += `| Name | Value | Description |\n|--|--|--|\n`;
    item.children?.forEach((value, index) => {
      outputString += `| ${value.name} | ${value?.other?.value ?? "N/A"} | |\n`;
    });
  } else if (item.type === "account") {
    outputString += `| Field | Type | Description |\n|--|--|--|\n`;
    item.children?.forEach((value, index) => {
      outputString += `| ${value.name} |  ${value?.other?.type ?? "N/A"} | |\n`;
    });
  }
  fs.writeFileSync(
    path.join(outputPath, `${item.name}.md`),
    insertHyperlinks(outputString, hyperlinks)
  );
}

export function writeInstructions(
  item: AnchorItem,
  outputPath: string,
  hyperlinks: Record<string, string>
) {
  let outputString = "";
  const accounts = item.children?.filter(
    (children) => children.type === "account"
  );
  const args = item.children?.filter((children) => children.type === "arg");
  if (accounts && accounts.length > 0) {
    outputString += `## Accounts\n|Name|isMut|isSigner|Description|\n|--|--|--|--|\n`;
    accounts.forEach((value) => {
      outputString += `| ${value.name} | ${value.other?.isMut ?? "N/A"} | ${
        value.other?.isSigner ?? "N/A"
      } |  |\n`;
    });
  }
  if (args && args.length > 0) {
    outputString += `## Args\n|Name|Type|Description|\n|--|--|--|\n`;
    args.forEach((value) => {
      outputString += `| ${value.name} | ${value.other?.type ?? "N/A"} |  |\n`;
    });
  }
  fs.writeFileSync(
    path.join(outputPath, `${item.name}.md`),
    insertHyperlinks(outputString, hyperlinks)
  );
}

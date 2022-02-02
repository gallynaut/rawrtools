import fs from "fs";
import path from "path";
import { AnchorItem, AnchorItemCollection } from "./types";

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

export function writeShortToc(outputPath: string) {
  const shortToc = `- [Accounts](/program/accounts/)
- [Instructions](/program/instructions)
- [Events](/program/events)
- [Types](/program/types)
- [Errors](/program/errors)
`;
  fs.writeFileSync(path.join(outputPath, "_short_toc.md"), shortToc);
}

export function writeLongToc(
  idl: AnchorItemCollection,
  outputPath: string,
  hyperlinks: Record<string, string>
) {
  let outputString = "";

  outputString += "- [Accounts](/program/accounts/)\n";
  idl.accounts?.forEach((item) => (outputString += `  - ${item.name}\n`));

  outputString += "- [Instructions](/program/instructions)\n";
  idl.instructions?.forEach((item) => (outputString += `  - ${item.name}\n`));

  outputString += "- [Events](/program/events)\n";
  idl.events?.forEach((item) => (outputString += `  - ${item.name}\n`));

  outputString += "- [Types](/program/types)\n";
  idl.types?.forEach((item) => (outputString += `  - ${item.name}\n`));

  outputString += "- [Errors](/program/errors)\n";

  fs.writeFileSync(
    path.join(outputPath, "_full_toc.md"),
    insertHyperlinks(outputString, hyperlinks)
  );
}

export function writeOverview(
  items: AnchorItem[],
  outputPath: string,
  hyperlinks: Record<string, string>,
  localPath: string,
  label: string,
  sortOrder: number
): void {
  fs.writeFileSync(
    path.join(outputPath, "_category_.json"),
    JSON.stringify({
      label: label,
      position: sortOrder,
    })
  );
  let outputString = `---
sidebar_position: 1
title: Overview
slug: ${localPath}
---

`;
  items.forEach((item) => (outputString += `- ${item.name}\n`));

  fs.writeFileSync(
    path.join(outputPath, "overview.md"),
    insertHyperlinks(outputString, hyperlinks)
  );
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

export function writeInstruction(
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

export function writeEvent(
  item: AnchorItem,
  outputPath: string,
  hyperlinks: Record<string, string>
) {
  let outputString = "";
  outputString += `| Name | Type | Description |\n|--|--|--|\n`;
  item.children?.forEach((value) => {
    outputString += `| ${value.name} | ${value.other?.type ?? "N/A"} | |\n`;
  });

  const fileString = insertHyperlinks(outputString, hyperlinks);
  fs.writeFileSync(path.join(outputPath, `${item.name}.md`), fileString);
}

export function writeType(
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

export function writeErrors(
  items: AnchorItem[],
  outputPath: string,
  sortOrder = 50
) {
  const toErrorString = (error: AnchorItem): string => {
    return `| ${error.other?.code ?? "N/A"} | 0x${
      error.other?.hex ?? "N/A"
    } | ${error.name} | ${error.other?.msg ?? ""} |\n`;
  };
  let outputString = `---
sidebar_position: ${sortOrder}
title: Errors
---

## Anchor Errors

See [@project-serum/anchor/src/error.ts#L53](https://github.com/project-serum/anchor/blob/HEAD/ts/src/error.ts#L53) for a list of built-in Anchor errors.

## Switchboard Errors

| Code | Hex    | Name                             | Message                                                                     |
| ---- | ------ | -------------------------------- | --------------------------------------------------------------------------- |
`;

  items.forEach((value) => (outputString += toErrorString(value)));

  fs.writeFileSync(path.join(outputPath, "errors.md"), outputString);
}

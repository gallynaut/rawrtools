import fs from "node:fs";
import path from "node:path";
import { AnchorItem, AnchorItemCollection } from "../types";

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

export function writeShortToc(outputPath: string, basePath: string) {
  const shortToc = `- [Accounts](${basePath}/accounts/)
- [Instructions](${basePath}/instructions)
- [Events](${basePath}/events)
- [Types](${basePath}/types)
- [Errors](${basePath}/errors)
`;
  fs.writeFileSync(path.join(outputPath, "_short_toc.md"), shortToc);
}

export function writeLongToc(
  idl: AnchorItemCollection,
  outputPath: string,
  basePath: string,
  hyperlinks: Record<string, string>
) {
  let outputString = "";

  outputString += `- [Accounts](${basePath}/accounts/)\n`;
  for (const item of idl.accounts) {
    outputString += `  - ${item.name}\n`;
  }

  outputString += `- [Instructions](${basePath}/instructions)\n`;
  for (const item of idl.instructions) {
    outputString += `  - ${item.name}\n`;
  }

  outputString += `- [Events](${basePath}/events)\n`;
  for (const item of idl.events) {
    outputString += `  - ${item.name}\n`;
  }

  outputString += `- [Types](${basePath}/types)\n`;
  for (const item of idl.types) {
    outputString += `  - ${item.name}\n`;
  }

  outputString += `- [Errors](${basePath}/errors)\n`;

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
  for (const item of items) outputString += `- ${item.name}\n`;

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
  let outputString = `${item.description ?? ""}\n\n`;
  if (item.type === "enum") {
    outputString += "| Name | Value | Description |\n|--|--|--|\n";
    for (const value of item.children) {
      outputString += `| ${value.name} | ${value?.other?.value ?? "N/A"} | ${
        value.description ?? ""
      } |\n`;
    }
  } else if (item.type === "account") {
    outputString += "| Field | Type | Description |\n|--|--|--|\n";
    for (const value of item.children) {
      outputString += `| ${value.name} |  ${value?.other?.type ?? "N/A"} | ${
        value.description ?? ""
      } |\n`;
    }
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
  let outputString = `${item.description ?? ""}\n\n`;
  const accounts = item.children?.filter(
    (children) => children.type === "account"
  );
  const arguments_ = item.children?.filter(
    (children) => children.type === "arg"
  );
  if (accounts && accounts.length > 0) {
    outputString +=
      "## Accounts\n|Name|isMut|isSigner|Description|\n|--|--|--|--|\n";
    for (const value of accounts) {
      outputString += `| ${value.name} | ${value.other?.isMut ?? "N/A"} | ${
        value.other?.isSigner ?? "N/A"
      } | ${value.description ?? ""} |\n`;
    }
  }

  if (arguments_ && arguments_.length > 0) {
    outputString += "## Args\n|Name|Type|Description|\n|--|--|--|\n";
    for (const value of arguments_) {
      outputString += `| ${value.name} | ${value.other?.type ?? "N/A"} | ${
        value.description ?? ""
      }  |\n`;
    }
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
  let outputString = `${item.description ?? ""}\n\n`;
  outputString += "| Name | Type | Description |\n|--|--|--|\n";
  for (const value of item.children) {
    outputString += `| ${value.name} | ${value.other?.type ?? "N/A"} | ${
      value.description ?? ""
    } |\n`;
  }

  const fileString = insertHyperlinks(outputString, hyperlinks);
  fs.writeFileSync(path.join(outputPath, `${item.name}.md`), fileString);
}

export function writeType(
  item: AnchorItem,
  outputPath: string,
  hyperlinks: Record<string, string>
) {
  let outputString = `${item.description ?? ""}\n`;
  if (item.type === "enum") {
    outputString += "| Name | Value | Description |\n|--|--|--|\n";
    for (const value of item.children) {
      outputString += `| ${value.name} | ${value?.other?.value ?? "N/A"} | ${
        value.description ?? ""
      } |\n`;
    }
  } else if (item.type === "account") {
    outputString += "\n| Field | Type | Description |\n|--|--|--|\n";
    for (const value of item.children) {
      outputString += `| ${value.name} |  ${value?.other?.type ?? "N/A"} | ${
        value.description ?? ""
      } |\n`;
    }
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
    return `| ${error.other?.code ?? "N/A"} | ${error.other?.hex ?? "N/A"} | ${
      error.name
    } | ${error.other?.msg ?? ""} |\n`;
  };

  let outputString = `---
sidebar_position: ${sortOrder}
title: Errors
---

## Anchor Errors

See [anchor.so/errors](https://anchor.so/errors) for a list of built-in Anchor errors.

## Switchboard Errors

| Code | Hex    | Name                             | Message                                                                     |
| ---- | ------ | -------------------------------- | --------------------------------------------------------------------------- |
`;

  for (const value of items) outputString += toErrorString(value);

  fs.writeFileSync(path.join(outputPath, "errors.md"), outputString);
}

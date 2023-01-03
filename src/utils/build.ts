import * as anchor from "@project-serum/anchor";
import path from "path";
import fs from "fs";
import {
  AnchorItemCollection,
  AnchorItem,
  DescriptionItemCollection,
} from "../types";
import {
  parseIdl,
  propertiesToArray,
  writeAccount,
  writeErrors,
  writeEvent,
  writeInstruction,
  writeLongToc,
  writeOverview,
  writeShortToc,
  writeType,
} from "./";

const buildHyperlink = (name: string, permalink: string): string => {
  return `[${name}](${permalink})`;
};

// only handles top level links, not anchor links
export function buildHyperlinks(
  idl: AnchorItemCollection
): Record<string, string> {
  const allProperties = propertiesToArray(idl);
  const hyperlinks: Record<string, string> = {};
  for (const item of [
    ...allProperties.accounts,
    ...allProperties.instructions,
    ...allProperties.events,
    ...allProperties.types,
  ]) {
    if ("permalink" in item && item.permalink) {
      hyperlinks[item.name] = buildHyperlink(item.name, item.permalink);
    }
  }
  return hyperlinks;
}

export async function writeMarkdown(
  idl: anchor.Idl,
  basePath: string,
  fsPath: string,
  descriptions?: DescriptionItemCollection
): Promise<void> {
  const parsedIdl = parseIdl(idl, basePath, descriptions);
  const hyperlinks = buildHyperlinks(parsedIdl);

  writeShortToc(fsPath, basePath);
  writeLongToc(parsedIdl, fsPath, basePath, hyperlinks);

  const accountPath = path.join(fsPath, "accounts");
  fs.mkdirSync(accountPath, { recursive: true });
  writeOverview(
    parsedIdl.accounts,
    accountPath,
    hyperlinks,
    `${basePath}/accounts`,
    "Accounts",
    10
  );

  for (const item of parsedIdl.accounts) {
    writeAccount(item, accountPath, hyperlinks);
  }

  const instructionPath = path.join(fsPath, "instructions");
  fs.mkdirSync(instructionPath, { recursive: true });
  writeOverview(
    parsedIdl.instructions,
    instructionPath,
    hyperlinks,
    `${basePath}/instructions`,
    "Instructions",
    20
  );
  for (const item of parsedIdl.instructions) {
    writeInstruction(item, instructionPath, hyperlinks);
  }

  const eventPath = path.join(fsPath, "events");
  fs.mkdirSync(eventPath, { recursive: true });
  writeOverview(
    parsedIdl.events,
    eventPath,
    hyperlinks,
    `${basePath}/events`,
    "Events",
    30
  );
  for (const item of parsedIdl.events) {
    writeEvent(item, eventPath, hyperlinks);
  }

  const typePath = path.join(fsPath, "types");
  fs.mkdirSync(typePath, { recursive: true });
  writeOverview(
    parsedIdl.types,
    typePath,
    hyperlinks,
    `${basePath}/types`,
    "Types",
    40
  );
  for (const item of parsedIdl.types) {
    writeType(item, typePath, hyperlinks);
  }

  writeErrors(parsedIdl.errors, fsPath, 50);
}

import * as anchor from "@project-serum/anchor";
import { parseIdl } from "./parse";
import path from "path";
import fs from "fs";
import { AnchorItemCollection, AnchorItem } from "./types";
import { propertiesToArray } from "./utils/walkStruct";
import { writeAccount, writeEvent, writeInstruction } from "./write";

// only handles top level links, not anchor links
export function buildHyperlinks(
  idl: AnchorItemCollection
): Record<string, string> {
  const buildHyperlink = (name: string, permalink: string): string => {
    return `[${name}](${permalink})`;
  };

  const allProperties = propertiesToArray(idl);
  const hyperlinks: Record<string, string> = {};
  allProperties.accounts.forEach((item: AnchorItem) => {
    if (item.hasOwnProperty("permalink") && item.permalink) {
      hyperlinks[item.name] = buildHyperlink(item.name, item.permalink);
    }
  });
  allProperties.instructions.forEach((item: AnchorItem) => {
    if (item.hasOwnProperty("permalink") && item.permalink) {
      hyperlinks[item.name] = buildHyperlink(item.name, item.permalink);
    }
  });
  allProperties.events.forEach((item: AnchorItem) => {
    if (item.hasOwnProperty("permalink") && item.permalink) {
      hyperlinks[item.name] = buildHyperlink(item.name, item.permalink);
    }
  });
  allProperties.types.forEach((item: AnchorItem) => {
    if (item.hasOwnProperty("permalink") && item.permalink) {
      hyperlinks[item.name] = buildHyperlink(item.name, item.permalink);
    }
  });
  return hyperlinks;
}

export async function buildIdl(
  idl: anchor.Idl,
  basePath = "/program",
  config?: { multi: boolean }
): Promise<void> {
  const defaultPath = path.join(process.cwd(), "anchor");
  const parsedIdl = parseIdl(idl, basePath);
  const hyperlinks = buildHyperlinks(parsedIdl);

  const accountPath = path.join(defaultPath, "accounts");
  fs.mkdirSync(accountPath, { recursive: true });
  for (const item of parsedIdl.accounts) {
    writeAccount(item, accountPath, hyperlinks);
  }

  const instructionPath = path.join(defaultPath, "instructions");
  fs.mkdirSync(instructionPath, { recursive: true });
  for (const item of parsedIdl.instructions) {
    writeInstruction(item, instructionPath, hyperlinks);
  }

  const eventPath = path.join(defaultPath, "events");
  fs.mkdirSync(eventPath, { recursive: true });
  for (const item of parsedIdl.events) {
    writeEvent(item, eventPath, hyperlinks);
  }
}

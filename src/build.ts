import * as anchor from "@project-serum/anchor";
import { parseIdl } from "./parse";
import path from "path";
import fs from "fs";
import { AnchorItemCollection, AnchorItem } from "./types";
import { propertiesToArray } from "./utils/walkStruct";
const _ = require("lodash");

function insertHyperlinks(
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

export function buildHyperlinks(idl: AnchorItemCollection) {
  const allProperties = propertiesToArray(idl);
  const hyperlinks: Record<string, string> = {};
  allProperties.accounts.forEach((item: AnchorItem) => {
    if (item.hasOwnProperty("permalink") && item.permalink) {
      hyperlinks[item.name] = item.permalink;
    }
  });
  allProperties.instructions.forEach((item: AnchorItem) => {
    if (item.hasOwnProperty("permalink") && item.permalink) {
      hyperlinks[item.name] = item.permalink;
    }
  });
  allProperties.events.forEach((item: AnchorItem) => {
    if (item.hasOwnProperty("permalink") && item.permalink) {
      hyperlinks[item.name] = item.permalink;
    }
  });
  allProperties.types.forEach((item: AnchorItem) => {
    if (item.hasOwnProperty("permalink") && item.permalink) {
      hyperlinks[item.name] = item.permalink;
    }
  });
  console.log(hyperlinks);
}

export async function buildIdl(
  idl: anchor.Idl,
  basePath = "/program",
  config?: { multi: boolean }
): Promise<void> {
  const parsedIdl = parseIdl(idl, basePath);
  buildHyperlinks(parsedIdl);
}

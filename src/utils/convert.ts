import * as anchor from "@project-serum/anchor";
import * as idl from "@project-serum/anchor/dist/cjs/idl";
import { getAccounts } from "./account";
import { getErrors } from "./error";
import { getEvents } from "./event";
import { getInstructions } from "./instruction";
import { getTypes } from "./type";

export interface IdlToMarkdownConfig {
  mdx?: boolean;
  multi?: boolean;
  outputPath: string;
  outputFile: string;
}

export async function idl2markdown(
  idl: anchor.Idl,
  config: IdlToMarkdownConfig
): Promise<string> {
  let fileString = `# ${idl.name} (${idl.version})\n`;

  const hyperlinks = getHyperlinks(idl, config.multi);

  fileString += buildTableOfContents(idl);

  const accounts = getAccounts(idl);
  const instructions = getInstructions(idl);
  const errors = getErrors(idl);
  const types = getTypes(idl);
  const events = getEvents(idl);

  fileString +=
    "\n## Accounts\n" +
    printRecord(accounts) +
    "\n## Instructions\n" +
    printRecord(instructions) +
    "\n## Events\n" +
    printRecord(events) +
    "\n## Types\n" +
    printRecord(types) +
    "\n## Errors\n" +
    errors;

  return insertHyperlinks(fileString, hyperlinks);
}

function getNames(param?: { name: string }[]): Set<string> {
  let names: string[] = [];
  if (param) {
    names = param.map((value) => value.name);
  }
  return new Set(names);
}

function printRecord(record: Record<string, string>): string {
  let outputString = "";
  for (const k in record) {
    outputString += record[k];
  }
  return outputString;
}

function buildTableOfContents(idl: anchor.Idl): string {
  let outputString = "";
  outputString += `## Table of Contents\n`;
  outputString += `* [Accounts](#accounts)\n`;
  const accountNames = getNames(idl.accounts);
  for (const name of accountNames) {
    outputString += `    * ${name}\n`;
  }
  outputString += `* [Instructions](#instructions)\n`;
  const instructionNames = getNames(idl.instructions);
  for (const name of instructionNames) {
    outputString += `    * ${name}\n`;
  }
  outputString += `* [Events](#events)\n`;
  const eventNames = getNames(idl.events);
  for (const name of eventNames) {
    outputString += `    * ${name}\n`;
  }
  outputString += `* [Types](#types)\n`;
  const typeNames = getNames(idl.types);
  for (const name of typeNames) {
    outputString += `    * ${name}\n`;
  }
  outputString += `* [Errors](#errors)\n`;
  return outputString;
}

function getHyperlinks(idl: anchor.Idl, multi = false): Record<string, string> {
  const hyperlinks: Record<string, string> = {};

  const accounts = getNames(idl.accounts);
  for (const name of accounts) {
    hyperlinks[name] = `[${name}](#${name.toLowerCase().replace(" ", "")})`;
  }

  const instructions = getNames(idl.instructions);
  for (const name of instructions) {
    hyperlinks[name] = `[${name}](#${name.toLowerCase().replace(" ", "")})`;
  }

  const types = getNames(idl.types);
  for (const name of types) {
    hyperlinks[name] = `[${name}](#${name.toLowerCase().replace(" ", "")})`;
  }

  const events = getNames(idl.events);
  for (const name of events) {
    hyperlinks[name] = `[${name}](#${name.toLowerCase().replace(" ", "")})`;
  }

  return hyperlinks;
}

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

import * as anchor from "@project-serum/anchor";
import * as idl from "@project-serum/anchor/dist/cjs/idl";
import { getAccounts } from "./account";
import { getErrors } from "./error";
import { getEvents } from "./event";
import { getInstructions } from "./instruction";
import { getTypes } from "./type";

export async function idl2markdown(
  idl: anchor.Idl,
  mdx = false
): Promise<string> {
  let fileString = "";

  // Write heading 1
  fileString += `# ${idl.name} (${idl.version})\n`;

  // create table of contents

  fileString += `## Table of Contents\n`;

  fileString += `* [Accounts](#accounts)\n`;
  const accountNames = getNames(idl.accounts);
  for (const name of accountNames) {
    fileString += `    * ${name}\n`;
  }
  fileString += `* [Instructions](#instructions)\n`;
  const instructionNames = getNames(idl.instructions);
  for (const name of instructionNames) {
    fileString += `    * ${name}\n`;
  }
  fileString += `* [Events](#events)\n`;
  const eventNames = getNames(idl.events);
  for (const name of eventNames) {
    fileString += `    * ${name}\n`;
  }
  fileString += `* [Types](#types)\n`;
  const typeNames = getNames(idl.types);
  for (const name of typeNames) {
    fileString += `    * ${name}\n`;
  }
  fileString += `* [Errors](#errors)\n`;

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

  return insertHyperlinks(idl, fileString);
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

function insertHyperlinks(idl: anchor.Idl, fileString: string): string {
  let outputString = fileString;
  function toMarkdownHyperlink(
    match: string,
    p1: string,
    offset: number,
    string: string
  ) {
    const line = string.slice(offset, offset + match.length);
    // dont replace values unless separated by word boundary
    const regex = new RegExp("\\b" + p1 + "\\b", "g");
    return line.replace(regex, `[${p1}](#${p1.toLowerCase()})`);
  }

  const hyperlinks = getHyperlinks(idl);
  for (const k in hyperlinks) {
    const regex = new RegExp("^(?!#).*[(?:\\s)](" + k + ")\\b", "gm");
    outputString = outputString.replace(regex, toMarkdownHyperlink);
  }
  return outputString;
}

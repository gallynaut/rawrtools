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
  const header = `# ${idl.name} (${idl.version})`;

  const accounts = getAccounts(idl);
  const instructions = getInstructions(idl);
  const errors = getErrors(idl);
  const types = getTypes(idl);
  const events = getEvents(idl);

  fileString =
    header +
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
  function replacer(
    match: string,
    p1: string,
    // p2: string,
    // p3: string,
    offset: number,
    string: string
  ) {
    return match.replace(p1, `[${p1}](#${p1.toLowerCase().replace(" ", "")})`);
  }

  const hyperlinks = getHyperlinks(idl);
  for (const k in hyperlinks) {
    const regex = new RegExp("^(?!#).*[(|)(\\s)](" + k + ")", "gm");
    outputString = outputString.replace(regex, replacer);
  }
  return outputString;
}

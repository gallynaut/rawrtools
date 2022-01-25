import * as anchor from "@project-serum/anchor";
import * as idl from "@project-serum/anchor/dist/cjs/idl";
import { getAccounts } from "./account";
import { getErrors } from "./error";
import { getInstructions } from "./instruction";
import { getTypes } from "./type";

export async function idl2markdown(
  idl: anchor.Idl,
  mdx = false
): Promise<string> {
  let fileString = "";

  // Write heading 1
  const header = `# ${idl.name} (${idl.version})`;

  const accountNames = getNames(idl.accounts);
  const instructionNames = getNames(idl.instructions);

  const accounts = getAccounts(idl);
  const instructions = getInstructions(idl);
  const errors = getErrors(idl);
  const types = getTypes(idl);

  return (
    header +
    "\n## Accounts\n" +
    printRecord(accounts) +
    "\n## Instructions\n" +
    printRecord(instructions) +
    "\n## Types\n" +
    printRecord(types) +
    "\n## Errors\n" +
    errors
  );
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

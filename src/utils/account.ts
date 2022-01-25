import * as anchor from "@project-serum/anchor";
import * as idl from "@project-serum/anchor/dist/cjs/idl";
import { getIdlTypeString } from "./type";

export function getAccounts(idl: anchor.Idl): Record<string, string> {
  let accountMap: Record<string, string> = {};
  if (idl.accounts) {
    idl.accounts.forEach(
      (value) => (accountMap[value.name] = toAccountString(value))
    );
  }
  return accountMap;
}

export function toAccountString(account: idl.IdlTypeDef): string {
  let outputString = `### ${account.name}\n`;
  if (account.type.kind === "enum") {
    outputString += `| Name | Value |\n|--|--|\n`;
    account.type.variants.forEach((value, index) => {
      outputString += `| ${value.name} | ${index + 1} |\n`;
    });
    return outputString;
  } else if (account.type.kind === "struct") {
    outputString += `| Field | Type |\n|--|--|\n`;
    account.type.fields.forEach((value, index) => {
      outputString += `| ${value.name} |  ${getIdlTypeString(value.type)} |\n`;
    });
  }
  return outputString;
}

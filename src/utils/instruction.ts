import * as anchor from "@project-serum/anchor";
import * as idl from "@project-serum/anchor/dist/cjs/idl";
import { getIdlTypeString } from "./type";

function getIsMut(account: idl.IdlAccountItem): string {
  if ("isMut" in account) {
    return `${account.isMut}`;
  }
  if (
    "accounts" in account &&
    account.accounts.length > 0 &&
    "isMut" in account.accounts[0]
  ) {
    return `${account.accounts[0].isMut}`;
  }
  return "UNK";
}

function getIsSigner(account: idl.IdlAccountItem): string {
  if ("isSigner" in account) {
    return `${account.isSigner}`;
  }
  if (
    "accounts" in account &&
    account.accounts.length > 0 &&
    "isSigner" in account.accounts[0]
  ) {
    return `${account.accounts[0].isSigner}`;
  }
  return "UNK";
}

export function toInstructionString(instruction: idl.IdlInstruction): string {
  let outputString = `### ${instruction.name}\n`;
  if (instruction.accounts.length > 0) {
    outputString += `#### Accounts\n|Name|isMut|isSigner|\n|--|--|--|\n`;
    instruction.accounts.forEach((value) => {
      outputString += `| ${value.name} | ${getIsMut(value)} | ${getIsSigner(
        value
      )} |\n`;
    });
  }
  if (instruction.args.length > 0) {
    outputString += `#### Args\n|Name|Type|\n|--|--|\n`;
    instruction.args.forEach((value) => {
      outputString += `| ${value.name} | ${getIdlTypeString(value.type)} |\n`;
    });
  }

  return outputString;
}

export function getInstructions(idl: anchor.Idl): Record<string, string> {
  const instructionMap: Record<string, string> = {};
  idl.instructions.forEach((value) => {
    instructionMap[value.name] = toInstructionString(value);
  });
  return instructionMap;
}

import * as anchor from "@project-serum/anchor";
import * as idl from "@project-serum/anchor/dist/cjs/idl";
import { getIdlTypeString } from "./type";

export function getErrors(idl: anchor.Idl): string {
  let outputString = "";
  if (idl.errors) {
    outputString = `| Code | Hex | Name | Message |\n|--|--|--|--|\n`;
    idl.errors.forEach((value) => (outputString += toErrorString(value)));
  }
  return outputString;
}

export function toErrorString(error: idl.IdlErrorCode): string {
  return `| ${error.code} | 0x${error.code.toString(16)} | ${error.name} | ${
    error.msg
  } |\n`;
}

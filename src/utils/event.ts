import * as anchor from "@project-serum/anchor";
import * as idl from "@project-serum/anchor/dist/cjs/idl";
import { getIdlTypeString } from "./type";

export function getEvents(idl: anchor.Idl): Record<string, string> {
  let map: Record<string, string> = {};
  if (idl.events) {
    idl.events.forEach((value) => (map[value.name] = toEventString(value)));
  }
  return map;
}

export function toEventString(event: idl.IdlEvent): string {
  let outputString = "";
  if (event.fields) {
    outputString += `| Name | Type | Description |\n|--|--|--|\n`;
    event.fields.forEach((value) => {
      outputString += `| ${value.name} | ${getIdlTypeString(value.type)} | |\n`;
    });
  }

  return outputString;
}

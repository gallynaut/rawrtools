import * as anchor from "@project-serum/anchor";
import * as idl from "@project-serum/anchor/dist/cjs/idl";

export function getIdlTypeString(type: idl.IdlType): string {
  let typeString = "";
  if (typeof type === "string") {
    typeString = type;
  } else if ("defined" in type) {
    typeString = type.defined;
  } else if ("option" in type) {
    typeString = `Option&lt;${getIdlTypeString(type.option)}&gt;`;
  } else if ("vec" in type) {
    typeString = `${getIdlTypeString(type.vec)}[]`;
  } else if ("array" in type) {
    typeString = `${getIdlTypeString(type.array[0])}[${type.array[1]}]`;
  }
  return typeString;
}

export function getTypes(idl: anchor.Idl): Record<string, string> {
  let map: Record<string, string> = {};
  if (idl.types) {
    idl.types.forEach((value) => {
      const typeString = toTypeString(value);
      if (typeString) {
        map[value.name] = typeString;
      }
    });
  }
  return map;
}

export function toTypeString(type: idl.IdlTypeDef): string {
  let outputString = "";
  if (type.type.kind === "enum") {
    outputString += `| Name | Value | Description |\n|--|--|--|\n`;
    type.type.variants.forEach((value, index) => {
      outputString += `| ${value.name} | ${index + 1} | |\n`;
    });
    return outputString;
  } else if (type.type.kind === "struct") {
    if (type.type.fields.length === 0) {
      return outputString;
    }
    outputString += `| Field | Type | Description |\n|--|--|--|\n`;
    type.type.fields.forEach((value, index) => {
      outputString += `| ${value.name} |  ${getIdlTypeString(
        value.type
      )} | |\n`;
    });
  }
  return outputString;
}

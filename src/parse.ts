import * as anchor from "@project-serum/anchor";
import * as idl from "@project-serum/anchor/dist/cjs/idl";
import path from "path";
import fs from "fs";
import { AnchorItemCollection, AnchorItem } from "./types";

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

export function buildAccountCollection(
  idl: anchor.Idl,
  basePath: string
): AnchorItem[] {
  const accountPath = path.join(basePath, "accounts");
  const accounts: AnchorItem[] | undefined = idl.accounts?.map(
    (account): AnchorItem => {
      if (account.type.kind === "enum") {
        return {
          name: account.name,
          type: "enum",
          permalink: path.join(
            accountPath,
            account.name.toLowerCase().replace(/[^a-zA-Z0-9/]/g, "")
          ),
          children: account.type.variants.map((field, index) => {
            return {
              name: field.name,
              type: "field",
              other: {
                value: `${index + 1}`,
              },
            };
          }),
        };
      }
      return {
        name: account.name,
        type: "account",
        permalink: path.join(
          accountPath,
          account.name.toLowerCase().replace(/[^a-zA-Z0-9/]/g, "")
        ),
        children: account.type.fields.map((field, index) => {
          return {
            name: field.name,
            type: "field",
            other: {
              type: getIdlTypeString(field.type),
            },
          };
        }),
      };
    }
  );
  if (!accounts) {
    return [];
  }
  return accounts;
}

export function buildTypeCollecton(
  idl: anchor.Idl,
  basePath: string
): AnchorItem[] {
  const typesPath = path.join(basePath, "types");
  const types: AnchorItem[] | undefined = idl.types?.map((type): AnchorItem => {
    if (type.type.kind === "enum") {
      return {
        name: type.name,
        type: "enum",
        permalink: path.join(
          typesPath,
          type.name.toLowerCase().replace(/[^a-zA-Z0-9/]/g, "")
        ),
        children: type.type.variants.map((field, index) => {
          return {
            name: field.name,
            type: "field",
            other: {
              value: `${index + 1}`,
            },
          };
        }),
      };
    }
    return {
      name: type.name,
      type: "account",
      permalink: path.join(
        typesPath,
        type.name.toLowerCase().replace(/[^a-zA-Z0-9/]/g, "")
      ),
      children: type.type.fields.map((field, index) => {
        return {
          name: field.name,
          type: "field",
          other: {
            type: getIdlTypeString(field.type),
          },
        };
      }),
    };
  });
  if (!types) {
    return [];
  }
  return types;
}

const getIsMut = (account: idl.IdlAccountItem): string => {
  const isMut =
    "isMut" in account
      ? `${account.isMut}`
      : "accounts" in account &&
        account.accounts.length > 0 &&
        "isMut" in account.accounts[0]
      ? `${account.accounts[0].isMut}`
      : "UNK";
  return isMut;
};

const getMetadataField = (
  account: idl.IdlAccountItem,
  field: "isMut" | "isSigner"
): string => {
  const isMut =
    field in account
      ? // @ts-ignore
        `${account[field]}`
      : "accounts" in account &&
        account.accounts.length > 0 &&
        field in account.accounts[0]
      ? // @ts-ignore
        `${account.accounts[0][field]}`
      : "UNK";
  return isMut;
};

export function buildInstructionCollection(
  idl: anchor.Idl,
  basePath: string
): AnchorItem[] {
  const instructionPath = path.join(basePath, "instructions");
  const instructions: AnchorItem[] | undefined = idl.instructions?.map(
    (instruction): AnchorItem => {
      const accounts = instruction.accounts.map((account): AnchorItem => {
        return {
          name: account.name,
          type: "account",
          other: {
            isMut: getMetadataField(account, "isMut"),
            isSigner: getMetadataField(account, "isSigner"),
          },
        };
      });
      const args = instruction.args.map((arg): AnchorItem => {
        return {
          name: arg.name,
          type: "arg",
          other: {
            type: getIdlTypeString(arg.type),
          },
        };
      });
      return {
        name: instruction.name,
        type: "instruction",
        permalink: path.join(
          instructionPath,
          instruction.name.toLowerCase().replace(/[^a-zA-Z0-9/]/g, "")
        ),
        children: accounts.concat(args),
      };
    }
  );
  if (!instructions) {
    return [];
  }
  return instructions;
}

export function buildEventCollection(
  idl: anchor.Idl,
  basePath: string
): AnchorItem[] {
  const eventPath = path.join(basePath, "events");
  const events: AnchorItem[] | undefined = idl.events?.map(
    (event): AnchorItem => {
      return {
        name: event.name,
        type: "event",
        permalink: path.join(
          eventPath,
          event.name.toLowerCase().replace(/[^a-zA-Z0-9/]/g, "")
        ),
        children: event.fields.map((field, index) => {
          return {
            name: field.name,
            type: "field",
            other: {
              type: getIdlTypeString(field.type),
            },
          };
        }),
      };
    }
  );
  if (!events) {
    return [];
  }
  return events;
}

export function buildErrorCollection(
  idl: anchor.Idl,
  basePath: string
): AnchorItem[] {
  const errorPath = path.join(basePath, "errors");
  const errors: AnchorItem[] | undefined = idl.errors?.map(
    (error): AnchorItem => {
      return {
        name: error.name,
        type: "error",
        permalink: path.join(
          errorPath,
          error.name.toLowerCase().replace(/[^a-zA-Z0-9/]/g, "")
        ),
        other: {
          code: error.code.toString(10),
          hex: `0x${error.code.toString(16)}`,
          msg: error.msg ?? "",
        },
      };
    }
  );
  if (!errors) {
    return [];
  }
  return errors;
}

// flattened map of anchor idl json indexed by type, then name
export function parseIdl(
  idl: anchor.Idl,
  basePath: string
): AnchorItemCollection {
  const accounts = buildAccountCollection(idl, basePath);
  const types = buildTypeCollecton(idl, basePath);
  const instructions = buildInstructionCollection(idl, basePath);
  const events = buildEventCollection(idl, basePath);
  const errors = buildErrorCollection(idl, basePath);

  return {
    accounts: accounts.sort((a, b) => a.name.localeCompare(b.name)),
    types: types.sort((a, b) => a.name.localeCompare(b.name)),
    instructions: instructions.sort((a, b) => a.name.localeCompare(b.name)),
    events: events.sort((a, b) => a.name.localeCompare(b.name)),
    errors,
  };
}

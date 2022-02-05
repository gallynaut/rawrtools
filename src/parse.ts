import * as anchor from "@project-serum/anchor";
import * as idl from "@project-serum/anchor/dist/cjs/idl";
import path from "path";
import fs from "fs";
import {
  AnchorItemCollection,
  AnchorItem,
  DescriptionItemCollection,
  DescriptionItem,
} from "./types";

function getDescription(
  name: string,
  descriptions: DescriptionItem[] = []
): string {
  if (descriptions.length === 0) {
    return "";
  }
  const index = descriptions.findIndex(
    (item) =>
      item.name.toLowerCase() === name.toLowerCase() &&
      item.hasOwnProperty("description")
  );
  if (index === -1) {
    // console.log(`no description for ${name}`);
    return "";
  }

  // console.log(`found description for ${name}`);

  return descriptions[index].description;
}

function getDescriptionList(
  name: string,
  descriptions: DescriptionItem[] = []
): DescriptionItem[] {
  if (descriptions.length === 0) {
    return [];
  }
  const index = descriptions.findIndex(
    (item) =>
      item.name.toLowerCase() === name.toLowerCase() &&
      item.hasOwnProperty("children")
  );
  if (index === -1) {
    return [];
  }

  return descriptions[index].children ?? [];
}

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
  basePath: string,
  descriptions: DescriptionItem[] = []
): AnchorItem[] {
  // console.log(`dsescriptions ${JSON.stringify(descriptions, undefined, 2)}`);
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
          description: getDescription(account.name, descriptions),
          children: account.type.variants.map((field, index) => {
            return {
              name: field.name,
              type: "field",
              description: getDescription(
                field.name,
                getDescriptionList(account.name, descriptions)
              ),
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
        description: getDescription(account.name, descriptions),
        children: account.type.fields.map((field) => {
          return {
            name: field.name,
            type: "field",
            description: getDescription(
              field.name,
              getDescriptionList(account.name, descriptions)
            ),
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
  basePath: string,
  descriptions: DescriptionItem[] = []
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
        description: getDescription(type.name, descriptions),
        children: type.type.variants.map((field, index) => {
          return {
            name: field.name,
            type: "field",
            description: getDescription(
              field.name,
              getDescriptionList(type.name, descriptions)
            ),
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
      description: getDescription(type.name, descriptions),
      children: type.type.fields.map((field, index) => {
        return {
          name: field.name,
          type: "field",
          description: getDescription(
            field.name,
            getDescriptionList(type.name, descriptions)
          ),
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
  basePath: string,
  descriptions: DescriptionItem[] = []
): AnchorItem[] {
  const instructionPath = path.join(basePath, "instructions");
  const instructions: AnchorItem[] | undefined = idl.instructions?.map(
    (instruction): AnchorItem => {
      const accounts = instruction.accounts.map((account): AnchorItem => {
        return {
          name: account.name,
          type: "account",
          description: getDescription(account.name, descriptions),
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
          description: getDescription(arg.name, descriptions),
          other: {
            type: getIdlTypeString(arg.type),
          },
        };
      });
      return {
        name: instruction.name,
        type: "instruction",
        description: getDescription(instruction.name, descriptions),
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
  basePath: string,
  descriptions: DescriptionItem[] = []
): AnchorItem[] {
  const eventPath = path.join(basePath, "events");
  const events: AnchorItem[] | undefined = idl.events?.map(
    (event): AnchorItem => {
      return {
        name: event.name,
        type: "event",
        description: getDescription(event.name, descriptions),
        permalink: path.join(
          eventPath,
          event.name.toLowerCase().replace(/[^a-zA-Z0-9/]/g, "")
        ),
        children: event.fields.map((field, index) => {
          return {
            name: field.name,
            type: "field",
            description: getDescription(
              field.name,
              getDescriptionList(event.name, descriptions)
            ),
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
  basePath: string,
  descriptions: DescriptionItem[] = []
): AnchorItem[] {
  const errorPath = path.join(basePath, "errors");
  const errors: AnchorItem[] | undefined = idl.errors?.map(
    (error): AnchorItem => {
      return {
        name: error.name,
        type: "error",
        description: getDescription(error.name, descriptions),
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
  basePath: string,
  descriptions?: DescriptionItemCollection
): AnchorItemCollection {
  const accounts = buildAccountCollection(
    idl,
    basePath,
    descriptions?.accounts ?? []
  );
  const types = buildTypeCollecton(idl, basePath, descriptions?.types ?? []);
  const instructions = buildInstructionCollection(
    idl,
    basePath,
    descriptions?.instructions ?? []
  );
  const events = buildEventCollection(
    idl,
    basePath,
    descriptions?.events ?? []
  );
  const errors = buildErrorCollection(
    idl,
    basePath,
    descriptions?.errors ?? []
  );

  return {
    accounts: accounts.sort((a, b) => a.name.localeCompare(b.name)),
    types: types.sort((a, b) => a.name.localeCompare(b.name)),
    instructions: instructions.sort((a, b) => a.name.localeCompare(b.name)),
    events: events.sort((a, b) => a.name.localeCompare(b.name)),
    errors,
  };
}

export function parsed2Descriptions(
  parsedIdl: AnchorItemCollection
): DescriptionItemCollection {
  const allowedKeys = [
    "accounts",
    "instructions",
    "events",
    "types",
    "errors",
    "name",
    "children",
    "description",
  ];
  function isNumeric(val) {
    return /^-?\d+$/.test(val);
  }
  const descriptionsString = JSON.stringify(
    parsedIdl,
    (key, value) => {
      if (key && !isNumeric(key) && !allowedKeys.includes(key.toLowerCase())) {
        console.log(`${key} not found`);
        return undefined;
      }

      console.log(`${key} found`);
      return value;
    },
    2
  );
  return JSON.parse(descriptionsString);
}

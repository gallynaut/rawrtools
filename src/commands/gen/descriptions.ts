import { Command, Flags } from "@oclif/core";
import * as anchor from "@project-serum/anchor";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import path from "path";
import fs from "fs";
import { parseIdl } from "../../parse";
import { AnchorItemCollection, DescriptionItemCollection } from "../../types";

export default class GenDescriptionsCommand extends Command {
  static description = "Convert an anchor IDL to a markdown page";

  static examples = [
    `$ anchor2markdown run SW1TCH7qEPTdLsDHRgPuMQjbQxKdH2aBStViMFnt64f --mdx
`,
  ];

  static flags = {
    output: Flags.string({
      description: "where to output the file to",
      required: false,
      default: "anchor.md",
      char: "o",
    }),
  };

  static args = [
    {
      name: "programId",
      description: "Program ID to fetch Anchor IDL for",
      required: true,
    },
  ];

  async run(): Promise<void> {
    const { args, flags } = await this.parse(GenDescriptionsCommand);

    const programId = new PublicKey(args.programId);

    const DEFAULT_KEYPAIR = Keypair.fromSeed(new Uint8Array(32).fill(1));
    const connection = new Connection(clusterApiUrl("mainnet-beta"));
    const provider = new anchor.Provider(
      connection,
      new anchor.Wallet(DEFAULT_KEYPAIR),
      {}
    );

    const idl = await anchor.Program.fetchIdl(programId, provider);
    if (!idl) {
      throw new Error(`failed to fetch IDL for ${programId}`);
    }
    fs.writeFileSync(
      `idl_${programId.toString()}.json`,
      JSON.stringify(idl, undefined, 2)
    );

    const outputPath = path.join(process.cwd(), "descriptions.json");
    const parsedIdl = parseIdl(idl, ".");
    fs.writeFileSync(
      path.join(process.cwd(), "parsed.json"),
      JSON.stringify(parsedIdl, undefined, 2)
    );
    const fileString = parsed2Descriptions(parsedIdl);
    fs.writeFileSync(outputPath, JSON.stringify(fileString, undefined, 2));
  }

  async catch(error: any) {
    console.error(error);
  }
}

function parsed2Descriptions(
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

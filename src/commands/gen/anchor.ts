import { Command, Flags } from "@oclif/core";
import * as anchor from "@project-serum/anchor";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import path from "path";
import fs from "fs";
import { DescriptionItemCollection } from "../../types";
import { parsed2Descriptions, parseIdl, writeMarkdown } from "../../utils";

export default class GenAnchor extends Command {
  static description = "Convert an anchor IDL to a markdown page";

  static examples = [
    `$ anchor2markdown run SW1TCH7qEPTdLsDHRgPuMQjbQxKdH2aBStViMFnt64f --mdx
`,
  ];

  static flags = {
    output: Flags.string({
      description: "where to output the file to",
      required: false,
      default: "./",
      char: "o",
    }),
    descriptions: Flags.string({
      description: "description file to persist changes",
      required: false,
      default: "descriptions.json",
      char: "d",
    }),
    docsPath: Flags.string({
      description:
        "docusaurus docs path where the files will reside. used for hyperlinking",
      required: false,
      default: "/program",
      char: "p",
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
    const { args, flags } = await this.parse(GenAnchor);

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

    const outputPath = path.join(process.cwd(), flags.output);
    fs.mkdirSync(outputPath, { recursive: true });

    const descriptionsPath = path.join(outputPath, flags.descriptions);
    let descriptions: DescriptionItemCollection;
    if (fs.existsSync(descriptionsPath)) {
      descriptions = JSON.parse(fs.readFileSync(descriptionsPath, "utf8"));
    } else {
      const parsedIdl = parseIdl(idl, flags.docsPath);
      descriptions = parsed2Descriptions(parsedIdl);
      fs.writeFileSync(
        descriptionsPath,
        JSON.stringify(descriptions, undefined, 2)
      );
    }

    await writeMarkdown(idl, flags.docsPath, outputPath, descriptions);
  }

  async catch(error: any) {
    console.error(error);
  }
}

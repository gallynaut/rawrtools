import { Command, Flags } from "@oclif/core";
import * as anchor from "@project-serum/anchor";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import path from "node:path";
import fs from "node:fs";
import { DescriptionItemCollection } from "../../types";
import { parsed2Descriptions, parseIdl, writeMarkdown } from "../../utils";

export default class GenAnchor extends Command {
  static description = "Convert an anchor IDL to a markdown page";

  static examples = [
    `$ rawrtools gen:anchor SW1TCH7qEPTdLsDHRgPuMQjbQxKdH2aBStViMFnt64f -o docs/program
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
      char: "d",
    }),
    docsPath: Flags.string({
      description:
        "docusaurus docs path where the files will reside. used for hyperlinking",
      required: false,
      default: "/solana/idl",
      char: "p",
    }),
    idl: Flags.string({
      description: "path to existing IDL",
      exclusive: ["programId"],
    }),
    programId: Flags.string({
      description: "program ID to fetch IDL for",
      exclusive: ["idl"],
    }),
  };

  async run(): Promise<void> {
    const { flags } = await this.parse(GenAnchor);

    let idl: anchor.Idl;
    if (flags.idl) {
      if (!fs.existsSync(flags.idl)) {
        throw new Error(`IDL path does not exist, ${flags.idl}`);
      }
      idl = JSON.parse(fs.readFileSync(flags.idl, "utf-8"));
    } else if (flags.programId) {
      const programId = new PublicKey(flags.programId);
      const DEFAULT_KEYPAIR = Keypair.fromSeed(new Uint8Array(32).fill(1));
      const connection = new Connection(clusterApiUrl("mainnet-beta"));
      const provider = new anchor.AnchorProvider(
        connection,
        new anchor.Wallet(DEFAULT_KEYPAIR),
        {}
      );

      idl = await anchor.Program.fetchIdl(programId, provider);
    } else {
      throw new Error(`--idl or --programId must be provided`);
    }

    const outputPath = path.join(process.cwd(), flags.output);
    fs.mkdirSync(outputPath, { recursive: true });

    let descriptions: DescriptionItemCollection;
    if (
      flags.descriptions &&
      fs.existsSync(path.join(outputPath, flags.descriptions))
    ) {
      descriptions = JSON.parse(
        fs.readFileSync(path.join(outputPath, flags.descriptions), "utf8")
      );
    } else {
      const parsedIdl = parseIdl(idl, flags.docsPath);
      descriptions = parsed2Descriptions(parsedIdl);
      fs.writeFileSync(
        path.join(outputPath, "descriptions.json"),
        JSON.stringify(descriptions, undefined, 2)
      );
    }

    await writeMarkdown(idl, flags.docsPath, outputPath, descriptions);
  }

  async catch(error: any) {
    console.error(error);
  }
}

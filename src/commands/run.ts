import { Command, Flags } from "@oclif/core";
import * as anchor from "@project-serum/anchor";
import { clusterApiUrl, Connection, Keypair, PublicKey } from "@solana/web3.js";
import { idl2markdown } from "../utils/convert";
import path from "path";
import fs from "fs";

export default class RunCommand extends Command {
  static description = "Convert an anchor IDL to a markdown page";

  static examples = [
    `$ anchor2markdown run SW1TCH7qEPTdLsDHRgPuMQjbQxKdH2aBStViMFnt64f --mdx
`,
  ];

  static flags = {
    mdx: Flags.boolean({
      description: "output an mdx file with react components",
      required: false,
      default: false,
      char: "x",
    }),
    multi: Flags.boolean({
      description: "output markdown to separate files for easier import",
      required: false,
      default: false,
      char: "m",
    }),
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
    const { args, flags } = await this.parse(RunCommand);

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
      "switchboardv2_idl.json",
      JSON.stringify(idl, undefined, 2)
    );

    const outputPath = getOutputPath(flags.output, flags.mdx);
    console.log(`output: ${outputPath}`);
    const outputFileString = await idl2markdown(idl, {
      mdx: flags.mdx,
      multi: flags.multi,
      outputPath: path.dirname(outputPath),
      outputFile: path.parse(outputPath).base,
    });
    fs.writeFileSync(outputPath, outputFileString);
  }

  async catch(error: any) {
    console.error(error);
  }
}

function getOutputPath(output: string, mdx = false): string {
  const ext = mdx ? "mdx" : "md";
  let filePath = "";
  if (output.startsWith("/")) {
    filePath = output;
  } else {
    filePath = path.join(process.cwd(), output);
  }

  const fileExt = filePath.split(".").pop();
  if (!fileExt || fileExt === filePath) {
    return path.join(filePath, `anchor.${ext}`);
  }
  if (fileExt !== ext) {
    return `${filePath.slice(0, -1 * fileExt.length)}${ext}`;
  }
  return filePath;
}

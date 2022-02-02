import { PublicKey } from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";

export interface DescriptionItemCollection {
  accounts?: DescriptionItem[];
  errors?: DescriptionItem[];
  instructions?: DescriptionItem[];
  types?: DescriptionItem[];
  events?: DescriptionItem[];
}

export type IDescription = {
  description: string;
  fields?: string;
};

export type DescriptionItem = IDescription;

export type AnchorType =
  | "account"
  | "arg"
  | "instruction"
  | "event"
  | "error"
  | "type"
  | "field"
  | "enum";

export type AnchorItem = {
  name: string;
  type: AnchorType;
  description?: string;
  item?: string;
  permalink?: string;
  children?: AnchorItem[];
  other?: { [id: string]: string };
};

export type AnchorItemCollection = {
  accounts: AnchorItem[];
  errors: AnchorItem[];
  instructions: AnchorItem[];
  types: AnchorItem[];
  events: AnchorItem[];
};

export type AnchorMap = Record<string, AnchorItem>;

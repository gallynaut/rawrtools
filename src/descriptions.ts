import {
  AnchorItemCollection,
  DescriptionItemCollection,
  AnchorItem,
} from "./types";
import fs from "fs";
import { JSONPath } from "jsonpath-plus";

export function readDescriptionsFs(dPath: string): DescriptionItemCollection {
  return JSON.parse(fs.readFileSync(dPath, "utf8"));
}

// export function updateDescriptions(
//   items: AnchorItem[],
//   descriptions: DescriptionItemCollection,
//   path: string
// ): AnchorItem[] {
//   const updatedItems: AnchorItem[] = items.map((item) => {
//     const updatedItem: AnchorItem = {
//       ...item,
//       description: JSONPath({
//         path: `${path}.`,
//         json: descriptions,
//       }),
//     };
//   });
//   return updatedItems;
// }

// export function updateDescription(
//   item: AnchorItem,
//   descriptions: DescriptionItemCollection,
//   path: string
// ): AnchorItem {
//   const updatedItem: AnchorItem = {
//     ...item,
//     description: JSONPath({ path: `${path}.description`, json: descriptions }),
//     fields:
//       "fields" in item
//         ? updateDescriptions(item.fields, descriptions, path)
//         : undefined,
//   };
// }

export function zipDescriptions(
  anchor: AnchorItemCollection,
  descriptions: DescriptionItemCollection
): AnchorItemCollection {
  let anchorWithDescriptions: AnchorItemCollection = { ...anchor };
  // accounts
  if (descriptions.accounts) {
    for (const [index, row] of descriptions.accounts.entries()) {
    }
  }

  return anchor;
}

var _ = require("lodash");

// export function propertiesToArray(obj) {
//   const isObject = (val) =>
//     val && typeof val === "object" && !Array.isArray(val);

//   const addDelimiter = (a, b) => (a ? `${a}.${b}` : b);

//   const paths = (obj = {}, head = "") => {
//     return Object.entries(obj).reduce((product, [key, value]) => {
//       let fullPath = addDelimiter(head, key);
//       return isObject(value)
//         ? product.concat(paths(value, fullPath))
//         : product.concat(fullPath);
//     }, []);
//   };

//   return paths(obj);
// }

// export function propertiesToArray(obj) {
//   const result = _.flatMap(obj, ({ name, tags }) =>
//     _.map(tags, (tag) => ({ name, ...tag }))
//   );
//   return result;
// }

export function propertiesToArray(obj) {
  const member = { ...obj }; // copy
  delete member.children;

  if (!obj.children || !obj.children.length) {
    return member; // return copied
  }
  return [member, _.flatMapDeep(obj.children, getMembers)]; // return copied, but pass original to flatMapDeep
}

// export function propertiesToArray(obj) {
//   "use-strict";
//   var allkeys,
//     curKey = "[",
//     len = 0,
//     i = -1,
//     entryK;

//   function formatKeys(entries) {
//     entryK = entries.length;
//     len += entries.length;
//     while (entryK--)
//       entries[entryK][0] = curKey + JSON.stringify(entries[entryK][0]) + "]";
//     return entries;
//   }
//   allkeys = formatKeys(Object.entries(obj));

//   while (++i !== len)
//     if (typeof allkeys[i][1] === "object" && allkeys[i][1] !== null) {
//       curKey = allkeys[i][0] + "[";
//       Array.prototype.push.apply(
//         allkeys,
//         formatKeys(Object.entries(allkeys[i][1]))
//       );
//     }
//   return allkeys;
// }

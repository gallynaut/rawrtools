var _ = require("lodash");

export function propertiesToArray(obj) {
  const member = { ...obj }; // copy
  delete member.children;

  if (!obj.children || !obj.children.length) {
    return member; // return copied
  }
  return [member, _.flatMapDeep(obj.children, getMembers)]; // return copied, but pass original to flatMapDeep
}

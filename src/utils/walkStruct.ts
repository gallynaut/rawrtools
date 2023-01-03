import _ from "lodash";

const getMembers = (members) => {
  let children = [];

  return members
    .map((m) => {
      if (m.children && m.children.length > 0) {
        children = [...children, ...m.children];
      }
      return m;
    })
    .concat(children.length > 0 ? getMembers(children) : children);
};

export function propertiesToArray(object) {
  const member = { ...object }; // copy
  delete member.children;

  if (!object.children || object.children.length === 0) {
    return member; // return copied
  }
  return [member, _.flatMapDeep(object.children, getMembers)]; // return copied, but pass original to flatMapDeep
}

export const isImage = (r: string) => /!\[[\s\S]*?\]\([\s\S]*?\)/g.test(r);
export const isHead = (r: string) => /^(#+)\s(.*)/.test(r);
export const isComment = (r: string) => "// ".includes(r);
export const isOL = (r: string) => /^\d+. /.test(r);
export const isUL = (r: string) => /^[+-] /.test(r);
export const isProp = (r: string) =>
  (r.startsWith("'") && r.endsWith("'")) ||
  (r.startsWith('"') && r.endsWith('"'));
export const isUpper = (r: string) => /^[A-Z]+?/.test(r);
export const isNumber = (r: string) => /\d+/.test(r);
export const split = (arr: string[]) =>
  arr.reduce(
    (acc, cur) => {
      if ("[]().,{}><+=- ".includes(cur)) {
        return [...acc, cur, ""];
      } else {
        return [...acc.slice(0, -1), acc.slice(-1)[0] + cur];
      }
    },
    [""]
  );

export const isImage = (r) => /!\[[\s\S]*?\]\([\s\S]*?\)/g.test(r);
export const isHead = (r) => /^(#+)\s(.*)/.test(r);
export const isComment = (r) => "// ".includes(r);
export const isOL = (r) => /^\d+. /.test(r);
export const isUL = (r) => /^[+-] /.test(r);
export const isProp = (r) => (r.startsWith("'") && r.endsWith("'")) ||
    (r.startsWith('"') && r.endsWith('"'));
export const isUpper = (r) => /^[A-Z]+?/.test(r);
export const isNumber = (r) => /\d+/.test(r);
export const split = (arr) => arr.reduce((acc, cur) => {
    if ("[]().,{}><+=- ".includes(cur)) {
        return [...acc, cur, ""];
    }
    else {
        return [...acc.slice(0, -1), acc.slice(-1)[0] + cur];
    }
}, [""]);
//# sourceMappingURL=utils.js.map
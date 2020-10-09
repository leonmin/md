import { SUPPORTS, LT, BT, ITEM, LINE } from "./config";
import { split, isComment, isProp, isUpper, isNumber } from "./utils";
import { fill, fillSpace } from "./format";
// step
// 1. split code and annotation
// 2. get tab(space, indent)
// styling
// 3. < less then
// 4. > greater than
// 5. . chain point or decimal point
const highlight = (line = "", language = "javascript") => {
  const keywords = SUPPORTS[language].keywords;
  const custom = SUPPORTS[language].custom;
  let code = line;
  let codes: string[] = [];
  let comment = "";
  let items = "";
  // split code and annotation
  if (isComment(line)) {
    const cc = line.split("// ");
    code = cc[0];
    comment = "// " + cc[1];
  }
  if (code) {
    codes = split(code.split(""));
  }
  // code highlighting
  if (codes && codes.length > 0) {
    items = codes.reduce((acc, cur) => {
      if (cur === "") {
        return acc + cur;
      } else if (cur === " ") {
        return acc + fillSpace();
      } else if (cur === "<") {
        return acc + fill(ITEM, LT);
      } else if (cur === "{") {
        return acc + fill(ITEM, BT);
      } else if (keywords && keywords.includes(cur)) {
        return acc + fill(ITEM, cur, "k"); // keywords
      } else if (cur === ".") {
        return acc + fill(ITEM, cur, "d"); // dot
      } else if ("[](),>+=-".includes(cur)) {
        return acc + fill(ITEM, cur, "s"); // symbol
      } else if (custom && custom.includes(cur)) {
        return acc + fill(ITEM, cur, "c"); // custom keywords
      } else if (isProp(cur)) {
        return acc + fill(ITEM, cur, "p"); // property
      } else if (isUpper(cur)) {
        return acc + fill(ITEM, cur, "u"); // uppercase
      } else if (isNumber(cur)) {
        return acc + fill(ITEM, String(cur), "n"); // number
      } else {
        return acc + fill(ITEM, cur, "x"); // default
        // return acc + cur
      }
    }, "");
  }
  if (comment && comment.length > 0) {
    comment = comment.replace(/{/g, BT);
    comment = comment.replace(/</g, LT);
    items += fill(ITEM, comment, "a"); // annotation
  }
  // return fill(LINE, items, 'l') // line
  return fill(LINE, items); // line
};
export default highlight;

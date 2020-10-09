// import fs from "fs";
// import path from "path";
import { isHead, isImage, isOL, isUL } from "./utils";
import { OL, UL, OLREG, ULREG, LT, BT, CODE, SUPPORTS, ITEM, LINE, } from "./config";
import { fill, codeStart, codeEnd, fillImg, fillSpace } from "./format";
import highlight from "./highlight";
let language = ""; // 代码块语言
let codeing = false; // 代码块
const languages = Object.keys(SUPPORTS);
const languagesLine = Array.from(languages, (x) => CODE + x); // code block: ```javascript
const reduceLines = (lines) => {
    if (lines && lines.length > 0) {
        return lines.reduce((acc, line) => {
            if (line) {
                return acc + reduceLine(line);
            }
            else {
                // 空行
                return acc;
            }
        }, "");
    }
    return String(lines);
};
const reduceLine = (line = "") => {
    if (line && languagesLine.includes(line.trim())) {
        language = line.split(CODE)[1];
        codeing = true;
        return codeStart();
    }
    else if (line && line.trim() === CODE) {
        codeing = false;
        return codeEnd();
    }
    else {
        if (codeing) {
            return highlight(line, language);
        }
        else {
            if (line.includes("{")) {
                line = line.replace(/{/g, BT);
            }
            if (line.includes("<")) {
                line = line.replace(/</g, LT);
            }
            if (isImage(line)) {
                // 图片 ![image](https://example.com){:"class"}
                const alt = line.replace("]", "[").split("[")[1];
                const src = line.replace(")", "(").split("(")[1];
                const cls = line.split('"')[1] || ""; // class
                return fillImg("p", src, "li", cls, "", "", alt);
            }
            else if (isHead(line)) {
                // 标题
                const arr = line.split("");
                const n = arr.reduce((a, c) => {
                    return a + (c === "#" ? 1 : 0);
                }, 0);
                const t = line.split("# ")[1];
                return fill("h" + n, t);
            }
            else if (line.includes(CODE)) {
                // 代码
                const x = line.split(CODE);
                const y = x.reduce((a, c, idx) => {
                    if (idx % 2 === 0) {
                        return a + c;
                    }
                    else {
                        // return a + fill(ITEM, c, 'h')
                        return a + fill("code", c);
                    }
                });
                return fill(LINE, y);
            }
            else if (line.includes("**")) {
                // 强调
                const x = line.split("**");
                const y = x.reduce((a, c, idx) => {
                    if (idx % 2 === 0) {
                        return a + c;
                    }
                    else {
                        // return a + fill(ITEM, c, 'b')
                        return a + fill("em", c);
                    }
                });
                return fill(LINE, y);
            }
            else if (isOL(line)) {
                // 有序列表
                const x = line.replace(OLREG, OL);
                const y = x.split(OL)[1];
                const n = line.split(". ")[0];
                const z = fillSpace() + fillSpace() + fill(ITEM, n + ". ") + fill(ITEM, y);
                return fill(LINE, z, "ol");
            }
            else if (isUL(line)) {
                // 无序列表
                const x = line.replace(ULREG, UL);
                const y = x.split(UL)[1];
                const z = fillSpace() + fillSpace() + fill(ITEM, "• ") + fill(ITEM, y);
                return fill(LINE, z, "ul");
            }
            else {
                return fill(LINE, line);
            }
        }
    }
};
export const parse = (data) => {
    // const data = fs.readFileSync(path.resolve(__dirname, "../test/index.md"));
    // const str = data.toString();
    // const lines = str.split("\n");
    if (!data)
        return "";
    const lines = data.split("\n");
    return reduceLines(lines);
};
export const parseBuffer = (data) => {
    if (!data)
        return "";
    const buffer = Buffer.from(data);
    const str = buffer.toString();
    const lines = str.split("\n");
    return reduceLines(lines);
};
//# sourceMappingURL=index.js.map
export const fill = (tag = "span", data = "", cls = "", sty = "", src = "", alt = "") => "<" +
    tag +
    (cls ? fillAlt("class", cls) : "") +
    (sty ? fillAlt("style", sty) : "") +
    (src ? fillAlt("src", src) : "") +
    (alt ? fillAlt("alt", alt) : "") +
    ">" +
    data +
    "</" +
    tag +
    ">";
export const fillDef = (tag = "span", data) => fill(tag, data, tag);
export const fillAlt = (key = "key", val = "val") => " " + key + '="' + val + '"';
export const fillSpace = (tag = "span", cls = "", sty = "") => fill(tag, "&nbsp", cls, sty);
export const fillImg = (tag = "p", src = "", cls1 = "", cls2 = "", sty1 = "", sty2 = "", alt = "") => {
    const img = fill("img", "", cls2, sty2, src, alt);
    return fill(tag, img, cls1, sty1);
};
export const codeStart = (tag1 = "pre", tag2 = "code", cls1 = "", cls2 = "", sty1 = "", sty2 = "") => "<" +
    tag1 +
    (cls1 ? fillAlt("class", cls1) : "") +
    (sty1 ? fillAlt("style", sty1) : "") +
    "><" +
    tag2 +
    (cls2 ? fillAlt("class", cls2) : "") +
    (sty2 ? fillAlt("style", sty2) : "") +
    ">";
export const codeEnd = (tag1 = "pre", tag2 = "code") => "</" + tag2 + "></" + tag1 + ">";
//# sourceMappingURL=format.js.map
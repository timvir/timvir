import dot from "dot";

export function template(s: string) {
  return dot.template(s, { ...dot.templateSettings, strip: false });
}

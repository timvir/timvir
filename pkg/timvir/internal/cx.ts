export function cx(...args: Array<null | undefined | boolean | string>) {
  let str = "";

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (typeof arg === "string") {
      str += (str && " ") + arg;
    }
  }

  return str;
}

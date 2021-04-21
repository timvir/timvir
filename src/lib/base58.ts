const bytesToHex = (() => {
  const s = Array.from({ length: 256 }).map((_, i) => i.toString(16).padStart(2, "0"));
  return (uint8a: Uint8Array) => [...uint8a].map((o) => s[o]).join("");
})();

const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

export function encode(input: string): string {
  if (input.length === 0) {
    return "";
  }

  // string -> Uint8Array
  const source = new TextEncoder().encode(input);

  // Uint8Array -> BigInt (Big Endian)
  let x = BigInt("0x" + bytesToHex(source));

  const output = [];
  while (x > 0n) {
    const mod = x % 58n;
    x = x / 58n;
    output.push(alphabet[Number(mod)]);
  }

  for (let i = 0; source[i] === 0; i++) {
    output.push(alphabet[0]);
  }

  return output.reverse().join("");
}

export function decode(output: string) {
  if (output.length === 0) {
    return "";
  }

  const bytes = [0];
  const letters = alphabet;
  for (const char of output) {
    const value = letters.indexOf(char);
    if (value === undefined) {
      throw new Error(`base58.decode received invalid input. Character '${char}' is not in the base58 alphabet.`);
    }
    for (let j = 0; j < bytes.length; j++) {
      bytes[j] *= 58;
    }
    bytes[0] += value;
    let carry = 0;
    for (let j = 0; j < bytes.length; j++) {
      bytes[j] += carry;
      carry = bytes[j] >> 8;
      bytes[j] &= 0xff;
    }
    while (carry > 0) {
      bytes.push(carry & 0xff);
      carry >>= 8;
    }
  }
  for (let i = 0; i < output.length && output[i] === "1"; i++) {
    bytes.push(0);
  }

  return new TextDecoder().decode(new Uint8Array(bytes.reverse()));
}

import chroma from "chroma-js";

export function opacity(contrast: number, background: string, text: string) {
  if (chroma.contrast(background, text) < contrast) {
    return undefined;
  }

  const go = (min: number, max: number): undefined | number => {
    if (min > max) {
      return undefined;
    }

    if (max - min < 1 / 1e4) {
      return min;
    }

    const mid = (min + max) / 2;
    const c = chroma.contrast(background, blendColor(background, text, mid));

    if (c >= contrast) {
      return go(min, mid);
    } else {
      return go(mid, max);
    }
  };

  return go(0, 1);
}

export function blendColor(c1: string, c2: string, a: number) {
  const [r1, g1, b1] = chroma(c1).rgb();
  const [r2, g2, b2] = chroma(c2).rgb();

  const a1 = 1 - a;
  const a2 = a;

  return chroma(r1 * a1 + r2 * a2, g1 * a1 + g2 * a2, b1 * a1 + b2 * a2);
}

export function op(background: string, text: string) {
  const large = opacity(3, background, text);
  const normal = opacity(4.5, background, text);

  const fmt = (n: undefined | number) => (n === undefined ? "–" : `${Math.round(n * 100)}%`);

  // console.log(background, text, large, normal)

  if (large === undefined && normal === undefined) {
    return "";
  } else {
    return `${fmt(large)} / ${fmt(normal)}`;
  }
}

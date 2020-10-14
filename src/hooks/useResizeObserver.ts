import * as React from "react";

export function useResizeObserver(callback: ResizeObserverCallback) {
  const [ref] = React.useState(() => ({ ro: mkResizeObserver((...args) => ref.callback(...args)), callback }));
  ref.callback = callback;
  return ref.ro;
}

export function useResizeObserverRef<T extends Element>(callback: ResizeObserverCallback) {
  const ro = useResizeObserver(callback);
  return React.useCallback((el: null | T) => (el ? ro.observe(el) : ro.disconnect()), [ro]);
}

export function useResizeObserverEntries<T extends Element>() {
  const [entries, setEntries] = React.useState<ReadonlyArray<ResizeObserverEntry>>([]);
  return [useResizeObserverRef<T>(setEntries), entries] as const;
}

export function useResizeObserverEntry<T extends Element>() {
  const [ref, entries] = useResizeObserverEntries<T>();
  return [ref, last(entries)] as const;
}

const last = <T>(a: ReadonlyArray<T>): undefined | T => a[a.length - 1];

interface ResizeObserver {
  observe(target: Element): void;
  unobserve(target: Element): void;
  disconnect(): void;
}

interface ResizeObserverSize {
  inlineSize: number;
  blockSize: number;
}

interface ResizeObserverEntry {
  readonly target: Element;
  readonly contentRect: DOMRectReadOnly;
  readonly borderBoxSize: ResizeObserverSize;
  readonly contentBoxSize: ResizeObserverSize;
}

type ResizeObserverCallback = (entries: ReadonlyArray<ResizeObserverEntry>, observer: ResizeObserver) => void;

declare const ResizeObserver: {
  prototype: ResizeObserver;
  new (callback: ResizeObserverCallback): ResizeObserver;
};

const nopResizeObserver: ResizeObserver = {
  observe() {},
  unobserve() {},
  disconnect() {},
};

const mkResizeObserver = (callback: ResizeObserverCallback) =>
  typeof ResizeObserver === "undefined" ? nopResizeObserver : new ResizeObserver(callback);

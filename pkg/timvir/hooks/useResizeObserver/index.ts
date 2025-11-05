import * as React from "react";

/**
 * Allocate a new 'ResizeObserver'. The callback is passed to the 'ResizeObserver' constructor.
 * You don't need to memoize the callback, you can use an inline function.
 *
 * You are responsible yourself for observing / unobserving targets.
 *
 * > const ro = useResizeObserver(entries => { console.log(entries); });
 * > React.useEffect(() => { ro.observe(document.body) }, [])
 */
export function useResizeObserver(callback: ResizeObserverCallback): ResizeObserver {
  const [ref] = React.useState(() => ({ ro: mkResizeObserver((...args) => ref.callback(...args)), callback }));
  ref.callback = callback;
  return ref.ro;
}

/**
 * A convenience wrapper around 'useResizeObserver' which returns a React Ref that you can
 * attach to elements. It is still your responsibility to do something sensible in the
 * callback.
 *
 * > const ref = useResizeObserverRef(entries => { console.log(entries); });
 * > <div ref={ref} />
 */
export function useResizeObserverRef<T extends Element>(callback: ResizeObserverCallback) {
  const ro = useResizeObserver(callback);
  return React.useCallback((el: null | T) => (el ? ro.observe(el) : ro.disconnect()), [ro]);
}

/**
 * This hook returns a ref (that you can attach to elements) and a a list of all resize observer
 * entries that were delivered during the most recent tick.
 *
 * > const [ref, entries] = useResizeObserverEntries()
 * > <div ref={ref}>{entries.length}</div>
 */
export function useResizeObserverEntries<T extends Element>() {
  const [entries, setEntries] = React.useState<ReadonlyArray<ResizeObserverEntry>>([]);
  return [useResizeObserverRef<T>(setEntries), entries] as const;
}

/**
 * A wrapper around 'useResizeObserverEntries' which only provides the last ResizeObserverEntry.
 * Useful when observing a single element.
 *
 * > const [ref, entry] = useResizeObserverEntry()
 * > <div ref={ref}>{entry?.contentRect.width}</div>
 */
export function useResizeObserverEntry<T extends Element>() {
  const [ref, entries] = useResizeObserverEntries<T>();
  return [ref, last(entries)] as const;
}

const last = <T>(a: ReadonlyArray<T>): undefined | T => a[a.length - 1];

const nopResizeObserver: ResizeObserver = {
  observe() {},
  unobserve() {},
  disconnect() {},
};

const mkResizeObserver = (callback: ResizeObserverCallback) =>
  typeof ResizeObserver === "undefined" ? nopResizeObserver : new ResizeObserver(callback);

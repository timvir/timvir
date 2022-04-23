export type Message = Invoke<unknown> | Signal<unknown>;

export interface Invoke<T> {
  type: "INVOKE";

  path: string;
  interface: string;
  member: string;
  body: T;
}

export interface Signal<T> {
  type: "SIGNAL";

  path: string;
  interface: string;
  member: string;
  body: T;
}

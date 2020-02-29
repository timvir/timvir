export type Size = "responsive" | number;

export interface Instance {
  size: Size;
  Component: React.ReactType;
}

export interface Descriptor {
  name: string;
  instances: Instance[];
}

type Size = "responsive" | number;

interface Instance {
  size: Size;
  Component: React.ElementType;
}

export interface Descriptor {
  name: string;
  instances: Instance[];
}

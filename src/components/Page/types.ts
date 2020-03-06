export interface Node {
  readonly label: string;
  readonly path?: string;
  readonly children?: ReadonlyArray<Node>;
}

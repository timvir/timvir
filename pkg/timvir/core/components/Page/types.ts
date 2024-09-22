import * as React from "react";

export interface Node {
  readonly icon?: React.ReactElement;
  readonly label: string;
  readonly path?: string;
  readonly children?: readonly Node[];
}

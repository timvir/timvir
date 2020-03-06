#!/usr/bin/env bash
set -euo pipefail

>index.ts

for BLOCK in Code Exhibit Grid Swatch; do
  mkdir -p $PWD/$BLOCK
  echo "export * from \"../../../components/$BLOCK\";" > $PWD/$BLOCK/index.ts

  mkdir -p $PWD/../../../packages/blocks/$BLOCK
  echo "export * from \"../packages/blocks/$BLOCK\";" > $PWD/../../../packages/blocks/$BLOCK/index.js

  echo "export * from \"./$BLOCK\";" >> index.ts
done

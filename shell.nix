let
  pkgs = import <nixpkgs> {};

in pkgs.mkShell {
  buildInputs = [
    pkgs.jq
    pkgs.nodejs-13_x
    pkgs.darwin.apple_sdk.frameworks.CoreServices
  ];
}

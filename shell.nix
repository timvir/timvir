let
  pkgs = import <nixpkgs> {};

in pkgs.mkShell {
  buildInputs = [
    pkgs.jq
    pkgs.nodejs-16_x
    pkgs.xcbuild
    pkgs.darwin.apple_sdk.frameworks.CoreServices
  ];
}

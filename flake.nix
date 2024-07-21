{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem
      (system:
        let
          pkgs = import nixpkgs {
            inherit system;
          };

          banner = pkgs.writeShellScriptBin "banner" ''
            clear

            ${pkgs.figlet}/bin/figlet timvir
            echo "     [timˈvir] n. book"
          '';

          nodejs = pkgs.nodejs_20;

          tools = {
            dev = pkgs.writeShellScriptBin "dev" ''
              clear
              ./node_modules/.bin/next dev
            '';
          };
        in {
          devShells.default = pkgs.mkShell {
            buildInputs = [
              nodejs
              nodejs.pkgs.pnpm

              pkgs.jq

              tools.dev
            ];

            shellHook = ''
              ${banner}/bin/banner
              export PATH=$PWD/node_modules/.bin:$PATH
            '';
          };

          devShells.workflow = pkgs.mkShell {
            buildInputs = [
              nodejs
              nodejs.pkgs.pnpm
            ];

            shellHook = ''
              pnpm install >/dev/null 2>&1
              export PATH=$PWD/node_modules/.bin:$PATH
            '';
          };
        }
      );
}

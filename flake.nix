{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

    flake-utils.url = "github:numtide/flake-utils";

    nix-develop.url = "github:nicknovitski/nix-develop";
    nix-develop.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = { nixpkgs, flake-utils, nix-develop, ... }:
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

          tools = {
            dev = pkgs.writeShellScriptBin "dev" ''
              clear
              ./node_modules/.bin/next dev
            '';
          };
        in {
          packages.nix-develop = nix-develop.packages.${system}.default;

          devShells.default = pkgs.mkShell {
            buildInputs = [
              pkgs.nodejs
              pkgs.pnpm
              pkgs.biome

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
              pkgs.nodejs
              pkgs.pnpm
              pkgs.biome
            ];

            shellHook = ''
              pnpm install >/dev/null 2>&1
              export PATH=$PWD/node_modules/.bin:$PATH
            '';
          };
        }
      );
}

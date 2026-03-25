{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

    flake-utils.url = "github:numtide/flake-utils";

    nix-develop.url = "github:nicknovitski/nix-develop";
    nix-develop.inputs.nixpkgs.follows = "nixpkgs";

    shell-brief.url = "github:wereHamster/shell-brief";
  };

  outputs =
    {
      nixpkgs,
      flake-utils,
      nix-develop,
      shell-brief,
      ...
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = import nixpkgs {
          inherit system;
        };

        brief = shell-brief.lib.mkShellBrief {
          inherit pkgs;

          banner = ''
            ${pkgs.figlet}/bin/figlet timvir
            echo "     [timˈvir] n. book"
          '';

          setup = [
            {
              name = "Dependencies";
              condition = "[[ -f package.json && -f pnpm-lock.yaml && -f node_modules/.modules.yaml && node_modules/.modules.yaml -nt pnpm-lock.yaml && node_modules/.modules.yaml -nt package.json ]]";
              suggestion = "Run 'pnpm install'";
            }
          ];

          commands = [
            {
              name = "pnpm";
              help = "Manage Node.js dependencies";
            }
            {
              name = "dev";
              help = "Start the Next.js development server";
            }
          ];
        };

        tools = {
          dev = pkgs.writeShellScriptBin "dev" ''
            clear
            ./node_modules/.bin/next dev
          '';
        };
      in
      {
        packages.nix-develop = nix-develop.packages.${system}.default;

        devShells.default = pkgs.mkShell {
          buildInputs = [
            pkgs.nodejs
            pkgs.pnpm
            pkgs.biome

            brief

            pkgs.jq

            tools.dev
          ];

          shellHook = ''
            ${brief}/bin/brief
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

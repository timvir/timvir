{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

    nix-develop.url = "github:nicknovitski/nix-develop";
    nix-develop.inputs.nixpkgs.follows = "nixpkgs";

    shell-brief.url = "github:wereHamster/shell-brief";
  };

  outputs =
    {
      nixpkgs,
      nix-develop,
      shell-brief,
      ...
    }:
    let
      forAllSystems =
        function:
        nixpkgs.lib.genAttrs nixpkgs.lib.systems.flakeExposed (
          system: function nixpkgs.legacyPackages.${system}
        );

    in
    {
      packages = forAllSystems (pkgs: {
        nix-develop = nix-develop.packages.${pkgs.stdenv.hostPlatform.system}.default;
      });

      devShells = forAllSystems (
        pkgs:
        let
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
          default = pkgs.mkShell {
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

          workflow = pkgs.mkShell {
            buildInputs = [
              pkgs.nodejs
              pkgs.pnpm
              pkgs.biome
            ];
          };
        }
      );
    };
}

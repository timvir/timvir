let
  pkgs = import <nixpkgs> {};

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

in pkgs.mkShell {
  buildInputs = [
    pkgs.nodejs_20
    pkgs.jq
    pkgs.nodePackages.pnpm

    tools.dev
  ];

  shellHook = ''
    if [ -n "$PS1" ]; then
      ${banner}/bin/banner
    fi

    export PATH=$PWD/node_modules/.bin:$PATH
  '';
}

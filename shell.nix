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
    pkgs.nodejs-16_x
    pkgs.jq

    tools.dev
  ];

  shellHook = ''
    if [ -n "$PS1" ]; then
      ${banner}/bin/banner
    fi
  '';
}

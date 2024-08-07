export default {
  '/': new RegExp("^/$"),
  '/commands': new RegExp("^/commands$"),
  '/concepts/component-sample': new RegExp("^/concepts/component-sample$"),
  '/docs': new RegExp("^/docs$"),
  '/docs/markdown': new RegExp("^/docs/markdown$"),
  '/docs/search': new RegExp("^/docs/search$"),
  '/modules': new RegExp("^/modules$"),
  '/packages/cli': new RegExp("^/packages/cli$"),
  '/packages/macro': new RegExp("^/packages/macro$"),
  '/packages/timvir': new RegExp("^/packages/timvir$"),
  '/snippets': new RegExp("^/snippets$"),
  '/blocks/Arbitrary': new RegExp("^/blocks/Arbitrary$"),
  '/blocks/Code': new RegExp("^/blocks/Code$"),
  '/blocks/ColorBar': new RegExp("^/blocks/ColorBar$"),
  '/blocks/ColorBook': new RegExp("^/blocks/ColorBook$"),
  '/blocks/Cover': new RegExp("^/blocks/Cover$"),
  '/blocks/Exhibit': new RegExp("^/blocks/Exhibit$"),
  '/blocks/Font': new RegExp("^/blocks/Font$"),
  '/blocks/Grid': new RegExp("^/blocks/Grid$"),
  '/blocks/Icon': new RegExp("^/blocks/Icon$"),
  '/blocks/Message': new RegExp("^/blocks/Message$"),
  '/blocks/Swatch': new RegExp("^/blocks/Swatch$"),
  '/blocks/Viewport': new RegExp("^/blocks/Viewport$"),
  '/blocks/WebLink': new RegExp("^/blocks/WebLink$"),
  '/blocks/[block]': new RegExp("^/blocks/(?<block>.+)$"),
  '/modules/blocks': new RegExp("^/modules/blocks$"),
  '/modules/core': new RegExp("^/modules/core$"),
  '/modules/hooks': new RegExp("^/modules/hooks$"),
  '/modules/std': new RegExp("^/modules/std$"),
  '/tip/0001': new RegExp("^/tip/0001$"),
  '/docs/components/[component]/api': new RegExp("^/docs/components/(?<component>.+)/api$"),
  '/docs/components/[component]': new RegExp("^/docs/components/(?<component>.+)$"),
  '/modules/blocks/Arbitrary': new RegExp("^/modules/blocks/Arbitrary$"),
  '/modules/std/base58': new RegExp("^/modules/std/base58$"),
  '/docs/components/[component]/samples/[sample]': new RegExp("^/docs/components/(?<component>.+)/samples/(?<sample>.+)$"),
}

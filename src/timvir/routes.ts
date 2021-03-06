export default {
  '/': new RegExp("^/$"),
  '/markdown': new RegExp("^/markdown$"),
  '/commands': new RegExp("^/commands$"),
  '/concepts/component-sample': new RegExp("^/concepts/component-sample$"),
  '/docs': new RegExp("^/docs$"),
  '/docs/markdown': new RegExp("^/docs/markdown$"),
  '/docs/search': new RegExp("^/docs/search$"),
  '/packages/blocks': new RegExp("^/packages/blocks$"),
  '/packages/cli': new RegExp("^/packages/cli$"),
  '/packages/core': new RegExp("^/packages/core$"),
  '/packages/macro': new RegExp("^/packages/macro$"),
  '/packages/search': new RegExp("^/packages/search$"),
  '/snippets': new RegExp("^/snippets$"),
  '/tip/0001': new RegExp("^/tip/0001$"),
  '/docs/components/[component]/api': new RegExp("^/docs/components/(?<component>.+)/api$"),
  '/docs/components/[component]': new RegExp("^/docs/components/(?<component>.+)$"),
  '/docs/components/[component]/samples/[sample]': new RegExp("^/docs/components/(?<component>.+)/samples/(?<sample>.+)$"),
}

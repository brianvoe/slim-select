/* global ENVIRONMENT,ga */
if (ENVIRONMENT === 'production') {
  window.addEventListener('load', () => {
    ga('create', 'UA-96955238-1', 'auto')

    ga('require', 'maxScrollTracker')
    ga('require', 'outboundLinkTracker')
    ga('require', 'urlChangeTracker')
    ga('require', 'pageVisibilityTracker')

    ga('send', 'pageview')
  })
}

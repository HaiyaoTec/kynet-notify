/** @type {import('next').NextConfig} */
const withOffline = require('next-offline')

module.exports = withOffline({
  workboxOpts: {
    swDest: process.env.NEXT_EXPORT
      ? 'service-worker.js'
      : 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^http?.*/,
        handler: 'NetworkFirst',
        options: { cacheName: 'offlineCache', expiration: { maxEntries: 200 } },
      },
    ],
  },
});

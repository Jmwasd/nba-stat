const path = require('path');

module.exports = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_ENV_API_KEY: process.env.NEXT_PUBLIC_ENV_API_KEY,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
      },
    ],
  },
};

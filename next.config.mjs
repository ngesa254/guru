// // /** @type {import('next').NextConfig} */
// // const nextConfig = {
// //     async rewrites() {
// //         return [
// //           {
// //             source: '/api/:path*',
// //             destination: 'https://w7fvpvogr6.execute-api.eu-west-1.amazonaws.com/UAT/api/:path*',
// //           },
// //         ]
// //       },
// // };

// // export default nextConfig;
// // https://kf0bl71x31.execute-api.eu-west-1.amazonaws.com/UAT/api/v1/retail-product-recommendation-service,  "prompt":"What is Safaricom Telematics Monthly Service?"

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   async rewrites() {
//     return [
//       {
//         source: '/api/v1/Enterpise-AI-Search/:path*',
//         destination: 'https://w7fvpvogr6.execute-api.eu-west-1.amazonaws.com/UAT/api/v1/Enterpise-AI-Search/:path*',
//       },
//       {
//         source: '/api/v1/retail-product-recommendation-service/:path*',
//         destination: 'https://kf0bl71x31.execute-api.eu-west-1.amazonaws.com/UAT/api/v1/retail-product-recommendation-service/:path*',
//       },
//     ];
//   },
// };

// export default nextConfig;



/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['mermaid'],
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      stream: false,
      crypto: false
    };
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/Enterpise-AI-Search/:path*',
        destination: 'https://w7fvpvogr6.execute-api.eu-west-1.amazonaws.com/UAT/api/v1/Enterpise-AI-Search/:path*',
      },
      {
        source: '/api/v1/retail-product-recommendation-service/:path*',
        destination: 'https://kf0bl71x31.execute-api.eu-west-1.amazonaws.com/UAT/api/v1/retail-product-recommendation-service/:path*',
      },
    ];
  },
};

export default nextConfig;


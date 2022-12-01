const nextConfig = {
  reactStrictMode: true
};

/* 
 webpack 함수를 별도로 추가하여, svg 파일을 Component로 사용
 svgr 모듈을 별도로 next.config.js 에 추가해주어야 함.
**/
module.exports = {
  nextConfig,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};

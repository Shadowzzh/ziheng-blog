import BundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = BundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
});

const handleSvg = (config) => {
  //  搜索webpack配置中现有的规则，寻找能处理.svg文件的规则。
  const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));
  //  向webpack的rules数组中添加新的规则，用于特定条件下的.svg文件处理。
  config.module.rules.push(
    // 这个规则是复制已存在的处理.svg的规则，但只应用于查询字符串包含url的.svg文件（即使用?url来请求的.svg文件）。这常用于需要将SVG文件作为URL导入而不是直接嵌入。
    {
      ...fileLoaderRule,
      test: /\.svg$/i,
      resourceQuery: /url/ // *.svg?url
    },
    // 这个规则处理所有其他的.svg文件，将它们转换为React组件。这里使用了@svgr/webpack加载器。issuer和resourceQuery确保这个规则不会应用于已由上一个规则处理的文件。
    {
      test: /\.svg$/i,
      resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
      use: ['@svgr/webpack']
    }
  );

  // 修改文件加载器规则以忽略*.svg，因为我们现在已经处理了它。
  fileLoaderRule.exclude = /\.svg$/i;
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['ts', 'tsx', 'mdx'],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  output: 'standalone',
  webpack: (config) => {
    if (!config.isServer) {
      // 修改打包后的 JS 文件名称
      // config.output.filename = 'static/js/[name].[contenthash].js';
      // 修改打包后的 chunk 文件名称
      // config.output.chunkFilename = 'static/js/[name].[contenthash].chunk.js';
      // 修改打包后的 CSS 文件名称
      // const miniCssExtractPlugin = config.plugins.find(
      //   (plugin) => plugin.constructor.name === 'MiniCssExtractPlugin'
      // );
      // if (miniCssExtractPlugin) {
      //   miniCssExtractPlugin.options.filename = 'static/css/[name].[contenthash].css';
      //   miniCssExtractPlugin.options.chunkFilename = 'static/css/[name].[contenthash].chunk.css';
      // }
    }

    handleSvg(config);

    return config;
  }
};

export default withBundleAnalyzer(nextConfig);

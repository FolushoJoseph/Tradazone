// webpack.config.js or craco.config.js
// Add bundle analyzer for production builds

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig, { env }) => {
      if (env === 'production') {
        // Add bundle analyzer for monitoring
        webpackConfig.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: 'bundle-report.html',
            openAnalyzer: false,
            generateStatsFile: true,
            statsFilename: 'bundle-stats.json',
            logLevel: 'warn'
          })
        );
        
        // Configure code splitting for optimal loading
        webpackConfig.optimization = {
          ...webpackConfig.optimization,
          splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 100000, // 100KB max chunk size
            cacheGroups: {
              vendor: {
                test: /[\\/]node_modules[\\/]/,
                name: 'vendors',
                chunks: 'all',
                priority: 10,
                enforce: true,
                reuseExistingChunk: true,
                maxSize: 50000 // 50KB per vendor chunk
              },
              // Separate InvoiceDetail specific chunks
              invoiceDetail: {
                test: /[\\/]src[\\/]components[\\/]invoice[\\/]/,
                name: 'invoice-detail',
                chunks: 'all',
                priority: 20,
                enforce: true,
                maxSize: 50000
              }
            }
          }
        };
      }
      
      return webpackConfig;
    }
  }
};
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let plugins = [];
if(process.argv.indexOf('--bundleAnalyzer') != -1) {
	plugins.push(new BundleAnalyzerPlugin());
}
module.exports = {
    devServer: {
        disableHostCheck: true
    },
    chainWebpack: config => {
        config.optimization.minimizer('terser').tap(args => {
            args[0].terserOptions.compress.drop_console = true;
            return args;
        });
        config.module.rules.delete('eslint');
        config.plugin('html').tap(args => {
            args[0].title = 'MNTN';
            return args;
        });
        config.plugins.delete('prefetch');
    },
    productionSourceMap: false,
    runtimeCompiler: true,
    configureWebpack: {
        plugins,
    },
    pwa: {
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            navigateFallback: 'index.html',
            swSrc: '/service-worker.js',
            exclude: [
                /\.map$/, 
                /manifest\.json$/ 
            ],
        },
        themeColor: '#0B1D26'
    }
}

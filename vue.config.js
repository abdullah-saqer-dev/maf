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
            args[0].title = 'Landing Page';
            return args;
        });
        config.plugins.delete('prefetch');
    },
    productionSourceMap: false,
    runtimeCompiler: true,
    pwa: {
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            navigateFallback: 'index.html',
            swSrc: 'src/service-worker.js',
            exclude: [
                /\.map$/, 
                /manifest\.json$/ 
            ],
        },
        themeColor: '#FBD784'
    }
}

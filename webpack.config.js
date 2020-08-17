const Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('public/assets/vaachar-theme')
    .setPublicPath('/assets/vaachar-theme')
    .addEntry('theme-entry', './themes/VaaCharTheme/assets/app.js')
    .disableSingleRuntimeChunk()
    .cleanupOutputBeforeBuild()
    .enableSassLoader()
    .enableSourceMaps(!Encore.isProduction())
    .enableVersioning(Encore.isProduction());

const config = Encore.getWebpackConfig();
config.name = 'vaaCharTheme';

module.exports = config;

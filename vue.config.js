module.exports = {
    pwa: {
        name: 'Demo PWA',
        themeColor: '#3185FC',
        workboxPluginMode: 'GenerateSW',
        // workboxOptions: {
        //     swSrc: 'src/service-worker.js'
        // },
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/styles/variables.scss";`
            }
        }
    }
};

module.exports = {
    pwa: {
        name: 'Demo PWA',
        themeColor: '#272999',
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

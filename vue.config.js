module.exports = {
    pwa: {
        workboxPluginMode: 'GenerateSW',
        // workboxOptions: {
        //     swSrc: 'src/service-worker.js'
        // },
        themeColor: '#3185FC'
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/styles/variables.scss";`
            }
        }
    }
}

module.exports = {
    pwa: {
        workboxPluginMode: 'GenerateSW',
        // workboxOptions: {
        //     swSrc: 'src/service-worker.js'
        // },
        themeColor: '#1da025'
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "@/assets/styles/variables.scss";`
            }
        }
    }
}

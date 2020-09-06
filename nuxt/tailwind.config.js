/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
    theme: {
        darkSelector: '.dark-mode'
    },
    variants: {
        backgroundColor: [
            "dark",
            "dark-hover",
            "dark-group-hover",
            "dark-even",
            "dark-odd"
        ],
        borderColor: ["dark", "dark-focus", "dark-focus-within"],
        textColor: ["dark", "dark-hover", "dark-active"]
    },
    plugins: [
        require('tailwindcss-dark-mode')()
    ],
    purge: {
        // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
        enabled: process.env.NODE_ENV === 'production',
        content: [
            'components/**/*.vue',
            'layouts/**/*.vue',
            'pages/**/*.vue',
            'plugins/**/*.js',
            'nuxt.config.js'
        ],
        whitelist: ['dark-mode']
    },
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true
    }
}

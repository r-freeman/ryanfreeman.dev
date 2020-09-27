/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
module.exports = {
    theme: {
        fontFamily: {
            'sans': ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen-Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'sans-serif']
        },
        extend: {
            colors: {
                'blueribbon': '#0053F8',
                'mineshaft': '#222222',
                'emperor': '#555555',
                'dovegray': '#6f6f6f',
                'mercury': '#e6e6e6',
                'heavymetal': '#23241F',
                'springwood': '#F8F8F2'
            }
        }
    },
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
    },
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true
    }
}
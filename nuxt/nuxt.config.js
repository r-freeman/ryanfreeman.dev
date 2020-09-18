import webpack from 'webpack'
import axios from 'axios'

export default {
    /*
    ** Nuxt rendering mode
    ** See https://nuxtjs.org/api/configuration-mode
    */
    mode: 'universal',
    /*
    ** Nuxt target
    ** See https://nuxtjs.org/api/configuration-target
    */
    target: 'server',
    /*
    ** Headers of the page
    ** See https://nuxtjs.org/api/configuration-head
    */
    head: {
        htmlAttrs: {
            lang: 'en'
        },
        title: 'Ryan Freeman - Student Software Developer IADT',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'robots', content: 'index, follow' },
            { name: "author", content: 'Ryan Freeman' },
            // { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    /*
    ** Global CSS
    */
    css: [],
    /*
    ** Plugins to load before mounting the App
    ** https://nuxtjs.org/guide/plugins
    */
    plugins: [],
    /*
    ** Auto import components
    ** See https://nuxtjs.org/api/configuration-components
    */
    components: true,
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
        // '@nuxtjs/color-mode',
        '@nuxtjs/tailwindcss'
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/feed',
        '@nuxtjs/dayjs'
    ],
    feed: [
        {
            path: '/rss.xml',
            async create(feed) {
                let author = await axios.get('https://ryanfreeman.dev/wordpress/wp-json/wp/v2/users/1')
                    .then(res => res.data)

                feed.options = {
                    title: author.name,
                    link: 'https://ryanfreeman.dev/rss.xml',
                    description: author.description
                }

                let posts = await axios.get('https://ryanfreeman.dev/wordpress/wp-json/wp/v2/posts')
                    .then(res => res.data)

                posts = posts.filter(post => post.status === 'publish')
                    .forEach(post => {
                        feed.addItem({
                            id: `https://ryanfreeman.dev/posts/${post.slug}`,
                            title: post.title.rendered,
                            link: `https://ryanfreeman.dev/posts/${post.slug}`,
                            description: post.excerpt.rendered,
                            content: post.content.rendered
                        })
                    });
            },
            catchTime: 1000 * 60 * 15,
            type: 'rss2'
        }
    ],
    /*
    ** Build configuration
    ** See https://nuxtjs.org/api/configuration-build/
    */
    build: {
        plugins: [
            new webpack.ProvidePlugin({
                _: 'lodash'
            })
        ]
    }
}

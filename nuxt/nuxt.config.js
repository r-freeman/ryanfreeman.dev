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
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'alternate', type: 'application/rss+xml', title: 'RSS feed', href: 'https://ryanfreeman.dev/rss.xml' }
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
    plugins: [
        '@/plugins/dayjs.js',
        '@/plugins/api.js'
    ],
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
        '@nuxtjs/tailwindcss', ['@nuxtjs/google-analytics', {
            id: 'UA-179036225-1'
        }]
    ],
    /*
     ** Nuxt.js modules
     */
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/feed',
        '@nuxtjs/dayjs',
        '@nuxtjs/sitemap',
    ],
    feed: [{
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
    }],
    sitemap: {
        hostname: 'https://ryanfreeman.dev',
        gzip: true,
        defaults: {
            changefreq: 'daily',
            priority: 1,
            lastmod: new Date()
        },
        routes: async() => {
            let posts = await axios.get('https://ryanfreeman.dev/wordpress/wp-json/wp/v2/posts')
                .then(res => res.data)

            posts = posts.filter(post => post.status === 'publish')
                .map((post) => `/posts/${post.slug}`)

            let pages = await axios.get('https://ryanfreeman.dev/wordpress/wp-json/wp/v2/pages')
                .then(res => res.data)

            pages = pages.filter(page => page.slug !== 'posts')
                .map((page) => `/pages/${page.slug}`)

            let categories = await axios.get('https://ryanfreeman.dev/wordpress/wp-json/wp/v2/categories')
                .then(res => res.data)

            categories = categories.filter(category => category.count > 0)
                .map((category) => `/categories/${category.slug}`)

            let tags = await axios.get('https://ryanfreeman.dev/wordpress/wp-json/wp/v2/tags')
                .then(res => res.data)

            tags = tags.filter(tag => tag.count > 0)
                .map((tag) => `/tags/${tag.slug}`)

            return posts.concat(pages).concat(categories).concat(tags)
        }
    },
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
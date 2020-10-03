export const state = () => ({
    author: {},
    categories: [],
    tags: [],
    posts: [],
    pages: []
})

export const mutations = {
    updateAuthor: (state, author) => {
        state.author = author
    },
    updateCategories: (state, categories) => {
        state.categories = categories
    },
    updateTags: (state, tags) => {
        state.tags = tags
    },
    updatePosts: (state, posts) => {
        state.posts = posts
    },
    updatePages: (state, pages) => {
        state.pages = pages
    }
}

export const actions = {
    async getAuthor({ state, commit }) {
        if (state.author.length) return

        try {
            let { id, name, description, simple_local_avatar } = await this.$api.getAuthor()

            commit("updateAuthor", { id, name, description, simple_local_avatar })

        } catch (err) {
            console.log(err)
        }
    },
    async getCategories({ state, commit }) {
        if (state.categories.length) return

        try {
            let categories = await this.$api.getCategories()

            categories = categories
                .filter(({ count }) => count > 0)
                .map(({ id, name, description, slug }) => ({ id, name, description, slug }))

            commit("updateCategories", categories)

        } catch (err) {
            console.log(err)
        }
    },
    async getTags({ state, commit }) {
        if (state.tags.length) return

        try {
            let tags = await this.$api.getTags()

            tags = tags
                .filter(({ count }) => count > 0)
                .map(({ id, name, description, slug }) => ({ id, name, description, slug }))

            commit("updateTags", tags)

        } catch (err) {
            console.log(err)
        }
    },
    async getPosts({ state, commit }) {
        if (state.posts.length) return

        try {
            let posts = await this.$api.getPosts()

            posts = posts
                .filter(({ status }) => status === "publish")
                .map(({ id, date, slug, title, content, excerpt, categories, tags }) => {
                    // add the categories to each post
                    if (categories.length) {
                        state.categories.forEach(category => {
                            let i = categories.indexOf(category.id)
                            if (i !== -1) {
                                categories.splice(i, 1, category)
                            }
                        })
                    }

                    // add the tags to each post
                    if (tags.length) {
                        state.tags.forEach(tag => {
                            let i = tags.indexOf(tag.id)
                            if (i !== -1) {
                                tags.splice(i, 1, tag)
                            }
                        })
                    }

                    return {
                        id,
                        date,
                        slug,
                        title,
                        content,
                        excerpt,
                        categories,
                        tags
                    }
                })

            commit("updatePosts", posts)
        } catch (err) {
            console.log(err)
        }
    },
    async getPages({ state, commit }) {
        if (state.pages.length) return

        try {
            let pages = await this.$api.getPages()

            pages = pages
                .filter(({ status }) => status === "publish")
                .map(({ id, date, slug, link, title, content, excerpt, menu_order }) => ({ id, date, slug, link, title, content, excerpt, menu_order }))

            commit("updatePages", pages)
        } catch (err) {
            console.log(err)
        }
    }
}
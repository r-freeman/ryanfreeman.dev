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
            let author = await this.$api.getAuthor()

            commit("updateAuthor", author)

        } catch (err) {
            console.log(err)
        }
    },
    async getCategories({ state, commit }) {
        if (state.categories.length) return

        try {
            let categories = await this.$api.getCategories()

            commit("updateCategories", categories)

        } catch (err) {
            console.log(err)
        }
    },
    async getTags({ state, commit }) {
        if (state.tags.length) return

        try {
            let tags = await this.$api.getTags()

            commit("updateTags", tags)

        } catch (err) {
            console.log(err)
        }
    },
    async getPosts({ state, commit }) {
        if (state.posts.length) return

        try {
            let posts = await this.$api.getPosts(state.categories, state.tags)

            commit("updatePosts", posts)
        } catch (err) {
            console.log(err)
        }
    },
    async getPages({ state, commit }) {
        if (state.pages.length) return

        try {
            let pages = await this.$api.getPages()

            commit("updatePages", pages)
        } catch (err) {
            console.log(err)
        }
    }
}
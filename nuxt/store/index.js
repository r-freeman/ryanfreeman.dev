export const actions = {
    // populate the vuex store from the server
    async nuxtServerInit({ dispatch }) {
        await dispatch("wp/getAuthor")
        await dispatch("wp/getCategories")
        await dispatch("wp/getTags")
        await dispatch("wp/getPosts")
        await dispatch("wp/getPages")
    }
}
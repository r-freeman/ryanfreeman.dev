export const state = () => ({
    posts: []
})

export const mutations = {
    updatePosts: (state, posts) => {
        state.posts = posts
    }
}

export const actions = {
    async getPosts({state, commit}) {
        if (state.posts.length) return

        try {
            let posts = await fetch('https://ryanfreeman.dev/wordpress/wp-json/wp/v2/posts')
                .then(res => res.json())

            posts = posts
                .filter(post => post.status === "publish")
                .map(({id, slug, title, excerpt, date, tags, content}) => ({
                    id,
                    slug,
                    title,
                    excerpt,
                    date,
                    tags,
                    content
                }))

            commit("updatePosts", posts)
            console.log(posts)
        } catch (err) {
            console.log(err)
        }
    }
}
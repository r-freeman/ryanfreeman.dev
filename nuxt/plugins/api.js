const BASE_URL = 'http://localhost:3000/api/',
    AUTHOR = 'users/1?_fields=id,name,description,simple_local_avatar',
    CATEGORIES = 'categories?_fields=id,name,description,slug,count',
    TAGS = 'tags?_fields=id,name,description,slug,count',
    POSTS = 'posts?_fields=id,date,slug,title,content,excerpt,status,categories,tags',
    PAGES = 'pages?_fields=id,data,slug,link,title,content,excerpt,menu_order,status,acf'


export default ({ $axios }, inject) => {
    const api = $axios.create({
        baseURL: BASE_URL
    })

    const getData = async(url) => {
        try {
            return await api.get(url)
                .then(res => res.data)
        } catch (err) {
            console.log(err)
        }
    }

    api.getAuthor = async() => {
        let { id, name, description, simple_local_avatar } = await getData(AUTHOR)

        return {
            id,
            name,
            description,
            simple_local_avatar
        }
    }

    api.getCategories = async() => {
        let categories = await getData(CATEGORIES)

        categories = categories
            .filter(({ count }) => count > 0)
            .map(({ id, name, description, slug }) => ({ id, name, description, slug }))

        return categories
    }

    api.getTags = async() => {
        let tags = await getData(TAGS)

        tags = tags
            .filter(({ count }) => count > 0)
            .map(({ id, name, description, slug }) => ({ id, name, description, slug }))

        return tags
    }

    api.getPosts = async(_categories, _tags) => {
        let posts = await getData(POSTS)

        posts = posts
            .filter(({ status }) => status === "publish")
            .map(({ id, date, slug, title, content, excerpt, categories, tags }) => {
                // add the categories to each post
                if (categories.length) {
                    _categories.forEach(category => {
                        let i = categories.indexOf(category.id)
                        if (i !== -1) {
                            categories.splice(i, 1, category)
                        }
                    })
                }

                // add the tags to each post
                if (tags.length) {
                    _tags.forEach(tag => {
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

        return posts
    }

    api.getPages = async() => {
        let pages = await getData(PAGES)

        pages = pages
            .filter(({ status }) => status === "publish")
            .map(({ id, date, slug, link, title, content, excerpt, menu_order, acf }) => ({ id, date, slug, link, title, content, excerpt, menu_order, acf }))

        return pages
    }

    inject('api', api)
}
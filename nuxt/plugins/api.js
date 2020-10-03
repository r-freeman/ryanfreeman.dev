const BASE_URL = 'http://localhost:3000/api/',
    AUTHOR = 'users/1?_fields=id,name,description,simple_local_avatar',
    CATEGORIES = 'categories?_fields=id,name,description,slug,count',
    TAGS = 'tags?_fields=id,name,description,slug,count',
    POSTS = 'posts?_fields=id,date,slug,title,content,excerpt,status,categories,tags',
    PAGES = 'pages?_fields=id,data,slug,link,title,content,excerpt,menu_order,status'


export default ({ $axios }, inject) => {
    const api = $axios.create({
        baseURL: BASE_URL
    })

    const getData = async(url) => {
        return await api.get(url).then(res => res.data)
            .catch(e => console.log(e))
    }

    api.getAuthor = () => {
        return getData(AUTHOR)
    }

    api.getCategories = () => {
        return getData(CATEGORIES)
    }

    api.getTags = () => {
        return getData(TAGS)
    }

    api.getPosts = () => {
        return getData(POSTS)
    }

    api.getPages = () => {
        return getData(PAGES)
    }

    inject('api', api)
}
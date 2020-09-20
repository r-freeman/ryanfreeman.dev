<template>
    <div>
        <div class="absolute top-0 left-0 p-8 w-full text-center lg:text-left">
            <nuxt-link
                to="/"
                class="text-base border border-gray-300 px-8 py-2 rounded-full leading-9 hover:text-blueribbon"
            >All Posts</nuxt-link>
        </div>
        <main v-if="post" class="px-8">
            <h1
                class="mt-24 lg:mt-16 mb-8 mx-auto text-4xl font-semibold leading-tight"
            >{{ post.title.rendered }}</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum perferendis, nemo vitae delectus repellat porro. Libero eveniet quo asperiores ea.</p>
        </main>
    </div>
</template>

<script>
export default {
    layout: "post",
    head() {
        return {
            title: this.post.title.rendered,
            meta: [
                {
                    name: "description",
                    content:
                        this.post.excerpt.rendered.replace(
                            /(<([^>]+)>)/gi,
                            ""
                        ) || "",
                    hid: "description",
                },
            ],
        };
    },
    data() {
        return {
            slug: this.$route.params.slug,
        };
    },
    computed: {
        posts() {
            return this.$store.state.wp.posts;
        },
        post() {
            return this.posts.find((post) => post.slug === this.slug);
        },
    },
};
</script>

<style scoped>
p {
    @apply text-lg leading-7;
}
</style>

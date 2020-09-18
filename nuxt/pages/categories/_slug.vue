<template>
    <div class="lg:w-2/3">
        <main class="p-10">
            <h1 class="font-sans font-semibold text-4xl mb-8">{{ category.name }}</h1>
            <article v-for="post in posts" :key="post.id" class="post mb-8">
                <div class="inline-flex mb-2">
                    <time
                        class="datetime uppercase font-sans font-semibold text-sm mr-2"
                        :datetime="$dayjs(post.date).format('YYYY-MM-DD')"
                    >{{ $dayjs(post.date).format('MMMM YYYY') }}</time>
                    <p class="category uppercase font-sans font-semibold text-sm text-blueribbon">
                        <nuxt-link
                            :to="`categories/${post.categories[0].slug}`"
                        >{{ post.categories[0].name }}</nuxt-link>
                    </p>
                </div>
                <h2 class="title text-2xl leading-9 font-sans font-semibold mb-3 antialiased">
                    <nuxt-link
                        class="hover:underline"
                        :to="`posts/${post.slug}`"
                        v-html="post.title.rendered"
                    ></nuxt-link>
                </h2>
                <div class="summary text-base font-sans my-5" v-html="post.excerpt.rendered"></div>
                <p class="readmore text-base font-sans text-blueribbon">
                    <nuxt-link class="hover:underline" :to="`posts/${post.slug}`">Read &rarr;</nuxt-link>
                </p>
            </article>
        </main>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: `${this.category.name} - Ryan Freeman - Student Software Developer IADT`,
            meta: [
                {
                    name: "description",
                    content: this.category.description,
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
        categories() {
            return this.$store.state.wp.categories;
        },
        category() {
            return this.categories.find(
                (category) => category.slug === this.slug
            );
        },
        posts() {
            return this.$store.state.wp.posts.filter(
                (post) => post.categoryId === this.category.id
            );
        },
    },
};
</script>
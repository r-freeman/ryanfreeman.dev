<template>
    <div class="lg:w-2/3">
        <main class="mb-12 px-8 pb-8 lg:p-10">
            <h1
                class="mb-8 font-semibold font-sans text-3xl leading-tight antialiased"
            >
                {{ category.name }}
            </h1>
            <Post v-for="post in posts" :key="post.id" :post="post" />
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
                    content:
                        this.category.description ||
                        `Posts in the ${this.category.name} category`,
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
            return this.$store.state.wp.posts.filter((post) =>
                post.categories.includes(this.category)
            );
        },
    },
};
</script>
<template>
    <div class="lg:w-2/3">
        <main class="mb-12 px-8 pb-8 lg:p-10">
            <h1
                class="mb-8 font-semibold font-sans text-4xl leading-tight antialiased"
            >
                {{ tag.name }}
            </h1>
            <Post v-for="post in posts" :key="post.id" :post="post" />
        </main>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: `${this.tag.name} - Ryan Freeman - Student Software Developer IADT`,
            meta: [
                {
                    name: "description",
                    content:
                        this.tag.description ||
                        `Posts tagged with ${this.tag.name}`,
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
        tags() {
            return this.$store.state.wp.tags;
        },
        tag() {
            return this.tags.find((tag) => tag.slug === this.slug);
        },
        posts() {
            return this.$store.state.wp.posts.filter((post) => {});
        },
    },
};
</script>
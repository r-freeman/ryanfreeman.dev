<template>
    <main class="single-post" v-if="post">
    </main>
</template>

<script>
export default {
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
            return this.posts.find(post => post.slug === this.slug);
        },
    },
};
</script>

<style>
</style>

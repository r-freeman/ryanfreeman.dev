<template>
    <div class="lg:w-2/3">
        <main class="mb-12 px-8 pb-8 lg:p-10">
            <Post v-for="post in posts" :key="post.id" :post="post" />
        </main>
    </div>
</template>

<script>
export default {
    transition: "page",
    head() {
        return {
            meta: [
                {
                    name: "description",
                    content: this.$store.state.wp.author.description,
                    hid: "description",
                },
            ],
        };
    },
    computed: {
        posts() {
            return this.$store.state.wp.posts;
        },
    },
};
</script>

<style>
.page-enter-active,
.page-leave-active {
    @apply transition-opacity duration-300;
}
.page-enter,
.page-leave-active {
    @apply opacity-0;
}
</style>
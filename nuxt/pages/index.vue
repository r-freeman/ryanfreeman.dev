<template>
    <div class="lg:w-2/3">
        <main class="px-10 lg:p-10">
            <Post v-for="post in posts" :key="post.id" :post="post" />
        </main>
    </div>
</template>

<script>
export default {
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
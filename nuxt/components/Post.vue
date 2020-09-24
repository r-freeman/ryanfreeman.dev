<template>
    <article class="post mb-8">
        <header>
            <div class="inline-flex mb-2">
                <time
                    class="datetime uppercase font-sans font-semibold text-sm text-mineshaft mr-2"
                    :datetime="$dayjs(post.date).format('YYYY-MM-DD')"
                    >{{ $dayjs().to(post.date) }}</time
                >
                <p
                    v-if="showCategory"
                    class="category uppercase font-sans font-semibold text-sm text-blueribbon"
                >
                    <nuxt-link
                        :to="`/categories/${post.categories[0].slug}`"
                        :title="`${post.categories[0].name}`"
                        >{{ post.categories[0].name }}</nuxt-link
                    >
                </p>
            </div>
            <h2 class="title text-2xl font-sans font-semibold mb-3 antialiased">
                <nuxt-link
                    :to="`/posts/${post.slug}`"
                    v-html="post.title.rendered"
                    :title="`${post.title.rendered}`"
                ></nuxt-link>
            </h2>
        </header>
        <div
            class="summary text-base font-sans leading-relaxed my-5"
            v-html="post.excerpt.rendered"
        ></div>
        <p class="readmore text-base font-sans text-blueribbon">
            <nuxt-link
                :to="`/posts/${post.slug}`"
                :title="`Read ${post.title.rendered}`"
                >Read &rarr;</nuxt-link
            >
        </p>
    </article>
</template>

<script>
export default {
    props: {
        post: {
            type: Object,
            required: true,
        },
        showCategory: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
};
</script>

<style>
.title a {
    &:hover {
        @apply border-b border-black;
    }
}

.readmore a {
    &:hover {
        @apply border-b border-blueribbon;
    }
}
</style>
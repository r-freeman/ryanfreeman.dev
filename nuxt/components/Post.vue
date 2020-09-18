<template>
    <article class="post mb-8">
        <div class="inline-flex mb-2">
            <time
                class="datetime uppercase font-sans font-semibold text-sm text-mineshaft mr-2"
                :datetime="$dayjs(post.date).format('YYYY-MM-DD')"
            >{{ $dayjs(post.date).format('MMMM YYYY') }}</time>
            <p
                v-if="showCategory"
                class="category uppercase font-sans font-semibold text-sm text-blueribbon"
            >
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
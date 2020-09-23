<template>
    <div>
        <nav class="absolute top-0 left-0 p-8 w-full text-center lg:text-left">
            <Button button-text="All Posts" />
        </nav>
        <div class="mb-12 px-8 pb-8">
            <main>
                <h1
                    class="mt-24 lg:mt-16 mb-8 font-semibold font-sans text-4xl leading-tight antialiased"
                >
                    {{ post.title.rendered }}
                </h1>
                <section v-html="post.content.rendered"></section>
                <p>
                    <time
                        class="datetime italic"
                        :datetime="$dayjs(post.date).format('YYYY-MM-DD')"
                        >Published {{ $dayjs().format("DD MMMM YYYY") }}</time
                    >
                </p>
            </main>
            <!-- <nav v-if="tags.length" class="tags">
                <Button
                    v-for="tag in tags"
                    :key="tag.id"
                    :link="`/tags/${tag.slug}`"
                    :text="tag.name"
                />
            </nav>-->
        </div>
    </div>
</template>

<script>
import { stripHtml } from "@/utils";

export default {
    layout: "post",
    head() {
        return {
            title: this.post.title.rendered,
            meta: [
                {
                    name: "description",
                    content: stripHtml(this.post.excerpt.rendered) || "",
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
        tags() {
            return this.post.tags;
        },
    },
};
</script>

<style scoped>
main p {
    @apply mt-4 mb-6;
}

>>> section p {
    @apply mt-4 mb-6 text-base leading-relaxed;
}

>>> section h2 {
    @apply mt-12 mb-4 font-semibold text-2xl antialiased;
}

>>> section figure {
    @apply mt-4 mb-6;
}

>>> section figure figcaption {
    @apply mt-2 text-sm text-mineshaft text-center italic break-words;
}

>>> section figure figcaption a {
    @apply text-blueribbon;
}

>>> section figure img {
    @apply w-full;
}

>>> section ul {
    @apply list-disc mb-6 pl-5;
}

>>> section ul li {
    @apply px-1 mb-2;
}
</style>

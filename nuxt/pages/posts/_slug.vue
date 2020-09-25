<template>
    <div>
        <nav class="absolute top-0 left-0 p-8 w-full text-center lg:text-left">
            <Button button-text="All Posts" />
        </nav>
        <div class="mb-12 px-8 pb-8">
            <main>
                <header>
                    <h1
                        class="mt-24 lg:mt-16 mb-8 font-semibold font-sans text-3xl md:text-5xl md:leading-tight antialiased text-center"
                    >
                        {{ post.title.rendered }}
                    </h1>
                </header>
                <section v-html="post.content.rendered"></section>
                <p class="datetime">
                    <time
                        class="italic"
                        :datetime="$dayjs(post.date).format('YYYY-MM-DD')"
                        >Published
                        {{ $dayjs(post.date).format("DD MMMM YYYY") }}</time
                    >
                </p>
                <nav v-if="tags.length" class="tags">
                    <ul>
                        <li v-for="tag in tags" :key="tag.id">
                            <Button
                                :buttonLink="`/tags/${tag.slug}`"
                                :buttonText="tag.name"
                            />
                        </li>
                    </ul>
                </nav>
                <section class="author">
                    <p>
                        {{ author.description }}
                        <a
                            href="https://github.com/r-freeman/"
                            :title="`${author.name} on GitHub`"
                            rel="noopener noreferrer"
                            target="_blank"
                            ><span>{{ author.name }}</span> on GitHub</a
                        >
                    </p>
                </section>
            </main>
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
        author() {
            return this.$store.state.wp.author;
        },
    },
};
</script>

<style scoped>
main .datetime {
    @apply mt-8 mb-6;
}

nav ul {
    @apply -ml-3;
}

nav ul li {
    @apply inline-block m-3;
}

.author {
    @apply pt-5 mt-6 border-t border-mercury;
}

.author p {
    @apply pb-0;
}

.author p a {
    @apply block text-blueribbon underline;
}

.author p a span {
    @apply font-medium;
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

>>> section .code {
    @apply -ml-8 -mr-8 border-0;

    @screen md {
        @apply mx-auto rounded-lg;
    }
}

>>> section .code pre {
    @apply px-8 py-4 overflow-x-auto;
}
</style>

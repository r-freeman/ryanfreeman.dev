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
@import "@/assets/css/monokai-sublime.css";

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

>>> section p a {
    @apply text-blueribbon;

    &:hover {
        @apply underline;
    }
}

>>> section h2 {
    @apply mt-12 mb-4 relative font-semibold text-2xl antialiased;
}

>>> section h2 a {
    &:hover {
        &:before {
            content: "";
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'%3E%3Cpath d='M7.859 14.691l-.81.805a1.814 1.814 0 0 1-2.545 0 1.762 1.762 0 0 1 0-2.504l2.98-2.955c.617-.613 1.779-1.515 2.626-.675a.992.992 0 1 0 1.397-1.407c-1.438-1.428-3.566-1.164-5.419.675l-2.98 2.956A3.719 3.719 0 0 0 2 14.244a3.72 3.72 0 0 0 1.108 2.658 3.779 3.779 0 0 0 2.669 1.096c.967 0 1.934-.365 2.669-1.096l.811-.805a.988.988 0 0 0 .005-1.4.995.995 0 0 0-1.403-.006zm9.032-11.484c-1.547-1.534-3.709-1.617-5.139-.197l-1.009 1.002a.99.99 0 1 0 1.396 1.406l1.01-1.001c.74-.736 1.711-.431 2.346.197.336.335.522.779.522 1.252s-.186.917-.522 1.251l-3.18 3.154c-1.454 1.441-2.136.766-2.427.477a.99.99 0 1 0-1.396 1.406c.668.662 1.43.99 2.228.99.977 0 2.01-.492 2.993-1.467l3.18-3.153A3.732 3.732 0 0 0 18 5.866a3.726 3.726 0 0 0-1.109-2.659z'/%3E%3C/svg%3E%0A");

            @apply absolute block top-0 left-0 w-4 h-4 mt-3 -ml-16;
        }
    }
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
    @apply block -ml-8 -mr-8 mt-4 mb-6 border-0 bg-heavymetal text-springwood;

    @screen md {
        @apply mx-auto rounded-lg;
    }
}

>>> section .code pre {
    @apply px-8 py-4 overflow-x-auto;
}
</style>

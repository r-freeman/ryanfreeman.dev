<template>
    <div class="lg:w-2/3">
        <main class="mb-12 px-8 pb-8 lg:p-10">
            <h1
                class="mb-8 font-semibold font-sans text-3xl leading-tight antialiased"
            >{{ page.title.rendered }}</h1>
            <section v-html="page.content.rendered"></section>
        </main>
    </div>
</template>

<script>
import { stripHtml } from "@/utils";

export default {
    head() {
        return {
            title: `${this.page.title.rendered} - Ryan Freeman - Student Software Developer IADT`,
            meta: [
                {
                    name: "description",
                    content: stripHtml(this.page.excerpt.rendered) || "",
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
        pages() {
            return this.$store.state.wp.pages;
        },
        page() {
            return this.pages.find((page) => page.slug === this.slug);
        },
    },
};
</script>

<style scoped>
>>> section p {
    @apply mt-4 mb-6 text-base leading-relaxed;
}

>>> section p a {
    @apply text-blueribbon;

    &:hover {
        @apply border-b border-blueribbon;
    }
}

>>> section h2 {
    @apply mt-12 mb-4 font-semibold text-2xl antialiased;
}


>>> section figure figcaption {
    @apply mt-2 text-sm italic text-emperor;
}
</style>
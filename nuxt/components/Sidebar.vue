<template>
    <div class="sidebar relative w-full lg:w-1/3">
        <div class="p-8 lg:p-10">
            <div class="author mb-6">
                <nuxt-link :to="'/'" :title="author.name">
                    <img
                        class="object-cover w-20 h-20 rounded-full"
                        :src="author.simple_local_avatar.full"
                        :alt="author.name"
                    />
                </nuxt-link>
                <h1
                    class="name text-lg my-4 font-semibold font-sans antialiased"
                >
                    {{ author.name }}
                </h1>
                <p class="bio text-emperor leading-relaxed">
                    {{ author.description }}
                </p>
            </div>
            <nav class="mb-6">
                <ul class="pages">
                    <li class="my-3" v-for="page in sortedPages" :key="page.id">
                        <nuxt-link
                            :to="`${page.link}`"
                            :title="page.title.rendered"
                            v-html="page.title.rendered"
                        ></nuxt-link>
                    </li>
                </ul>
            </nav>
            <nav class="mb-6">
                <ul class="inline-flex flex-wrap">
                    <li class="m-1">
                        <a
                            class="badge"
                            href="https://github.com/r-freeman"
                            title="GitHub"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M13.18 11.309c-.718 0-1.3.807-1.3 1.799 0 .994.582 1.801 1.3 1.801s1.3-.807 1.3-1.801c-.001-.992-.582-1.799-1.3-1.799zm4.526-4.683c.149-.365.155-2.439-.635-4.426 0 0-1.811.199-4.551 2.08-.575-.16-1.548-.238-2.519-.238-.973 0-1.945.078-2.52.238C4.74 2.399 2.929 2.2 2.929 2.2c-.789 1.987-.781 4.061-.634 4.426C1.367 7.634.8 8.845.8 10.497c0 7.186 5.963 7.301 7.467 7.301l1.734.002 1.732-.002c1.506 0 7.467-.115 7.467-7.301 0-1.652-.566-2.863-1.494-3.871zm-7.678 10.289h-.056c-3.771 0-6.709-.449-6.709-4.115 0-.879.31-1.693 1.047-2.369C5.537 9.304 7.615 9.9 9.972 9.9h.056c2.357 0 4.436-.596 5.664.531.735.676 1.045 1.49 1.045 2.369 0 3.666-2.937 4.115-6.709 4.115zm-3.207-5.606c-.718 0-1.3.807-1.3 1.799 0 .994.582 1.801 1.3 1.801.719 0 1.301-.807 1.301-1.801 0-.992-.582-1.799-1.301-1.799z"
                                />
                            </svg>
                        </a>
                    </li>
                    <!-- <li class="m-1">
                        <a
                            class="badge"
                            href="https://twitter.com/_rfreeman"
                            title="Twitter"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M17.316 6.246c.008.162.011.326.011.488 0 4.99-3.797 10.742-10.74 10.742-2.133 0-4.116-.625-5.787-1.697a7.577 7.577 0 005.588-1.562 3.779 3.779 0 01-3.526-2.621 3.858 3.858 0 001.705-.065 3.779 3.779 0 01-3.028-3.703v-.047a3.766 3.766 0 001.71.473 3.775 3.775 0 01-1.168-5.041 10.716 10.716 0 007.781 3.945 3.813 3.813 0 01-.097-.861 3.773 3.773 0 013.774-3.773 3.77 3.77 0 012.756 1.191 7.602 7.602 0 002.397-.916 3.789 3.789 0 01-1.66 2.088 7.55 7.55 0 002.168-.594 7.623 7.623 0 01-1.884 1.953z"
                                />
                            </svg>
                        </a>
                    </li> -->
                    <li class="m-1">
                        <a
                            class="badge"
                            href="mailto:hello@ryanfreeman.dev"
                            title="Mail"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M18.64 2.634L.984 8.856c-.284.1-.347.345-.01.479l3.796 1.521 2.25.901 10.984-8.066c.148-.108.318.095.211.211l-7.871 8.513v.002l-.452.503.599.322 4.982 2.682c.291.156.668.027.752-.334l2.906-12.525c.079-.343-.148-.552-.491-.431zM7 17.162c0 .246.139.315.331.141.251-.229 2.85-2.561 2.85-2.561L7 13.098v4.064z"
                                />
                            </svg>
                        </a>
                    </li>
                    <li class="m-1">
                        <a
                            class="badge"
                            href="/rss.xml"
                            title="RSS"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    d="M2.4 2.4v2.367c7.086 0 12.83 5.746 12.83 12.832h2.369C17.599 9.205 10.794 2.4 2.4 2.4zm0 4.737v2.369a8.093 8.093 0 0 1 8.093 8.094h2.368c0-5.778-4.684-10.463-10.461-10.463zm2.269 5.922a2.271 2.271 0 0 0 0 4.541c1.254 0 2.269-1.016 2.269-2.27s-1.015-2.271-2.269-2.271z"
                                />
                            </svg>
                        </a>
                    </li>
                </ul>
            </nav>
            <p class="text-sm text-dovegray">
                &copy; {{ year }} All rights reserved.
            </p>
        </div>
        <div
            class="divider absolute mt-6 top-0 right-0 invisible lg:visible"
        ></div>
    </div>
</template>

<style>
.divider {
    background: linear-gradient(180deg, #e6e6e6 0, #e6e6e6 48%, #fff);
    width: 0.0625rem;
    height: 540px;
}

.pages li {
    @apply text-base font-sans;
}

.pages li a {
    &:hover {
        @apply text-blueribbon border-b border-blueribbon;
    }

    &.nuxt-link-exact-active {
        @apply border-b border-black;

        &:hover {
            @apply text-blueribbon border-b border-blueribbon;
        }
    }
}

.badge {
    @apply border border-gray-300 w-10 h-10 flex justify-center items-center rounded-full;

    &:hover {
        @apply text-blueribbon;
    }
}

.badge svg {
    @apply w-5 h-5 fill-current;
}
</style>

<script>
export default {
    computed: {
        author() {
            return this.$store.state.wp.author;
        },
        year() {
            return new Date().getFullYear();
        },
        sortedPages() {
            return _.orderBy(this.$store.state.wp.pages, ["menu_order"]);
        },
    },
};
</script>
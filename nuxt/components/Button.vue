<template>
    <nuxt-link
        :to="buttonLink"
        class="text-base border border-gray-300 px-8 py-2 rounded-full leading-9 hover:text-blueribbon"
    >{{ buttonText }}</nuxt-link>
</template>

<script>
export default {
    props: {
        buttonText: {
            type: String,
            required: true,
        },
        buttonLink: {
            type: String,
            required: false,
            default: "/",
        },
    },
};
</script>
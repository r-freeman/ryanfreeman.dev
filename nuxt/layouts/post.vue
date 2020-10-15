<template>
    <div class="container mx-auto max-w-screen-md">
        <Nuxt />
    </div>
</template>

<script>
export default {
    transition: "layout",
};
</script>

<style>
.layout-enter-active,
.layout-leave-active {
    @apply transition-opacity duration-200;
}
.layout-enter,
.layout-leave-active {
    @apply opacity-0;
}
</style>
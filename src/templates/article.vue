<script setup>
    defineProps({
        title: String,
        meta: String
    });
</script>

<template>
    <div class="row p-4 mb-4 rounded-3 border shadow-lg">
        <article class="blog-post">
            <h3 class="display-6 link-body-emphasis mb-0">{{ title }}</h3>
            <p class="blog-post-meta"><em>{{ meta }}</em></p>

            <slot />
        </article>
    </div>
</template>

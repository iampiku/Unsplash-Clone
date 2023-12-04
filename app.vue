<template>
	<NuxtPage></NuxtPage>
</template>

<script lang="ts" setup>
useSeoMeta({
	ogTitle: "Unsplash Clone",
	description:
		"Search through beautiful, free images and photos that you can download and use for any project. Better than any royalty free or stock photos.",
	ogDescription:
		"Search through beautiful, free images and photos that you can download and use for any project. Better than any royalty free or stock photos.",
	ogImage: "",
	ogUrl: "[og:url]",
});

useHead({
	htmlAttrs: {
		lang: "en",
	},
	link: [
		{
			rel: "icon",
			type: "image/png",
			href: "/unsplash.png",
		},
	],
});
</script>

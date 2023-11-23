<template>
	<UCard
		class="cursor-pointer shadow-lg mb-4 hover:shadow-2xl hover:scale-105 duration-500"
		:ui="{
			body: { padding: 'sm:p-2' },
		}"
		v-if="photoCollection.preview_photos"
	>
		<div class="flex gap-3 h-[240px]">
			<NuxtImg
				class="rounded-lg"
				:src="photoCollection.preview_photos[0].urls.regular"
			></NuxtImg>
			<div class="h-[50%]">
				<NuxtImg
					class="mb-2 rounded-lg"
					:src="photoCollection.preview_photos[1].urls.small"
				></NuxtImg>
				<NuxtImg
					class="rounded-lg"
					:src="photoCollection.preview_photos[2].urls.small"
				></NuxtImg>
			</div>
		</div>
	</UCard>
</template>

<script setup lang="ts">
import type { Basic } from "unsplash-js/dist/methods/collections/types";

interface Props {
	photoCollection: Basic;
}
const props = defineProps<Props>();

console.log(props.photoCollection);
</script>

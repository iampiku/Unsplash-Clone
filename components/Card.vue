<template>
	<UCard
		class="cursor-pointer shadow-lg mb-4"
		:ui="{
			body: { padding: 'px-0 py-0 sm:p-4' },
			footer: { padding: 'px-1 py-1 sm:p-4' },
		}"
	>
		<NuxtImg
			format="webp"
			loading="lazy"
			class="rounded-lg h-auto max-w-full"
			:alt="props.photo.id"
			:src="props.photo.urls.regular"
		>
		</NuxtImg>
		<template #footer>
			<div class="flex justify-between">
				<div class="flex items-center">
					<UAvatar
						size="md"
						class="mr-2"
						:src="props.photo.user.profile_image.small"
					></UAvatar>

					<div class="flex flex-col text-sm">
						<span class="font-bold">{{ name }}</span>
						<span class="font-semibold">{{ publishedOn }}</span>
					</div>
				</div>

				<div class="flex items-center text-lg font-semibold">
					<UIcon name="i-heroicons-heart"></UIcon>
					<span class="ml-2">{{ props.photo.likes }}</span>
				</div>
			</div>
		</template>
	</UCard>
</template>

<script lang="ts" setup>
import type { Random } from "unsplash-js/dist/methods/photos/types";

interface Props {
	photo: Random;
}

const props = defineProps<Props>();

const name = computed(() => {
	return `${props.photo.user.first_name} ${props.photo.user.last_name}`;
});

const publishedOn = computed(() => {
	const originalData = new Date(props.photo.created_at);

	return originalData.toLocaleString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
});
</script>

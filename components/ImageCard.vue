<template>
	<UCard
		class="cursor-pointer shadow-lg mb-4 hover:shadow-2xl hover:scale-105 duration-500"
		:ui="{
			body: { padding: 'sm:p-41' },
			footer: { padding: 'sm:p-3' },
		}"
	>
		<NuxtImg
			format="webp"
			loading="lazy"
			class="rounded-lg h-auto w-full"
			:alt="props.photo.id"
			:src="props.photo.urls.small"
		>
		</NuxtImg>
		<template #footer>
			<div class="flex justify-between">
				<div class="flex">
					<UAvatar
						size="md"
						class="mr-2"
						alt="user_profile"
						:src="props.photo.user.profile_image.medium"
					></UAvatar>

					<div class="flex flex-col text-sm">
						<span class="font-bold">{{ props.photo.user.name }}</span>
						<span class="font-semibold">{{ publishedOn }}</span>
					</div>
				</div>

				<div class="flex items-center text-lg font-semibold">
					<UIcon name="i-heroicons-heart"></UIcon>
					<span class="ml-2">{{ likes }}</span>
				</div>
			</div>
		</template>
	</UCard>
</template>

<script lang="ts" setup>
import type { Random, Basic } from "unsplash-js/dist/methods/photos/types";
import { formatData } from "~/utils";

interface Props {
	photo: Random | Basic;
}
const props = defineProps<Props>();

const publishedOn = computed(() => {
	return formatData({ type: "Date", data: props.photo.created_at });
});

const likes = computed(() => {
	return formatData({ type: "Number", data: props.photo.likes });
});
</script>

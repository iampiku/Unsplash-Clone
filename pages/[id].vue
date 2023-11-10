<template>
	<UContainer class="max-w-full p-6 my-4">
		<UCard class="max-w-full">
			<template #header>
				<header class="flex justify-between">
					<div class="flex items-center">
						<UAvatar
							size="lg"
							class="mr-2"
							:src="state.photoDetails?.user.profile_image.small"
						></UAvatar>

						<div class="flex flex-col text-lg">
							<span class="font-bold">{{ name }}</span>
							<span class="font-semibold">{{ publishedOn }}</span>
						</div>
					</div>
					<div class="flex items-center text-lg font-semibold">
						<UIcon name="i-heroicons-heart"></UIcon>
						<span class="ml-2">{{ state.photoDetails?.likes }}</span>
					</div>
				</header>
			</template>
			<div class="grid grid-cols-12">
				<NuxtImg
					format="webp"
					loading="lazy"
					class="rounded-lg col-span-4"
					:alt="state.photoDetails?.id"
					:src="state.photoDetails?.urls.full"
				></NuxtImg>
				<div id="stats" class="col-span-8">
					<div class="flex justify-around text-2xl">
						<div>
							<p class="font-light">Views</p>
							<p class="font-semibold">234,543</p>
						</div>
						<div>
							<p class="font-light">Downloads</p>
							<p class="font-semibold">234,543</p>
						</div>
						<div>
							<p class="font-light">Published On</p>
							<p class="font-semibold">234,543</p>
						</div>
					</div>
				</div>
			</div>
		</UCard>
	</UContainer>
</template>

<script lang="ts" setup>
const route = useRoute();
const { state, fetchPhotoDetails } = useUnsplash();
fetchPhotoDetails(route.params.id.toString());

const name = computed(() => {
	return `${state.photoDetails?.user.first_name} ${state.photoDetails?.user.last_name}`;
});

const publishedOn = computed(() => {
	const originalData = new Date(state.photoDetails?.created_at ?? "");

	return originalData.toLocaleString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
});
</script>

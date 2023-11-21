<template>
	<UContainer class="max-w-full p-6 my-4" v-if="photo">
		<UCard class="max-w-full">
			<template #header>
				<header class="flex justify-between">
					<div class="flex items-center">
						<UAvatar
							size="lg"
							class="mr-2"
							:src="photo.user.profile_image.large"
						></UAvatar>

						<div class="flex flex-col text-lg">
							<span class="font-bold">{{ photo.user.name }}</span>
							<span class="font-semibold">{{ photo.user.bio }}</span>
						</div>
					</div>
					<div class="flex items-center text-xl font-semibold">
						<UIcon name="i-heroicons-heart"></UIcon>
						<span class="ml-2">{{ likes }}</span>

						<UButton
							size="xl"
							class="ml-6"
							:loading="loading"
							@click="handleDownload"
							icon="i-heroicons-arrow-down-tray"
						></UButton>
					</div>
				</header>
			</template>
			<div class="grid grid-cols-12">
				<NuxtImg
					format="webp"
					loading="lazy"
					class="rounded-lg col-span-4"
					:alt="photo.id"
					:src="photo.urls.full"
				></NuxtImg>

				<div id="stats" class="col-span-8">
					<div class="flex justify-around text-2xl">
						<div class="flex gap-2">
							<UIcon name="i-heroicons-eye" class="mt-2"></UIcon>
							<span>
								<p class="font-light">Views</p>
								<p class="font-semibold">{{ views }}</p>
							</span>
						</div>
						<div class="flex gap-2">
							<UIcon name="i-heroicons-arrow-down-tray" class="mt-2"></UIcon>
							<span>
								<p class="font-light">Downloads</p>
								<p class="font-semibold">{{ downloads }}</p>
							</span>
						</div>
						<div class="flex gap-2">
							<UIcon name="i-heroicons-calendar-days" class="mt-2"></UIcon>
							<span>
								<p class="font-light">Published On</p>
								<p class="font-semibold">{{ publishedOn }}</p>
							</span>
						</div>
					</div>

					<div class="">
						<header>Similar collections</header>
					</div>
				</div>
			</div>
		</UCard>
	</UContainer>
</template>

<script lang="ts" setup>
const route = useRoute();
const { photo, loading, fetchPhotoDetails, downloadPhoto } = useUnsplash();

fetchPhotoDetails(route.params.id.toString());

async function handleDownload() {
	await downloadPhoto({
		downloadLocation: photo.value.links.download_location,
	});
}

const publishedOn = computed(() => {
	const originalData = new Date(photo.value.created_at ?? "");

	return originalData.toLocaleString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	});
});

const views = computed(() => {
	return (photo.value.views ?? 0).toLocaleString("en-US");
});

const downloads = computed(() => {
	return (photo.value.downloads ?? 0).toLocaleString("en-US");
});

const likes = computed(() => {
	return (photo.value.likes ?? 0).toLocaleString("en-US");
});
</script>

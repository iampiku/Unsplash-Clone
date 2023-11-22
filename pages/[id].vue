<template>
	<UContainer class="max-w-full p-6 my-4" v-if="photo">
		<UCard class="max-w-full">
			<template #header>
				<header class="flex justify-between">
					<div class="flex items-center">
						<NuxtLink to="/">
							<UButton
								size="xl"
								class="mr-6"
								variant="ghost"
								icon="i-heroicons-arrow-left"
							></UButton>
						</NuxtLink>
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
							variant="ghost"
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
const { formatData } = useUtil();
const { photo, loading, fetchPhotoDetails, downloadPhoto } = useUnsplash();

fetchPhotoDetails(route.params.id.toString());

async function handleDownload() {
	await downloadPhoto({
		downloadLocation: photo.value.links.download_location,
	});
}

const publishedOn = computed(() => {
	return formatData({ type: "Date", data: photo.value.created_at });
});

const views = computed(() => {
	return formatData({ type: "Number", data: photo.value.views });
});

const downloads = computed(() => {
	return formatData({ type: "Number", data: photo.value.downloads });
});

const likes = computed(() => {
	return formatData({ type: "Number", data: photo.value.likes });
});
</script>

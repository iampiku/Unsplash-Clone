<template>
	<ImageInfoSkeletonLoader v-if="detailsLoading" />
	<UContainer class="sm:max-w-xs md:max-w-full p-6 my-4" v-if="photo">
		<UCard>
			<template #header>
				<header class="flex justify-between">
					<div class="flex items-center">
						<NuxtLink to="/">
							<UButton
								class="mr-2"
								variant="ghost"
								icon="i-heroicons-arrow-left"
							></UButton>
						</NuxtLink>
						<UAvatar
							class="mr-2"
							:src="photo.user.profile_image.medium"
						></UAvatar>

						<div class="flex flex-col text-sm md:text-base">
							<span class="font-bold">{{ photo.user.name }}</span>
							<UTooltip
								v-if="photo.user.bio"
								:open-delay="200"
								:text="photo.user.bio"
								:popper="{ placement: 'auto' }"
								:ui="{
									base: '[@media(pointer:coarse)]:hidden h-7 px-2 py-1 text-sm font-normal relative',
									width: 'max-w-full',
								}"
							>
								<span class="font-semibold truncate max-w-[90px] sm:max-w-lg">{{
									photo.user.bio
								}}</span>
							</UTooltip>
						</div>
					</div>
					<div class="flex items-center text-sm md:text-base font-semibold">
						<UIcon name="i-heroicons-heart"></UIcon>
						<span class="ml-2">{{ likes }}</span>

						<UButton
							class="ml-6"
							variant="ghost"
							:loading="loading"
							@click="handleDownload"
							icon="i-heroicons-arrow-down-tray"
						></UButton>
					</div>
				</header>
			</template>
			<NuxtImg
				format="webp"
				loading="eager"
				:alt="photo.id"
				:src="photo.urls.regular"
				class="rounded-lg mx-auto max-w-full md:max-w-3xl"
			></NuxtImg>

			<div id="stats" class="pt-6">
				<div
					class="flex flex-col md:flex-row justify-center gap-4 items-center text-base md:text-xl w-full"
				>
					<UCard
						class="flex text-center justify-center gap-2 w-full"
						:ui="{
							body: { padding: 'sm:p-2' },
						}"
					>
						<UIcon name="i-heroicons-eye" class="mt-2"></UIcon>
						<span>
							<p class="font-light">Views</p>
							<p class="font-semibold">{{ views }}</p>
						</span>
					</UCard>
					<UCard
						class="flex text-center justify-center gap-2 w-full"
						:ui="{
							body: { padding: 'sm:p-2' },
						}"
					>
						<UIcon name="i-heroicons-arrow-down-tray" class="mt-2"></UIcon>
						<span>
							<p class="font-light">Downloads</p>
							<p class="font-semibold">{{ downloads }}</p>
						</span>
					</UCard>
					<UCard
						class="flex text-center justify-center gap-2 w-full"
						:ui="{
							body: { padding: 'sm:p-2' },
						}"
					>
						<UIcon name="i-heroicons-calendar-days" class="mt-2"></UIcon>
						<span>
							<p class="font-light">Published On</p>
							<p class="font-semibold">{{ publishedOn }}</p>
						</span>
					</UCard>
				</div>
			</div>
		</UCard>
	</UContainer>
	<UContainer v-else>
		<Error :message="errorMessage" @onRefresh="handleRefresh" />
	</UContainer>
</template>

<script lang="ts" setup>
import ImageInfoSkeletonLoader from "~/components/SkeletonLoader/ImageInfoSkeletonLoader.vue";

import { formatData } from "~/utils";

const route = useRoute();
const detailsLoading = useState(() => false);
const { photo, loading, errorMessage, fetchPhotoDetails, downloadPhoto } =
	useUnsplash();

onMounted(async () => {
	detailsLoading.value = true;
	try {
		await fetchPhotoDetails(route.params.id.toString());
	} finally {
		detailsLoading.value = false;
	}
});

async function handleDownload() {
	await downloadPhoto({
		downloadLocation: photo.value.links.download_location,
	});
}

function handleRefresh() {
	clearError({ redirect: "/" });
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

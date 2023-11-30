<template>
	<main
		class="bg-gray-200 dark:bg-gray-800 flex max-w-full justify-evenly flex-col py-20 md:py-24 px-16 md:px-16"
	>
		<div class="pb-10 items-start">
			<p class="uppercase font-bold text-sm tracking-wider dark:text-slate-100">
				Welcome to
			</p>
			<p
				class="text-4xl uppercase font-extrabold tracking-wider dark:text-slate-100"
			>
				Search <br />
				Unsplash
			</p>
			<p class="py-6 text-xl">
				Search through beautiful, free images and photos that you can <br />
				download and use for any project. Better than any royalty free or stock
				photos.
			</p>

			<div class="flex gap-2">
				<UInput
					size="lg"
					v-model="query"
					class="flex-1 max-w-[630px]"
					placeholder="Search Images 📸"
					@keyup.enter="handleSearch({ query, page: 1 })"
					icon="i-heroicons-magnifying-glass-20-solid"
				/>
				<UButton
					class="px-4"
					variant="soft"
					:loading="loading"
					:disabled="isSearchEnable"
					@click="handleSearch({ query, page: 1 })"
					>Search</UButton
				>
			</div>
			<div class="flex flex-wrap py-4">
				<UBadge
					:key="tag"
					variant="soft"
					@click="handleSearch({ query: tag, page: 1 })"
					class="mx-1 rounded-full uppercase cursor-pointer hover:scale-110 duration-500"
					v-for="tag in [
						'flower',
						'wallpapers',
						'background',
						'happy',
						'love',
						'mountains',
						'city',
					]"
					>{{ tag }}</UBadge
				>
			</div>
		</div>

		<div
			class="scroll-smooth columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4"
			v-if="!loading"
		>
			<NuxtLink :to="`/${photo.id}`" v-for="photo in photoList">
				<ImageCard :photo="photo" :key="photo.id" />
			</NuxtLink>
		</div>
		<div v-else class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
			<CardSkeletonLoader :card-count="30" />
		</div>

		<UPagination
			v-if="query.length > 3"
			v-model="currentPage"
			@click="onPagination"
			:prev-button="{
				icon: 'i-heroicons-arrow-small-left-20-solid',
				label: 'Prev',
				color: 'gray',
			}"
			:next-button="{
				icon: 'i-heroicons-arrow-small-right-20-solid',
				trailing: true,
				label: 'Next',
				color: 'gray',
			}"
			class="flex justify-center pt-6"
			:total="photos.total_pages"
		/>
	</main>

	<Footer />
</template>

<script setup lang="ts">
import CardSkeletonLoader from "~/components/SkeletonLoader/CardSkeletonLoader.vue";
// const route = useRoute();
const query = useState(() => "");
const currentPage = useState(() => 1);
const { randomPhotos, photos, loading, searchPhotos, fetchRandomPhotos } =
	useUnsplash();

onMounted(async () => {
	await fetchRandomPhotos();
});

async function handleSearch(params: { query: string; page: number }) {
	if (params.query.length) query.value = params.query;
	if (params.query !== query.value) {
		currentPage.value = 1;
		params.query = query.value;
	}
	await searchPhotos(params);
	// route.params = {
	// 	search: params.query,
	// };
}

const photoList = computed(() => {
	return query.value.length ? photos.value.results : randomPhotos.value;
});

const isSearchEnable = computed(() => {
	return query.value.length < 3;
});

async function onPagination() {
	await searchPhotos({ query: query.value, page: currentPage.value });
}
</script>

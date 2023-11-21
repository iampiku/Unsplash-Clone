<template>
	<main class="container">
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
					class="flex-1 max-w-[610px]"
					placeholder="Search Images 📸"
					@keyup.enter="handleSearch({ query, page: 1 })"
					icon="i-heroicons-magnifying-glass-20-solid"
				/>
				<UButton
					class="px-4"
					@click="handleSearch({ query, page: 1 })"
					:disabled="isSearchEnable"
					:loading="loading"
					>Search</UButton
				>
			</div>
			<div class="flex flex-wrap py-4">
				<UBadge
					:key="tag"
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
		<template v-if="loading">
			<div class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
				<CardSkeletonLoader :card-count="10" />
			</div>
		</template>
		<template v-else>
			<div class="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
				<NuxtLink :to="`/${photo.id}`" v-for="photo in randomPhotos">
					<ImageCard :photo="photo" :key="photo.id" />
				</NuxtLink>
			</div>
		</template>

		<UPagination
			v-if="false"
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
			:total="photos.total_pages || 0"
		/>
	</main>
</template>

<script lang="ts" setup>
const route = useRoute();
const query = useState(() => "");
const currentPage = useState(() => 1);
const { randomPhotos, photos, loading, searchPhotos, fetchRandomPhotos } =
	useUnsplash();

onMounted(async () => {
	await fetchRandomPhotos();
});

async function handleSearch(params: { query: string; page: number }) {
	if (params.query.length) query.value = params.query;
	// if (params.query !== query.value) currentPage.value = 1;
	await searchPhotos(params);
	// route.params = {
	// 	search: params.query,
	// };
}

const isSearchEnable = computed(() => {
	return query.value.length < 3;
});

async function onPagination() {
	await searchPhotos({ query: query.value, page: currentPage.value });
}
</script>

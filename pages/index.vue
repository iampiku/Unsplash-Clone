<template>
	<main
		class="bg-gray-200 dark:bg-gray-800 flex max-w-full justify-evenly flex-col py-20 md:py-24 px-11 md:px-16"
	>
		<!-- Header Section -->
		<div class="pb-10 items-start">
			<div class="flex justify-between items-start">
				<header>
					<p
						class="uppercase font-bold text-sm tracking-wider dark:text-slate-100"
					>
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
						download and use for any project. Better than any royalty free or
						stock photos.
					</p>
				</header>

				<ThemeSwitch />
			</div>

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
					class="mx-1 rounded-full uppercase cursor-pointer hover:scale-110 duration-500 my-1 md:my-0"
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

		<!-- Image Grid -->
		<template v-if="!photoList.length">
			<Error message="No search result found!" />
		</template>
		<template v-else>
			<div
				class="scroll-smooth columns-1 md:columns-2 lg:columns-4 gap-4"
				v-if="!loading"
			>
				<NuxtLink :to="`/${photo.id}`" v-for="photo in photoList">
					<ImageCard :photo="photo" :key="photo.id" />
				</NuxtLink>
			</div>
			<div
				v-else
				class="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4"
			>
				<CardSkeletonLoader :card-count="30" />
			</div>
		</template>

		<!-- Pagination -->
		<UPagination
			v-model="currentPage"
			@click="onPagination"
			v-if="query.length > 3"
			class="flex justify-center pt-6"
			:total="photos?.total_pages || 0"
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
		/>
	</main>

	<Footer />
</template>

<script setup lang="ts">
/**
 * Component
 */
import CardSkeletonLoader from "~/components/SkeletonLoader/CardSkeletonLoader.vue";

/**
 * Router
 */
const route = useRoute();
const router = useRouter();

/**
 * State
 */
const query = useState(() => (route.query.search as string) ?? "");
const currentPage = useState(() => 1);

/**
 * Composables
 */
const { randomPhotos, photos, loading, searchPhotos, fetchRandomPhotos } =
	useUnsplash();

onMounted(async () => {
	if (query.value.length !== 0) setSearchQuery(query.value);
	if (route.query.search)
		await searchPhotos({ query: route.query.search as string, page: 1 });
	else await fetchRandomPhotos();
});

function setSearchQuery(query: string) {
	router.push({
		path: "/",
		query: {
			search: query,
		},
	});
}

const isSearchEnable = computed(() => {
	return query.value.length < 3;
});

async function handleSearch(params: { query: string; page: number }) {
	if (params.query.length < 3) return;
	query.value = params.query;
	setSearchQuery(query.value);
	await searchPhotos(params);
}

const photoList = computed(() => {
	if (query.value.length < 3 && route.query.search === undefined)
		return randomPhotos.value;
	else if (route.query.search?.length !== 0 || query.value.length !== 0)
		return photos.value?.results ?? [];
	else return [];
});

async function onPagination() {
	await searchPhotos({ query: query.value, page: currentPage.value });
}
</script>

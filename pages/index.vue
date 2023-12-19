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
					:disabled="isQueryShort"
					@click="handleSearch({ query, page: 1 })"
					>Search</UButton
				>
			</div>
			<div class="flex flex-wrap py-4">
				<UBadge
					:key="tag"
					variant="soft"
					@click="onChipClick({ query: tag, page: 1 })"
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
		<template v-if="errorMessage">
			<Error :message="errorMessage" @onRefresh="clearSearch" />
		</template>
		<template v-else>
			<div
				class="scroll-smooth columns-1 md:columns-2 lg:columns-4 gap-4"
				v-if="loading"
			>
				<CardSkeletonLoader :card-count="30" />
			</div>
			<div
				v-else
				class="scroll-smooth columns-1 md:columns-2 lg:columns-4 gap-4"
			>
				<NuxtLink :to="`/${photo.id}`" v-for="photo in photoList">
					<ImageCard :photo="photo" :key="photo.id" />
				</NuxtLink>
			</div>
		</template>

		<!-- Pagination -->
		<UPagination
			v-if="searchExist && photos?.total_pages"
			v-model="currentPage"
			class="mx-auto pt-6"
			@click="onPagination"
			:total="photos.total_pages"
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
 * Composable
 */
const {
	randomPhotos,
	photos,
	loading,
	errorMessage,
	searchPhotos,
	fetchRandomPhotos,
} = useUnsplash();

interface Params {
	query: string;
	page: number;
}

onMounted(async () => {
	if (searchExist) {
		setSearchQuery(query.value);
		await handleSearch({ query: query.value, page: currentPage.value });
	} else await fetchRandomPhotos();
});

function setSearchQuery(query: string, resetQuery = false) {
	resetQuery
		? router.push({ path: "/", query: {} })
		: router.push({
				path: "/",
				query: {
					search: query,
				},
		  });
}

const searchExist = computed(() => {
	return !isQueryShort || route.query.search?.length !== 0;
});

const isQueryShort = computed(() => {
	return query.value.length < 3;
});

function searchResultExist() {
	return photos.value && photos.value.results.length !== 0;
}

function onChipClick(params: Params) {
	query.value = params.query; // update query with new value.
	setSearchQuery(params.query); // set router search query.
	handleSearch(params); // perform search.
}

async function handleSearch(params: Params) {
	await searchPhotos(params);
}

const photoList = computed(() => {
	return searchResultExist() ? photos.value.results : randomPhotos.value;
});

async function onPagination() {
	await handleSearch({ query: query.value, page: currentPage.value });
}

function clearSearch() {
	query.value = "";
	errorMessage.value = "";
	setSearchQuery("", true);
}
</script>

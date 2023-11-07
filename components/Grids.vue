<template>
	<main class="flex flex-col mx-[15%]">
		<div class="pb-10">
			<p class="uppercase font-bold text-sm tracking-wider dark:text-slate-300">
				Welcome to
			</p>
			<p class="text-4xl uppercase font-extrabold tracking-wider">
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
					class="flex-1 max-w-[650px]"
					placeholder="Search Images 📸"
					icon="i-heroicons-magnifying-glass-20-solid"
				/>
				<UButton class="px-4" @click="handleSearch" :disabled="searchEnable"
					>Search</UButton
				>
			</div>
		</div>
		<template v-if="loading">
			<div class="container columns-3 gap-6">
				<UCard v-for="i in 8" :key="i" class="shadow-xl mb-4">
					<USkeleton
						class="h-[300px] w-[370px] mb-6"
						:ui="{ rounded: 'rounded-lg' }"
					/>
					<div class="flex">
						<USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
						<div class="flex flex-col gap-2 py-1 ml-2">
							<USkeleton class="h-4 w-[150px]" />
							<USkeleton class="h-4 w-[100px]" />
						</div>
					</div>
				</UCard>
			</div>
		</template>
		<template v-else>
			<div class="container columns-3 gap-6">
				<Card
					v-for="photo in apiResponse"
					:key="photo.id"
					:photo="photo"
				></Card>
			</div>
		</template>
	</main>
</template>

<script lang="ts" setup>
// const { randomPhotos, fetchRandomPhotos, loading, errorMessage } =
// 	useUnsplash();

// fetchRandomPhotos();

import apiResponse from "../apiResponse.json";

const query = useState(() => "");

function handleSearch() {
	console.log(query.value);
}

const searchEnable = computed(() => {
	return query.value.length < 3;
});

//
</script>

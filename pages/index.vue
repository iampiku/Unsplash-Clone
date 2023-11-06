<template>
	<main class="bg-slate-200 dark:bg-slate-800 pt-[100px]">
		<div class="pl-32">
			<div class="pb-4">
				<p
					class="uppercase font-bold text-sm tracking-wider dark:text-slate-300"
				>
					Welcome to
				</p>
				<p class="text-4xl uppercase font-extrabold tracking-wider">
					Search <br />
					Unsplash
				</p>
				<p class="py-6 text-xl">
					Search through beautiful, free images and photos that you can <br />
					download and use for any project. Better than any royalty free or
					stock photos.
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

			<Grids />
		</div>

		<footer class="text-center py-10">
			Made with ❤️ and Nuxtjs by
			<span class="font-semibold">Pradipta Chatterjee</span>
		</footer>
	</main>
</template>

<script lang="ts" setup>
const query = useState(() => "");

function handleSearch() {
	console.log(query.value);
}

const searchEnable = computed(() => {
	return query.value.length < 3;
});
</script>

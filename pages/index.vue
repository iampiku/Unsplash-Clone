<template>
	<main class="bg-slate-200 dark:bg-slate-800">
		<UContainer class="pt-[50px]">
			<div class="pb-4 px-7">
				<p
					class="uppercase font-bold text-sm tracking-wider dark:text-slate-300"
				>
					Welcome to
				</p>
				<p class="text-4xl uppercase font-extrabold tracking-wider">
					Search <br />
					Unsplash
				</p>
				<p class="py-6 text-xl font-base">
					Search through beautiful, free images and photos that you can <br />
					download and use for any project. Better than any royalty free or
					stock photos.
				</p>

				<div class="flex gap-2">
					<UInput
						size="lg"
						variant="gray"
						class="flex-1"
						v-model="query"
						placeholder="Search Images 📸"
						icon="i-heroicons-magnifying-glass-20-solid"
					/>
					<UButton class="px-4">Search</UButton>
				</div>
			</div>

			<Grids />

			<footer class="text-center py-10">
				Made with ❤️ and Nuxtjs by
				<span class="font-semibold">Pradipta Chatterjee</span>
			</footer>
		</UContainer>
	</main>
</template>

<script lang="ts" setup>
const query = useState(() => "");
</script>

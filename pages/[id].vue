<template>
	<UContainer>
		<UCard class="grid grid-cols-12 grid-rows-6">
			<header class="row-span-2">
				<Placeholder class="h-32"></Placeholder>
			</header>

			<div class="row-span-4">
				<div class="col-span-10"></div>
				<div class="col-span-2"></div>
			</div>
		</UCard>
	</UContainer>
</template>

<script lang="ts" setup>
const route = useRoute();
const { state, fetchPhotoDetails } = useUnsplash();

fetchPhotoDetails(route.params.id.toString());
</script>

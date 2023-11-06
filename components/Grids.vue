<template>
	<main class="flex flex-wrap gap-5 justify-center">
		<template v-if="loading">
			<UCard v-for="i in 5" :key="i" class="shadow-xl">
				<USkeleton
					class="h-[300px] w-[325px] mb-6"
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
		</template>
		<template v-else>
			<Card v-for="photo in apiResponse" :key="photo.id" :photo="photo"></Card>
		</template>
	</main>
</template>

<script lang="ts" setup>
import apiResponse from "../apiResponse.json";

const loading = useState(() => false);
</script>

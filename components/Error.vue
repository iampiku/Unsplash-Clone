<template>
	<section
		class="flex flex-col h-screen justify-center items-center text-center max-w-full"
	>
		<img
			loading="lazy"
			class="rounded-lg max-w-lg"
			alt="not_found"
			src="~/assets/images/internal-server-error-500.svg"
		/>

		<h2 class="font-mono pb-3">{{ props.message }}</h2>
		<UButton @click="errorHandler">{{ props.buttonLabel }}</UButton>
	</section>
</template>

<script setup lang="ts">
interface Props {
	message?: string;
	buttonLabel?: string;
}

const props = withDefaults(defineProps<Props>(), {
	buttonLabel: "Refresh",
	message: "Oops something went wrong",
});
const errorHandler = () => clearError({ redirect: "/" });
</script>

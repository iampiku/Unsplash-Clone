<template>
	<section>
		<h2>{{ props.error.statusCode }}</h2>
		<UButton @click="errorHandler">Redirect to Home</UButton>
	</section>
</template>

<script setup lang="ts">
const props = defineProps({
	error: Object,
});
const errorHandler = () => clearError({ redirect: "/" });
</script>

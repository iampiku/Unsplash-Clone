<template>
	<Error :message="props.error.message" button-label="Redirect to Home" />
</template>

<script setup lang="ts">
interface Props {
	error: {
		message: string;
	};
}
const props = defineProps<Props>();
</script>

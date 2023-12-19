<template>
	<Error
		@onRefresh="errorHandler"
		:message="props.error.message"
		button-label="Redirect to Home"
	/>
</template>

<script setup lang="ts">
interface Props {
	error: {
		message: string;
	};
}
const props = defineProps<Props>();

const errorHandler = () => clearError({ redirect: "/" });
</script>

<template>
	<UCard v-for="i in props.cardCount" :key="i" class="shadow-xl mb-4 w-[380px]">
		<USkeleton
			:class="`${i % 2 === 0 ? 'h-[400px]' : 'h-[250px]'} mx-w-full mb-6`"
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

<script setup lang="ts">
interface Props {
	cardCount: number;
}
const props = defineProps<Props>();
</script>

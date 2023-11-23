<template>
	<UCard
		class="cursor-pointer shadow-lg mb-4 hover:shadow-2xl max-w-full hover:scale-105 duration-500"
		:ui="{
			body: { padding: 'sm:p-2' },
		}"
	>
		<div class="flex gap-2">
			<USkeleton class="h-[250px] w-[250px]"></USkeleton>
			<div class="">
				<USkeleton class="h-[120px] w-[120px] mb-2"></USkeleton>
				<USkeleton class="h-[120px] w-[120px]"></USkeleton>
			</div>
		</div>
	</UCard>
</template>

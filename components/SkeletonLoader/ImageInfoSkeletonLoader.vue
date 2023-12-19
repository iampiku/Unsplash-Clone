<template>
	<UCard>
		<template #header>
			<div class="flex justify-between items-center">
				<div class="flex">
					<NuxtLink to="/">
						<UButton
							size="xl"
							class="mr-6"
							variant="ghost"
							icon="i-heroicons-arrow-left"
						></UButton>
					</NuxtLink>
					<USkeleton class="h-12 w-12" :ui="{ rounded: 'rounded-full' }" />
					<div class="flex flex-col gap-2 py-1 ml-2">
						<USkeleton class="h-4 w-[150px]" />
						<USkeleton class="h-4 w-[100px]" />
					</div>
				</div>
				<div class="flex flex-col items-end gap-2">
					<USkeleton class="h-4 w-[150px]" />
					<USkeleton class="h-4 w-[180px]" />
				</div>
			</div>
		</template>

		<USkeleton class="h-[650px] w-[560px] mx-auto"></USkeleton>
		<section
			class="flex justify-evenly flex-col md:flex-row gap-4 text-xl pt-6"
		>
			<UCard class="flex gap-2 w-full justify-center text-center">
				<UIcon name="i-heroicons-eye" class="mt-2"></UIcon>
				<span>
					<USkeleton class="h-4 w-[150px] mb-2"></USkeleton>
					<USkeleton class="h-4 w-[150px]"></USkeleton>
				</span>
			</UCard>
			<UCard class="flex gap-2 w-full justify-center text-center">
				<UIcon name="i-heroicons-arrow-down-tray" class="mt-2"></UIcon>
				<span>
					<USkeleton class="h-4 w-[150px] mb-2"></USkeleton>
					<USkeleton class="h-4 w-[150px]"></USkeleton>
				</span>
			</UCard>
			<UCard class="flex gap-2 w-full justify-center text-center">
				<UIcon name="i-heroicons-calendar-days" class="mt-2"></UIcon>
				<span>
					<USkeleton class="h-4 w-[150px] mb-2"></USkeleton>
					<USkeleton class="h-4 w-[150px]"></USkeleton>
				</span>
			</UCard>
		</section>
	</UCard>
</template>

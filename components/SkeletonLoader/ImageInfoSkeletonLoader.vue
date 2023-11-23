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
		<div class="grid grid-cols-12">
			<USkeleton class="h-[650px] col-span-4"></USkeleton>
			<section class="col-span-8 flex justify-evenly text-xl">
				<div class="flex gap-2">
					<UIcon name="i-heroicons-eye" class="mt-2"></UIcon>
					<span>
						<USkeleton class="h-4 w-[150px] mb-2"></USkeleton>
						<USkeleton class="h-4 w-[150px]"></USkeleton>
					</span>
				</div>
				<div class="flex gap-2">
					<UIcon name="i-heroicons-arrow-down-tray" class="mt-2"></UIcon>
					<span>
						<USkeleton class="h-4 w-[150px] mb-2"></USkeleton>
						<USkeleton class="h-4 w-[150px]"></USkeleton>
					</span>
				</div>
				<div class="flex gap-2">
					<UIcon name="i-heroicons-calendar-days" class="mt-2"></UIcon>
					<span>
						<USkeleton class="h-4 w-[150px] mb-2"></USkeleton>
						<USkeleton class="h-4 w-[150px]"></USkeleton>
					</span>
				</div>
			</section>
		</div>
	</UCard>
</template>

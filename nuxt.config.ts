// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["@nuxt/ui", "@nuxt/image"],
	// image: {
	// 	domains: ["https://images.unsplash.com"],
	// },
	runtimeConfig: {
		public: {
			ACCESS_KEY: import.meta.env.NUXT_ACCESS_KEY,
		},
	},
});

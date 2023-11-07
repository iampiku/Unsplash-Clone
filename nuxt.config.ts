// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	devtools: { enabled: true },
	modules: ["@nuxt/ui", "@nuxt/image"],
	runtimeConfig: {
		public: {
			ACCESS_KEY: import.meta.env.NUXT_ACCESS_KEY,
		},
	},
});

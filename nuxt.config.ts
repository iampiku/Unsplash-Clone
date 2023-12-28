// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	pages: true,
	devtools: { enabled: true },
	modules: ["@nuxt/ui", "@nuxt/image"],
	app: {
		head: {
			charset: "utf-16",
			title: "Unsplash Clone 📷",
			meta: [
				{
					name: "Unsplash Clone",
					content:
						"Application to search and download free stock royalty free images.",
				},
			],
		},
	},
	colorMode: {
		preference: "light",
	},
	runtimeConfig: {
		public: {
			ACCESS_KEY: import.meta.env.NUXT_ACCESS_KEY,
		},
	},
});

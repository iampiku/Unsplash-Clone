import type { Random, Basic } from "unsplash-js/dist/methods/photos/types";
import unsplashService from "~/service";

export function useUnsplash() {
	const randomPhotos = useState<Random[]>(() => []);
	const searchResults = useState<{
		results: Basic[];
		total: number;
		total_pages: number;
	}>(() => ({
		results: [],
		total: 0,
		total_pages: 0,
	}));
	const loading = useState(() => false);
	const errorMessage = useState(() => "");

	const ACCESS_KEY = useRuntimeConfig().public.ACCESS_KEY;

	async function fetchRandomPhotos() {
		loading.value = true;
		try {
			const { errors, response, type } = await unsplashService(
				ACCESS_KEY
			).photos.getRandom({ count: 30 });
			if (type === "error") {
				errorMessage.value = Array.isArray(errors)
					? errors.map((error) => error).join(",")
					: errors;
				return;
			}
			if (Array.isArray(response))
				response.forEach((photo) => randomPhotos.value.push(photo));
			else randomPhotos.value.push(response);
		} catch {
			errorMessage.value = "Network error!!!";
		} finally {
			loading.value = false;
		}
	}

	async function searchPhotos(params: { query: string; page: number }) {
		loading.value = true;
		try {
			const { errors, response, type } = await unsplashService(
				ACCESS_KEY
			).search.getPhotos({
				query: params.query,
				page: params.page,
				perPage: 10,
			});
			if (type === "error") {
				errorMessage.value = Array.isArray(errors)
					? errors.map((error) => error).join(",")
					: errors;
				return;
			}
			if (response) searchResults.value = response;
		} catch {
			errorMessage.value = "Network error!!";
		} finally {
			loading.value = false;
		}
	}

	return {
		loading,
		errorMessage,
		randomPhotos,
		searchResults,
		searchPhotos,
		fetchRandomPhotos,
	};
}

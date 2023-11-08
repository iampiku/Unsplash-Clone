import type { Errors } from "unsplash-js/dist/helpers/errors";
import type {
	Random,
	Basic,
	Full,
} from "unsplash-js/dist/methods/photos/types";
import unsplashService from "~/service";

export function useUnsplash() {
	const defaultSearchResults = {
		results: [],
		total: 0,
		total_pages: 0,
	};
	const networkError = "Network error!";
	const unsplashServiceInstance = unsplashService(
		useRuntimeConfig().public.ACCESS_KEY
	);

	const state = useState<{
		loading: boolean;
		errorMessage: string;
		photoDetails: Full;
		randomPhotos: Random[];
		searchResults: { results: Basic[]; total: number; total_pages: number };
	}>(() => ({
		loading: false,
		errorMessage: "",
		photoDetails: {},
		randomPhotos: [],
		searchResults: { results: [], total: 0, total_pages: 0 },
	}));

	console.log("composable state");
	console.log(state.value);

	function _onError(errors: Errors) {
		return Array.isArray(errors) ? errors.toString() : errors;
	}

	async function fetchRandomPhotos() {
		state.value.loading = true;
		try {
			const { errors, response, type } =
				await unsplashServiceInstance.photos.getRandom({ count: 30 });
			if (type === "error") {
				state.value.errorMessage = _onError(errors);
				return;
			}
			if (Array.isArray(response)) state.value.randomPhotos = response;
			else state.value.randomPhotos.push(response);
		} catch {
			state.value.errorMessage = networkError;
			state.value.randomPhotos = [];
		} finally {
			state.value.loading = false;
		}
	}

	async function searchPhotos(params: { query: string; page: number }) {
		state.value.loading = true;
		try {
			const { errors, response, type } =
				await unsplashServiceInstance.search.getPhotos({
					query: params.query,
					page: params.page,
					perPage: 10,
				});
			if (type === "error") {
				state.value.errorMessage = _onError(errors);
				return;
			}
			if (response) state.value.searchResults = response;
		} catch {
			state.value.errorMessage = networkError;
			state.value.searchResults = defaultSearchResults;
		} finally {
			state.value.loading = false;
		}
	}

	async function fetchPhotoDetails(photoId: string) {
		state.value.loading = true;
		try {
			const { errors, response, type } =
				await unsplashServiceInstance.photos.get({ photoId });
			if (type === "error") {
				state.value.errorMessage = _onError(errors);
				return;
			}
			if (response) state.value.photoDetails = response;
		} catch {
			state.value.errorMessage = networkError;
		} finally {
			state.value.loading = false;
		}
	}

	return {
		state,
		searchPhotos,
		fetchRandomPhotos,
		fetchPhotoDetails,
	};
}

import type { Errors } from "unsplash-js/dist/helpers/errors";
import type {
	Random,
	Basic,
	Full,
} from "unsplash-js/dist/methods/photos/types";

import unsplashService from "~/service";

interface State {
	theme: string;
	loading: boolean;
	errorMessage: string;
	photoDetails: Full | null;
	photos: {
		results: Array<Random | Basic>;
		total?: number;
		total_pages?: number;
	};
}

export function useUnsplash() {
	const defaultState = {
		theme: "light",
		loading: false,
		errorMessage: "",
		photoDetails: null,
		photos: {
			total: 0,
			results: [],
			total_pages: 0,
		},
	};
	const networkError = "Network error!";
	const unsplashServiceInstance = unsplashService(
		useRuntimeConfig().public.ACCESS_KEY
	);

	const state = reactive<State>(defaultState);

	function _onError(errors: Errors) {
		return Array.isArray(errors) ? errors.toString() : errors;
	}

	async function fetchRandomPhotos() {
		state.loading = true;
		try {
			const { errors, response, type } =
				await unsplashServiceInstance.photos.getRandom({ count: 30 });
			if (type === "error") {
				state.errorMessage = _onError(errors);
				return;
			}
			if (Array.isArray(response)) state.photos.results = response;
			else state.photos.results.push(response);
		} catch {
			state.errorMessage = networkError;
			state.photos.results = [];
		} finally {
			state.loading = false;
		}
	}

	async function searchPhotos(params: { query: string; page: number }) {
		state.loading = true;
		try {
			const { errors, response, type } =
				await unsplashServiceInstance.search.getPhotos({
					query: params.query,
					page: params.page,
					perPage: 10,
				});
			if (type === "error") {
				state.errorMessage = _onError(errors);
				return;
			}
			if (response) state.photos = response;
		} catch {
			state.errorMessage = networkError;
			state.photos = { results: [], total: 0, total_pages: 0 };
		} finally {
			state.loading = false;
		}
	}

	async function fetchPhotoDetails(photoId: string) {
		state.loading = true;
		try {
			const { errors, response, type } =
				await unsplashServiceInstance.photos.get({ photoId });
			if (type === "error") {
				state.errorMessage = _onError(errors);
				return;
			}
			if (response) state.photoDetails = response;
		} catch {
			state.errorMessage = networkError;
		} finally {
			state.loading = false;
		}
	}

	return {
		state,
		searchPhotos,
		fetchRandomPhotos,
		fetchPhotoDetails,
	};
}

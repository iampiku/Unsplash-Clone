import type { Errors } from "unsplash-js/dist/helpers/errors";
import type { Random, Full } from "unsplash-js/dist/methods/photos/types";
import type { Photos } from "unsplash-js/dist/methods/search/types/response";

import unsplashService from "~/service";

export function useUnsplash() {
	/**
	 * State
	 */
	const photo = useState<Full>();
	const photos = useState<Photos>();
	const loading = useState(() => false);
	const errorMessage = useState(() => "");
	const randomPhotos = useState<Array<Random>>();

	const networkError = "Network error!";

	/**
	 * initialing unsplash instance
	 */
	const unsplashServiceInstance = unsplashService(
		useRuntimeConfig().public.ACCESS_KEY
	);

	function _onError(errors: Errors) {
		errorMessage.value = Array.isArray(errors) ? errors.toString() : errors;
	}

	async function fetchRandomPhotos() {
		loading.value = true;
		try {
			const { errors, response, type } =
				await unsplashServiceInstance.photos.getRandom({ count: 30 });
			if (type === "error") {
				_onError(errors);
				return;
			}
			if (Array.isArray(response)) randomPhotos.value = response;
			else randomPhotos.value.push(response);
		} catch {
			errorMessage.value = networkError;
			randomPhotos.value = [];
		} finally {
			loading.value = false;
		}
	}

	async function searchPhotos(params: { query: string; page: number }) {
		loading.value = true;
		try {
			const { errors, response, type } =
				await unsplashServiceInstance.search.getPhotos({
					query: params.query,
					page: params.page,
					perPage: 25,
				});
			if (type === "error") {
				_onError(errors);
				return;
			}
			if (response) photos.value = response;
		} catch {
			errorMessage.value = networkError;
			photos.value = { results: [], total: 0, total_pages: 0 };
		} finally {
			loading.value = false;
		}
	}

	async function fetchPhotoDetails(photoId: string) {
		loading.value = true;
		try {
			const { errors, response, type } =
				await unsplashServiceInstance.photos.get({ photoId });
			if (type === "error") {
				_onError(errors);
				return;
			}
			if (response) photo.value = response;
		} catch {
			errorMessage.value = networkError;
			photo.value = Object.create({});
		} finally {
			loading.value = false;
		}
	}

	async function downloadPhoto(downloadLocation: string) {
		try {
			const { response, type, errors } =
				await unsplashServiceInstance.photos.trackDownload({
					downloadLocation: downloadLocation,
				});
			if (type === "error") {
				_onError(errors);
				return;
			}
			return response.url;
		} catch {
			console.error("Oops something went wrong");
		}
	}

	return {
		photo,
		photos,
		loading,
		errorMessage,
		randomPhotos,
		searchPhotos,
		downloadPhoto,
		fetchRandomPhotos,
		fetchPhotoDetails,
	};
}

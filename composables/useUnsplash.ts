import type { Errors } from "unsplash-js/dist/helpers/errors";
import type { Random, Full } from "unsplash-js/dist/methods/photos/types";
import type { Photos } from "unsplash-js/dist/methods/search/types/response";

import unsplashService from "~/service";

import { initFileDownload } from "~/utils";

type Photo = Full & {
	views: number;
	downloads: number;
};

export function useUnsplash() {
	const photo = useState<Photo>();
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

	function setLoading(value: boolean) {
		loading.value = value;
	}

	function setError(errors: Errors) {
		errorMessage.value = Array.isArray(errors) ? errors.toString() : errors;
	}

	async function fetchRandomPhotos() {
		setLoading(true);
		try {
			const { errors, response, type } =
				await unsplashServiceInstance.photos.getRandom({ count: 30 });
			if (type === "error") {
				setError(errors);
				return;
			}
			if (Array.isArray(response)) randomPhotos.value = response;
			else randomPhotos.value.push(response);
		} catch {
			errorMessage.value = networkError;
			randomPhotos.value = [];
		} finally {
			setLoading(false);
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
				setError(errors);
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
				setError(errors);
				return;
			}
			if (response) photo.value = response as Photo;
		} catch {
			errorMessage.value = networkError;
			photo.value = Object.create({});
		} finally {
			loading.value = false;
		}
	}

	async function downloadPhoto(params: { downloadLocation: string }) {
		loading.value = true;
		try {
			const { response, type, errors } =
				await unsplashServiceInstance.photos.trackDownload(params);
			if (type === "error") {
				setError(errors);
				return;
			}
			if (!response.url) throw new Error("Oops! something went wrong");

			await initFileDownload({
				downloadLink: response.url,
				fileName: photo.value.id,
			});
		} catch (error) {
			console.error(error);
		} finally {
			loading.value = false;
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

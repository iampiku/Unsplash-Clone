import type { Errors } from "unsplash-js/dist/helpers/errors";
import type { Random, Full } from "unsplash-js/dist/methods/photos/types";
import type { Photos } from "unsplash-js/dist/methods/search/types/response";

import unsplashService from "~/service";

type Photo = Full & {
	views: number;
	downloads: number;
};

async function triggerDownload(params: {
	downloadLink: string;
	photoId: string;
}) {
	const image = await fetchImageBlob(params.downloadLink);
	if (!image) return;

	const downloadFileName = `${params.photoId}.jpg`;
	const downloadFileURL = window.URL.createObjectURL(image);

	const anchorElement = document.createElement("a");
	anchorElement.download = downloadFileName;
	anchorElement.href = downloadFileURL;

	try {
		document.body.appendChild(anchorElement);
		anchorElement.click();
		document.body.removeChild(anchorElement);
	} catch (error) {
		console.error(error);
	} finally {
		window.URL.revokeObjectURL(downloadFileURL);
	}
}

async function fetchImageBlob(downloadLink: string): Promise<Blob | null> {
	try {
		const response = await fetch(downloadLink);
		return response.blob();
	} catch (error) {
		console.error(error);
		return null;
	}
}

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
				_onError(errors);
				return;
			}
			if (!response.url) throw new Error("Oops! something went wrong");

			await triggerDownload({
				downloadLink: response.url,
				photoId: photo.value.id,
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

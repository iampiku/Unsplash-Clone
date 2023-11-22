type FormateDate = {
	type: "Date";
	data: string;
};

type FormateNumber = {
	type: "Number";
	data: number;
};

type RawData = FormateDate | FormateNumber;

export function useUtil() {
	function formatData(params: RawData) {
		switch (params.type) {
			case "Date":
				return new Date(params.data).toLocaleString("en-US", {
					year: "numeric",
					month: "long",
					day: "numeric",
				});
			case "Number":
				return params.data.toLocaleString("en-US", { compactDisplay: "short" });
			default:
				return null;
		}
	}
	async function initFileDownload(params: {
		downloadLink: string;
		fileName: string;
	}): Promise<void> {
		const image = await fetchImageBlob(params.downloadLink);
		if (!image) return;

		const downloadFileName = `${params.fileName}.jpg`;
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
	return {
		formatData,
		initFileDownload,
	};
}

type FormateDate = {
	type: "Date";
	data: string;
};

type FormateNumber = {
	type: "Number";
	data: number;
};

type RawData = FormateDate | FormateNumber;

export function formatData(params: RawData) {
	const numberFormatter = new Intl.NumberFormat("en-US", {
		notation: "compact",
		compactDisplay: "short",
	});
	switch (params.type) {
		case "Date":
			return new Date(params.data).toLocaleString("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			});
		case "Number":
			return numberFormatter.format(params.data);
		default:
			return null;
	}
}
export async function initFileDownload(fileDetails: {
	downloadLink: string;
	fileName: string;
}): Promise<void> {
	const image = await fetchImageBlob(fileDetails.downloadLink);
	if (!image) return;

	const downloadFileName = `${fileDetails.fileName}.jpg`;
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

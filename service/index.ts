import { createApi } from "unsplash-js";

const unsplashService = (ACCESS_KEY: string) => {
	return createApi({
		accessKey: ACCESS_KEY,
	});
};

export default unsplashService;

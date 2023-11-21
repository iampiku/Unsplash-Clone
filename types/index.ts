import type {
	Random,
	Basic,
	Full,
} from "unsplash-js/dist/methods/photos/types";

type Status = {
	errorMessage: string;
	loading: boolean;
};

type SearchResult = Status & {
	actionType: "FETCH_SEARCH";
	photos: Array<Basic>;
	total: number;
	total_pages: number;
};

type RandomResult = Status & {
	actionType: "FETCH_RANDOM";
	photos: Array<Random>;
};

type PhotoDetails = Status & {
	actionType: "FETCH_DETAILS";
	photo: Full;
};

export type State = RandomResult | SearchResult | PhotoDetails;

export function isRandomResult(state: State): state is RandomResult {
	return state.actionType === "FETCH_RANDOM";
}

type FetchingRandoms = {
	actionType: "FETCH_RANDOM";
};

type FetchingSearch = {
	actionType: "FETCH_SEARCH";
	params: {
		query: string;
		page: number;
	};
};

type FetchDetails = {
	actionType: "FETCH_DETAILS";
	photoId: string;
};

export type Action = FetchingRandoms | FetchingSearch | FetchDetails;

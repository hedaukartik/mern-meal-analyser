import { API_BASE_URL, ACCESS_TOKEN } from "../constants/index";

const request = (options) => {
	const headers = new Headers({
		"Content-Type": "application/json",
	});

	if (localStorage.getItem(ACCESS_TOKEN)) {
		headers.append(
			"Authorization",
			"Bearer " + localStorage.getItem(ACCESS_TOKEN)
		);
	}

	const defaults = { headers: headers };
	options = Object.assign({}, defaults, options);

	return fetch(options.url, options).then((response) =>
		response.json().then((json) => {
			if (!response.ok) {
				return Promise.reject(json);
			}
			return json;
		})
	);
};

export function signup(signUpRequest) {
	return request({
		url: API_BASE_URL + "/signup",
		method: "POST",
		body: JSON.stringify(signUpRequest),
	});
}

export function signin(loginRequest) {
	return request({
		url: API_BASE_URL + "/signin",
		method: "POST",
		body: JSON.stringify(loginRequest),
	});
}

export function signout() {
	return request({
		url: API_BASE_URL + "/signout",
		method: "GET",
	});
}

export function getAggregatedCaloriesByDate(userId) {
	return request({
		url: API_BASE_URL + `/user/${userId}/aggreagateMeals`,
		method: "GET",
	});
}

export function getAllMeals(userId, requestDate) {
	return request({
		url:
			API_BASE_URL +
			`/user/${userId}/allMeals?requestDate=${requestDate}`,
		method: "GET",
	});
}

export function addMeal(mealRequest, userId) {
	return request({
		url: API_BASE_URL + `/user/${userId}/addMeal`,
		method: "POST",
		body: JSON.stringify(mealRequest),
	});
}

export function updateMeal(mealRequest, userId, mealId) {
	return request({
		url: API_BASE_URL + `/user/${userId}/meal/${mealId}/updateMeal`,
		method: "POST",
		body: JSON.stringify(mealRequest),
	});
}

export function deleteMeal(userId, mealId) {
	return request({
		url: API_BASE_URL + `/user/${userId}/meal/${mealId}/deleteMeal`,
		method: "DELETE",
	});
}

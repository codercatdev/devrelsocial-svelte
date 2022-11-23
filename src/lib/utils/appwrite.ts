import type { Models } from 'appwrite';
import { Client, Account } from 'appwrite';
import { writable } from 'svelte/store';

import {
	PUBLIC_APPWRITE_END_POINT,
	PUBLIC_APPWRITE_PROJECT_ID,
	PUBLIC_AUTH0_ISSUER_BASE_URL
} from '$env/static/public';

const client = new Client()
	.setEndpoint(PUBLIC_APPWRITE_END_POINT)
	.setProject(PUBLIC_APPWRITE_PROJECT_ID);
const account = new Account(client);

export const user = writable<Models.Account<Models.Preferences> | undefined>(undefined);

export const createSession = async () => {
	try {
		account.createOAuth2Session('auth0', `${location.origin}/`, `${location.origin}/?login=failed`);
	} catch (error) {
		console.error(error);
	}
};

export const getAccount = async () => {
	try {
		return await account.get();
	} catch (error) {
		//failed to get sessoion go login
		// createSession();
	}
};

export const deleteSessions = async () => {
	try {
		await account.deleteSessions();
		//   setUser(null);
		//   setSessions(null);
		const wnd = window.open(`${PUBLIC_AUTH0_ISSUER_BASE_URL}/v2/logout`);
		setTimeout(() => {
			wnd?.close();
		}, 1000);
	} catch (error) {
		console.log(error);
	}
};

// Account details

export const createJWT = async () => {
	return await account.createJWT();
};

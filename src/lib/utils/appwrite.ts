import { Client, Account } from 'appwrite';

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_END_POINT || '';
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '';
const auth0BaseURL = process.env.NEXT_PUBLIC_AUTH0_ISSUER_BASE_URL;

const client = new Client().setEndpoint(endpoint).setProject(projectId);
const account = new Account(client);

export const createSession = async () => {
	try {
		account.createOAuth2Session('auth0', `${location.origin}/`, `${location.origin}/?login=failed`);
	} catch (error) {
		console.error(error);
	}
};

export const getSessions = async () => {
	try {
		return await account.listSessions();
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
		const wnd = window.open(`${auth0BaseURL}/v2/logout`);
		setTimeout(() => {
			wnd?.close();
		}, 1000);
	} catch (error) {
		console.log(error);
	}
};

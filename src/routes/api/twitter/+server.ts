//https://kit.svelte.dev/docs/routing#server

import { error, redirect } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

export const GET = async ({ request }: { request: RequestHandler }) => {
	// throw error(404, 'Alex Not found');
	// throw redirect(302, 'https://codingcat.dev')
	return Response.redirect('https://codingcat.dev', 302);
};

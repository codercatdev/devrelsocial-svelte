<script lang="ts">
	import '../app.postcss';
	import Footer from './Footer.svelte';

	import { createSession, deleteSessions, getAccount, user } from '../lib/utils/appwrite';
	import type { Models } from 'appwrite';

	// let user: Models.Account<Models.Preferences> | undefined = undefined;

	const getUser = async () => {
		const u = await getAccount();
		$user = u;
	};

	const logout = async () => {
		$user = undefined;
		await deleteSessions();
	};
	getUser();
</script>

<div class="drawer">
	<input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
	<div class="flex flex-col drawer-content">
		<header>
			<div class="navbar bg-base-300">
				<div class="flex-none lg:hidden">
					<label for="my-drawer-3" class="btn btn-square btn-ghost">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							class="inline-block w-6 h-6 stroke-current"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</label>
				</div>
				<div class="flex-1 ">
					<a href="/" class="text-xl normal-case btn btn-ghost"> Dev Rel Social </a>
				</div>
				<div class="flex-1 hidden lg:block">
					<ul class="p-0 menu menu-horizontal">
						<li class="hidden lg:block">
							<a href="/twitter" class="text-xl normal-case">Twitter</a>
						</li>
						<li class="hidden lg:block">
							<a href="/linkedin" class="text-xl normal-case">LinkedIn</a>
						</li>
						<li class="block lg:hidden">
							<a href="/socials">
								Socials
								<svg
									class="fill-current"
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
								>
									<path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
								</svg>
							</a>
							<ul class="p-2 bg-base-100">
								<li>
									<a href="/twitter">Twitter</a>
									<a href="/linkedin">LinkedIn</a>
								</li>
								<li>
									<a>Submenu 2</a>
								</li>
							</ul>
						</li>
					</ul>
				</div>
				<div class="flex-none hidden lg:block">
					{#if $user}
						<div class="dropdown dropdown-end dropdown-hover">
							<label tabIndex={0} class="m-1 btn btn-primary">
								{$user.name}
							</label>
							<ul tabIndex={0} class="p-2 shadow dropdown-content menu bg-primary rounded-box w-52">
								<li>
									<a on:click|once={logout}>Logout</a>
								</li>
							</ul>
						</div>
					{:else}
						<a class="btn btn-primary" on:click|once={createSession}> Login </a>
					{/if}
				</div>
			</div>
		</header>
		<main class="flex-1">
			<slot />
		</main>
		<Footer />
	</div>
	<div class="drawer-side">
		<label htmlFor="my-drawer-3" class="drawer-overlay" />
		<ul class="p-4 overflow-y-auto menu w-80 bg-base-100">
			<li>
				<a>Sidebar Item 1</a>
			</li>
			<li>
				<a>Sidebar Item 2</a>
			</li>
		</ul>
	</div>
</div>

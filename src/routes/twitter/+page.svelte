<script lang="ts">
	import { user, createJWT } from '../../lib/utils/appwrite';

	const twitterAuth = async () => {
		// Gets jwt for current user
		const jwt = await createJWT();

		// Redirect user to twitter authz endpoint
		if (jwt) {
			window.location.href = `/api/twitter?jwt=${jwt}`;
		} else {
			alert('no jwt, user not set');
		}
	};
</script>

{#if $user}
	<section class="grid justify-center">
		<div class="min-h-full">
			<div class="py-10">
				<div
					class="max-w-3xl px-4 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8"
				>
					<div class="lg:col-span-3">
						<!-- <Navigation /> -->
					</div>
					<main class="py-2 lg:col-span-9">
						<button class="btn" on:click|preventDefault={twitterAuth}>Add Twitter</button>
					</main>
				</div>
			</div>
		</div>
	</section>
{:else}
	No user
{/if}

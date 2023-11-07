<script lang="ts">
	import { zxcvbnAsync, zxcvbnOptions } from '@zxcvbn-ts/core'
	import * as zxcvbnCommonPackage from '@zxcvbn-ts/language-common'
	import {
		translations as translationsEn,
		dictionary as dictionaryEn
	} from '@zxcvbn-ts/language-en'
	import {
		translations as translationsDe,
		dictionary as dictionaryDe
	} from '@zxcvbn-ts/language-de'
	import JSONDisplay from '$lib/components/JSONDisplay.svelte'
	import { popup } from '@skeletonlabs/skeleton'
	import type { PopupSettings } from '@skeletonlabs/skeleton'
	import { get } from 'svelte/store'
	import { displayedKeys } from '$lib/stores/displayedKeys'
	import type { ZxcvbnResult } from '@zxcvbn-ts/core'
	import { matcherPwnedFactory } from '@zxcvbn-ts/matcher-pwned'
	import crossFetch from 'cross-fetch'
	import { debounce } from '$lib/utils/debounce'
	import { Jumper } from 'svelte-loading-spinners'

	let displayed = get(displayedKeys)
	function syncDisplayedKeys() {
		displayedKeys.reset()
		displayed.forEach((key) => displayedKeys.addKey(key as keyof ZxcvbnResult))
	}
	syncDisplayedKeys()

	let useDictionaries = true
	let useTranslations = true
	let useGraphs = true
	let useLevensteinDistance = true
	let usePwnedCheck = true
	let debounceTime = 300

	let password = 'P@ssw0rd'
	let userInputs = 'Adalbert,Stifter'
	$: options = {
		translations: useTranslations ? selectedLanguage.translation : undefined,
		graphs: useGraphs ? zxcvbnCommonPackage.adjacencyGraphs : undefined,
		dictionary: useDictionaries
			? {
					...zxcvbnCommonPackage.dictionary,
					...selectedLanguage.dictionary
			  }
			: undefined,
		useLevensteinDistance,
		usePwnedCheck
	}
	$: matcherPwned = usePwnedCheck ? matcherPwnedFactory(crossFetch, zxcvbnOptions) : undefined
	$: if (matcherPwned) zxcvbnOptions.addMatcher('pwned', matcherPwned)
	else delete zxcvbnOptions.matchers.pwned
	$: zxcvbnOptions.setOptions(options)

	let resultPromise: Promise<ZxcvbnResult> | null = null
	$: options
		? (resultPromise = debounce(zxcvbnAsync, debounceTime)(password, userInputs.split(',')))
		: (resultPromise = null)

	const popupFeatured: PopupSettings = {
		event: 'click',
		target: 'popupFeatured',
		placement: 'bottom'
	}

	const languages = [
		{
			label: 'English',
			translation: translationsEn,
			dictionary: dictionaryEn
		},
		{
			label: 'German',
			translation: translationsDe,
			dictionary: dictionaryDe
		}
	]

	let selectedLanguage = languages[0]
</script>

<main class="flex gap-4 items-center">
	<form action="" class="card flex flex-col gap-4 w-full">
		<label class="label">
			<span>Password</span>
			<input class="input" type="text" placeholder="P@ssw0rd" bind:value={password} />
		</label>
		<label class="label">
			<span>User Inputs</span>
			<input
				class="input"
				type="text"
				placeholder="Comma seperated: Adalbert,Stifter"
				bind:value={userInputs}
			/>
		</label>
	</form>

	<form action="" class="card whitespace-nowrap">
		<!-- LANGUAGES -->
		<div class="space-y-1 border border-gray-500 border-dotted rounded-md p-2">
			{#each languages as language}
				<label class="flex items-center space-x-2">
					<input
						class="radio"
						type="radio"
						name="language"
						value={language}
						bind:group={selectedLanguage}
					/>
					<p>{language.label}</p>
				</label>
			{/each}
		</div>

		<!-- CHECKBOXES -->
		<div class="flex flex-col p-2">
			<label class="flex items-center space-x-2">
				<input
					class="checkbox"
					type="checkbox"
					name="dictionaries"
					bind:checked={useDictionaries}
				/>
				<p>Dictionaries</p>
			</label>
			<label class="flex items-center space-x-2">
				<input
					class="checkbox"
					type="checkbox"
					name="translations"
					bind:checked={useTranslations}
				/>
				<p>Translations</p>
			</label>
			<label class="flex items-center space-x-2">
				<input class="checkbox" type="checkbox" name="graphs" bind:checked={useGraphs} />
				<p>Graphs</p>
			</label>
			<label class="flex items-center space-x-2">
				<input
					class="checkbox"
					type="checkbox"
					name="levensteinDistance"
					bind:checked={useLevensteinDistance}
				/>
				<p>Levenstein Distance</p>
			</label>
			<label class="flex items-center space-x-2">
				<input class="checkbox" type="checkbox" name="pwnedCheck" bind:checked={usePwnedCheck} />
				<p>pwned check</p>
			</label>
		</div>

		<!-- DEBOUNCE TIME -->
		<label class="label flex flex-col">
			<span class="text-lg">Debounce Time</span>
			<span>{debounceTime}ms</span>
			<input type="range" min={usePwnedCheck ? 300 : 0} max="1000" bind:value={debounceTime} />
		</label>
	</form>
</main>

<div class="card mt-4 relative p-3 grid space-y-4">
	{#await resultPromise}
		<Jumper />
	{:then result}
		{#if result}
			<JSONDisplay data={result} {displayed} />
			<button
				class="btn variant-filled absolute top-4 right-4 drop-shadow-2xl"
				use:popup={popupFeatured}>Select displayed keys</button
			>

			<div class="card p-4 w-72 shadow-xl" data-popup="popupFeatured">
				{#each Object.entries(result) as [key]}
					<label class="label">
						<input
							type="checkbox"
							bind:group={displayed}
							value={key}
							on:change={syncDisplayedKeys}
						/>
						<span>{key}</span>
					</label>
				{/each}
				<div class="flex mt-4 gap-2">
					<button
						class="btn variant-filled btn-sm"
						on:click={() => {
							displayed = Object.keys(result)
							syncDisplayedKeys()
						}}>Select all</button
					>
					<button
						class="btn variant-outline-secondary btn-sm"
						on:click={() => {
							displayed = []
							syncDisplayedKeys()
						}}>Deselect all</button
					>
				</div>
			</div>
		{:else}
			Result is null
		{/if}
	{:catch error}
		<span class="text-red">{error.message}</span>
	{/await}
</div>

<style lang="postcss">
	input {
		@apply truncate;
	}

	form {
		@apply px-4 py-3 h-min;
	}
</style>

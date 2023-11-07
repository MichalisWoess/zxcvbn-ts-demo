import { writable } from 'svelte/store'
import type { ZxcvbnResult } from '@zxcvbn-ts/core'

const keys = [
	'calcTime',
	'crackTimesDisplay',
	'crackTimesSeconds',
	'feedback',
	'guesses',
	'guessesLog10',
	'password',
	'score',
	'sequence',
	'shuffledSequence'
]

const createDisplayedKeys = () => {
	const { subscribe, set, update } = writable(keys)

	return {
		subscribe,
		reset: () => set(keys),
		deleteKey: (key: keyof ZxcvbnResult) => update((keys) => keys.filter((k) => k !== key)),
		addKey: (key: keyof ZxcvbnResult) => update((keys) => [...keys, key])
	}
}

export const displayedKeys = createDisplayedKeys()

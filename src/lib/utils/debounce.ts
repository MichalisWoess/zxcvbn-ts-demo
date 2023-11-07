export function debounce<Params extends unknown[], R>(
	func: (...args: Params) => Promise<R>,
	timeout = 300
): (...args: Params) => Promise<R> {
	let timer: ReturnType<typeof setTimeout>
	let resolveLatest: (value: R | PromiseLike<R>) => void
	let rejectLatest: (reason?: any) => void
	let resultPromise: Promise<R>

	const resetPromise = () => {
		resultPromise = new Promise<R>((resolve, reject) => {
			resolveLatest = resolve
			rejectLatest = reject
		})
	}

	resetPromise() // initialize the result promise

	return (...args: Params) => {
		clearTimeout(timer)

		timer = setTimeout(() => {
			func(...args)
				.then(resolveLatest)
				.catch(rejectLatest)
				.finally(resetPromise) // reset the promise for the next operation
		}, timeout)

		return resultPromise
	}
}

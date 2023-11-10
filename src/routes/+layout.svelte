<script lang="ts">
	import '../app.postcss'
	import { base } from '$app/paths'

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom'
	import { LightSwitch, storePopup } from '@skeletonlabs/skeleton'
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow })
</script>

<div class="px-48 py-10 relative">
	<a
		href="{base}/info"
		class="fixed top-10 right-10 w-12 h-12 flex items-center justify-center rounded-3xl bg-white hover:bg-gray-100 transition-colors duration-200 shadow-lg border border-gray-200"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
			><path
				fill="black"
				d="M10.6 16q0-2.025.363-2.913T12.5 11.15q1.025-.9 1.563-1.563t.537-1.512q0-1.025-.687-1.7T12 5.7q-1.275 0-1.938.775T9.126 8.05L6.55 6.95q.525-1.6 1.925-2.775T12 3q2.625 0 4.038 1.463t1.412 3.512q0 1.25-.537 2.138t-1.688 2.012Q14 13.3 13.738 13.913T13.475 16H10.6Zm1.4 6q-.825 0-1.412-.588T10 20q0-.825.588-1.413T12 18q.825 0 1.413.588T14 20q0 .825-.588 1.413T12 22Z"
			/></svg
		>
	</a>

	<div class="flex justify-between items-center">
		<div>
			<h1 class="text-5xl">zxcvbn-ts demo</h1>
			<h3 class="text-xl text-slate-400">by Michalis Wöss</h3>
		</div>
		<LightSwitch />
	</div>
	<hr class="mt-4 pb-16" />
	<slot />
</div>

<script lang="ts">
	export let data = {}
	export let displayed: string[] = []
	export let indent = 0
	const isObject = (val: any) => typeof val === 'object' && val !== null && !Array.isArray(val)
</script>

{#each Object.entries(data) as [key, value]}
	{#if indent !== 0 || displayed.includes(key)}
		<div
			class="ml-2 card p-1 bg-zinc-100 h-min shadow-sm hover:opacity-80"
			class:sequence={key === 'sequence'}
			class:pattern={key === 'pattern'}
		>
			<h2 class="font-bold">{key}</h2>
			{#if isObject(value)}
				<svelte:self data={value} {displayed} indent={indent + 1} />
			{:else if Array.isArray(value)}
				<ul>
					{#each value as item}
						{#if isObject(item)}
							<svelte:self data={item} {displayed} indent={indent + 1} />
						{:else}
							<li>{item}</li>
						{/if}
					{/each}
				</ul>
			{:else}
				<span>{value}</span>
			{/if}
		</div>
	{/if}
{/each}

<style lang="postcss">
	ul {
		list-style-type: none;
		padding: 0;
	}

	li::before {
		content: '->';
		display: inline-block;
	}

	.sequence {
		@apply order-last border-red-500 border border-dotted;
	}

	.sequence > * {
		@apply grid grid-cols-4 gap-2 p-2;
	}

	.pattern > * {
		@apply underline;
	}
</style>

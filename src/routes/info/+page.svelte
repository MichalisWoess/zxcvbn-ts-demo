<main class="flex flex-col gap-6">
	<article class="p-4 card shadow rounded-lg">
		<h1 class="text-xl font-semibold mb-3">Performance</h1>
		<p class="text-sm">
			To enhance user experience and API integrity, function calls are debounced at 300ms and made
			asynchronously. This is to ensure the <strong>have i been pwned</strong> API is not overloaded
			with requests.
		</p>
	</article>

	<article class="p-4 card shadow rounded-lg">
		<h1 class="text-xl font-semibold mb-3">Experimentation</h1>
		<p class="text-sm">
			Adjust the language setting and notice the immediate changes in feedback, warnings, and
			scoring.
		</p>

		<h2 class="text-lg font-medium mt-4 mb-2">User Inputs</h2>
		<p class="text-sm">
			Use the zxcvbn function with user inputs to prevent personal information from being used as
			passwords, enhancing security.
		</p>
	</article>

	<!-- Custom matchers with link to https://zxcvbn-ts.github.io/zxcvbn/guide/matcher/#creating-a-custom-matcher -->
	<article class="p-4 card shadow rounded-lg mb-6">
		<h1 class="text-xl font-semibold mb-3">Enhanced Password Strength Evaluation Options</h1>
		<p class="text-sm">To bolster password security, consider these advanced matchers:</p>

		<ul class="list-disc pl-5 text-sm mb-3">
			<li>Complex Pattern Matchers: Detect intricate patterns beyond basic matchers.</li>
			<li>Contextual Analysis: Integrate user-specific data to flag potential vulnerabilities.</li>
			<li>Multilingual Dictionaries: Include words from various languages to widen scope.</li>
			<li>Machine Learning Analysis: Employ algorithms to evaluate password predictability.</li>
			<li>Emotional Pattern Detection: Identify passwords derived from personal emotions.</li>
			<li>Security Question Analysis: Flag passwords containing common security answers.</li>
			<li>Typo Analysis: Recognize common typing errors that may compromise security.</li>
			<li>Biometric Pattern Recognition: Analyze passwords for biometric consistencies.</li>
			<li>Geometric Pattern Detection: Evaluate swipe patterns on touch-enabled devices.</li>
			<li>Multi-Factor Integration: Assess passwords within multi-factor authentication setups.</li>
		</ul>
	</article>
</main>

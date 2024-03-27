function renderHomePage() {
	// Set the inner HTML of the main content
	document.getElementById('app').innerHTML = `
		<div id="animated-background">
			<div id="rotating-circle"></div>
		</div>
		<div id="content">
			<h1 id="text">Welcome on my website</h1>
			<p id="text">The site is under construction, come back later to see the improvements.</p>
		</div>
	`;
}
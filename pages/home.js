function renderHomePage() {
	// Set the inner HTML of the main content
	document.getElementById('app').innerHTML = `
		<div id="animated-background"></div>

		<div id="content">
			<div id="rotating-circle"></div>
			<h1 id="text">Welcome to my website</h1>
			<p id="text">This is a simple website that I made to showcase my projects and skills.</p>
		</div>
	
		${renderNews(
			'img/news.jpeg',
			'News',
			"I'm currently working on the website, I'm adding new features and improving the existing ones."
		)}
	`;
}
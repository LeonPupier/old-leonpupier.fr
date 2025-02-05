function renderHomePage() {
	window.scrollTo(0, 0);
	
	document.getElementById('app').innerHTML = `
		<div class="content-scrollable">
			<div class="content">
				<div class="rotating-circle"></div>
				<h1 class="text">Welcome to my website</h1>
				<p class="text">This is a simple website that I made to showcase my projects and skills.</p>
			</div>
		
			${renderNews(
				'img/news.jpeg',
				'News',
				"I'm currently working for a company. Please contact me if you have any questions or need help with a project."
			)}
		</div>
	`;
}
function renderNews(img, title, message) {
	return `
		<div class="news">
			<img class="news-img" src="${img}" alt="News Image">
			<div class="news-content">
				<h3 class="text">${title}</h2>
				<p class="text">${message}</p>
			</div>
		</div>
	`;
}
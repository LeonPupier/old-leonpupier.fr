function renderNews(img, title, message) {
	return `
		<div id="news">
			<img id="news-img" src="${img}" alt="News Image">
			<div id="news-content">
				<h3 id="text">${title}</h2>
				<p id="text">${message}</p>
			</div>
		</div>
	`;
}
function renderMensiblePage() {
	window.scrollTo(0, 0);

	document.getElementById('app').innerHTML = `
		<div class="animated-background"></div>
		<div class="static-background"></div>

		<div class="mensible-page">
			<div class="box-title">
				<img class="mensible-image" src="/img/mensible.png" draggable="false">
				<h2 class="mensible-title">Mensible</h2>
			</div>
			<p class="mensible-creators">© Developped by Léon Pupier</p>

			<img class="gallery-image" src="/projects/mensible/home.png" draggable="false" alt="Mensible home page">
			<div class="gallery-infos">
				<h3 class="gallery-category">Description</h3>
				<p class="gallery-text">
					Mensible is a completely free software to offer you the possibility
					to download videos and music hosted on YouTube and Spotify.
				</p>
			</div>

			<img class="gallery-image" src="/projects/mensible/download.png" draggable="false" alt="Mensible download page">
			<div class="gallery-infos">
				<h3 class="gallery-category">Download</h3>
				<p class="gallery-text">
					All you have to do is enter the URL of the video and you're done!
					You can download the music one by one or provide the link of a playlist
					and everything will be downloaded at the same time, convenient no?
				</p>
			</div>

			<img class="gallery-image" src="/projects/mensible/settings.png" draggable="false" alt="Mensible settings page">
			<div class="gallery-infos">
				<h3 class="gallery-category">Settings</h3>
				<p class="gallery-text">
					As you can see, a wide range of settings are available to help you get the most
					out of the software and adapt it to your needs.
				</p>
			</div>

			<a data-ignore-click class="project-see-more-link" href="https://github.com/LeonPupier/mensible">
				See more on GitHub →
			</a>
		</div>
	`;

	// Handle the click on an image on mobile
	const galleryImages = document.querySelectorAll('.gallery-image');
	for (let i = 0; i < galleryImages.length; i++) {
		galleryImages[i].addEventListener('click', function() {
			const image = document.createElement('img');
			image.src = galleryImages[i].src;
		
			const overlay = document.createElement('div');
			overlay.classList.add('overlay');
			overlay.appendChild(image);

			document.body.appendChild(overlay);

			overlay.addEventListener('click', function() {
				document.body.removeChild(overlay);
			});
		});
	}
}
function renderReminderPage() {
	window.scrollTo(0, 0);

	document.getElementById('app').innerHTML = `
		<div class="animated-background"></div>
		<div class="static-background"></div>

		<div class="project-page">
			<div class="box-title">
				<img class="project-image" src="/projects/reminder/logo.png" draggable="false">
				<h2 class="project-title">Reminder</h2>
			</div>
			<p class="project-creators">© Developped by Léon Pupier</p>

			<img class="gallery-image" src="/projects/reminder/home.png" draggable="false" alt="Reminder home page">
			<div class="gallery-infos">
				<h3 class="gallery-category">Description</h3>
				<p class="gallery-text">
					Reminder is an application allows you to voice broadcast a message written on the website to
					the recipient's computer.
					This allows for example to pass instructions between 2 people who are
					too far away in the house to communicate without moving.
				</p>
			</div>

			<img class="gallery-image" src="/projects/reminder/sent.png" draggable="false" alt="Reminder instructions sent page">
			<div class="gallery-infos">
				<h3 class="gallery-category">Instructions</h3>
				<p class="gallery-text">
					Once your message is sent, the computer will receive it and a voice will read the message on
					the computer's current audio device so that your message can be heard by the recipient under
					any circumstances.
				</p>
			</div>

			<img class="gallery-image" src="/projects/reminder/server.png" draggable="false" alt="Reminder server page">
			<div class="gallery-infos">
				<h3 class="gallery-category">Server gestion</h3>
				<p class="gallery-text">
					For security reasons, you must be on the same internet network as
					the server running on the computer to access the website.
				</p>
			</div>

			<a data-ignore-click class="project-see-more-link" href="https://github.com/LeonPupier/reminder">
				See more on GitHub →
			</a>

			<p class="project-infos">🛈 This project was a joke to keep my mother from screaming to call me when I was listening to music in my room...</p>
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
			document.body.style.overflow = 'hidden';

			overlay.addEventListener('click', function() {
				document.body.removeChild(overlay);
				document.body.style.overflow = 'auto';
			});
		});
	}
}
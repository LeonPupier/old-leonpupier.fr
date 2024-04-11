function renderGallery(images, category, text) {
	const galleryImages = images.map(image => `
		<img class="gallery-image" src="${image}" draggable="false">
	`).join('');

	return `
		<div class="gallery-images">
			${galleryImages}
			<div class="gallery-buttons">
				<button id="prev-image" class="gallery-button">←</button>
				<p class="gallery-counter"></p>
				<button id="next-image" class="gallery-button">→</button>
			</div>
		</div>
		<div class="gallery-infos">
			<h3 class="gallery-category">${category}</h3>
			<p class="gallery-text">${text}</p>
		</div>
	`;
}


function renderTranscendencePage() {
	window.scrollTo(0, 0);

	document.getElementById('app').innerHTML = `
		<div class="animated-background"></div>

		<div class="project-page">
			<div class="box-title">
				<img class="project-image" src="/projects/transcendence/logo.ico" draggable="false">
				<h2 class="project-title">transcendence</h2>
			</div>
			<p class="project-creators">© Developped by Léon Pupier, Thibault Giraudon & Elias Zanotti</p>

			${renderGallery([
				'/projects/transcendence/sign-in.png',
				'/projects/transcendence/sign-up.png'
			], 'Description', `
				This project is a website that lets you play the famous game of Pong,
				with several game modes available. To do this, you'll need to create an account
				using your own credentials or by linking your 42 account to the website.
				All data is persistent and securely stored. It is not possible for developers to recover
				a user's password in clear text.
			`)}

			${renderGallery([
				'/projects/transcendence/practice-mode.png',
				'/projects/transcendence/ranked-mode.png',
				'/projects/transcendence/1v1.png',
				'/projects/transcendence/deathmatch.png'
			], 'Pong game', `
				You can train your skills in a practice mode with 3 games but
				if you're looking for a competitive edge, there are 3 other game modes to choose.
			`)}

			${renderGallery([
				'/projects/transcendence/chats.png',
				'/projects/transcendence/chat-general.png',
				'/projects/transcendence/tournament-chat.png'
			], 'Chats', `
				In addition to the game, you'll find an advanced chat feature.
				This allows you to have private conversations with another user.
				You can also take part in group conversations, with no user limit.
				If you feel like it, feel free to create your own chat group and invite your friends!
			`)}

			<img class="gallery-image" src="/projects/transcendence/friends-status.png" draggable="false">
			<div class="gallery-infos">
				<h3 class="gallery-category">Friends</h3>
				<p class="gallery-text">
					You can send a friend request to any user of your choice.
					If they accept, you'll be officially linked.
					Friends are private and visible only to those concerned.
					This allows you to see their live status to see if they're online, offline or in a game.
					You can find them more easily in a dedicated tab.
				</p>
			</div>

			${renderGallery([
				'/projects/transcendence/profile-stats.png',
				'/projects/transcendence/profile-history.png',
			], 'Profile', `
				Each user has a profile. Public information includes your profile photo, your nickname,
				your statistics and your game history. On your own account, you'll be able to access more options,
				such as customizing your profile.
			`)}

			<img class="gallery-image" src="/projects/transcendence/notification.png" draggable="false">
			<div class="gallery-infos">
				<h3 class="gallery-category">Notifications</h3>
				<p class="gallery-text">
					An advanced notification system is available on the website to keep you up to date.
					You'll be notified of friend requests, chat messages, game invitations, tournament invitations,
					and more.
				</p>
			</div>

			<a data-ignore-click class="project-see-more-link" href="https://github.com/ThibaultGiraudon/transcendence">
				See more on GitHub →
			</a>

			<p class="project-infos">🛈 This is the last project of the common core at 42 school.</p>
		</div>
	`;


	// Handle the gallery
	const galleries = document.querySelectorAll('.gallery-images');
	galleries.forEach(gallery => {
		const images = gallery.querySelectorAll('.gallery-image');
		const prevButton = gallery.querySelector('#prev-image');
		const nextButton = gallery.querySelector('#next-image');
		const counter = gallery.querySelector('.gallery-counter');

		prevButton.addEventListener('click', function() {
			for (let i = 0; i < images.length; i++) {
				if (images[i].style.display !== 'none') {
					images[i].style.display = 'none';
					images[(i - 1 + images.length) % images.length].style.display = 'block';
					counter.textContent = `${(i - 1 + images.length) % images.length + 1}/${images.length}`;
					break;
				}
			}
		});

		nextButton.addEventListener('click', function() {
			for (let i = 0; i < images.length; i++) {
				if (images[i].style.display !== 'none') {
					images[i].style.display = 'none';
					images[(i + 1) % images.length].style.display = 'block';
					counter.textContent = `${(i + 1) % images.length + 1}/${images.length}`;
					break;
				}
			}
		});

		for (let i = 1; i < images.length; i++) {
			images[i].style.display = 'none';
		}

		counter.textContent = `1/${images.length}`;
	});

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
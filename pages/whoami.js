function renderWhoAmIPage() {
	window.scrollTo(0, 0);

	document.getElementById('app').innerHTML = `
		<div class="sections">
			<div class="section">
				<div class="section-content">

					<img class="user-img" src="img/leon.jpg" alt="User picture" draggable="false" />

					<h2><span>Who am I?</span></h2>
					<p class="paragraph">
					My name is Léon Pupier and I am a french student at 
					<span class="external-link-text" onclick="window.open('https://www.42.fr/', '_blank');">school 42</span>.
					My passion for computer science and more particularly the creation of programs and software solutions
					pushes me to make my creations accessible while trying to provide a quality similar to a professional work.
					</p>
					
					<img class="scroll-img" src="img/scroll.png" alt="Scoll down" draggable="false" />

				</div>
				<div class="ribbon"></div>
			</div>

			<div class="section">
				<div class="section-content">

					<img class="projects-img" src="img/website.png" alt="Projects picture" draggable="false" />

					<h2><span>Why a website?</span></h2>
					<p class="paragraph">
					You can find my main projects on this website, as well as a non-exhaustive list of my skills.
					Not forgetting an overview of my career.
					This site also serves as a showcase and contact point.
					Thank you for taking the time to look at my creations, I hope to continue producing quality work.
					</p>
					</br>
					<p class="paragraph-sign"><span>Léon Pupier</span></p>
				
				</div>
			</div>
		</div>

		<style> body {overflow: hidden;} </style>
	`;

	const sections = document.querySelectorAll('.section');
	sections.forEach((section, index) => {
		// Add 'even' or 'odd' class based on the index
		section.classList.add(index % 2 === 0 ? 'even' : 'odd');
	});

	// Handle the animation of the sections
	window.addEventListener('scroll', function() {
		sections.forEach((section, index) => {
			const sectionTop = section.getBoundingClientRect().top;
			const sectionBottom = section.getBoundingClientRect().bottom;
			if (sectionTop <= window.innerHeight && sectionBottom >= 0) {
				section.classList.add('animate');
				if (index !== 0 || sectionBottom >= window.innerHeight) {
					setTimeout(function() {
						section.querySelector('.section-content').classList.add('show-text');
					}, 1000);
				}
			}
		});
	});

	// Trigger the text animation for the first section immediately
	setTimeout(function() {
		sections[0].classList.add('animate');
	}, 0);

	setTimeout(function() {
		document.querySelector('.section:first-child .section-content').classList.add('show-text');
	}, 1000);

	// Handle the click on a span link
	document.getElementById('external-link').addEventListener('click', function() {
		window.open('https://www.42.fr/', '_blank');
	});

	// Handle the navigation when the user scrolls
	let currentSectionIndex = 0;
	let isScrolling = false;

	function scrollSection(index) {
		sections[index].scrollIntoView({ behavior: 'smooth' });
		isScrolling = true;

		setTimeout(() => {
			isScrolling = false;
		}, 300);
	}

	window.addEventListener('wheel', function(e) {
		if (isScrolling) return;
		e.preventDefault();

		if (e.deltaY > 0) {
			// Scrolling down
			currentSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
		} else {
			// Scrolling up
			currentSectionIndex = Math.max(currentSectionIndex - 1, 0);
		}

		scrollSection(currentSectionIndex);
	}, { passive: false });

	// Handle the scroll down on mobile
	let startTouchY;

	window.addEventListener('touchstart', function(e) {
		startTouchY = e.touches[0].clientY;
	}, { passive: false });

	window.addEventListener('touchmove', function(e) {
		if (isScrolling) return;
		e.preventDefault();

		const touchY = e.touches[0].clientY;
		const touchYDelta = startTouchY - touchY;

		if (touchYDelta > 0) {
			// Scrolling down
			currentSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
		} else {
			// Scrolling up
			currentSectionIndex = Math.max(currentSectionIndex - 1, 0);
		}

		scrollSection(currentSectionIndex);
		startTouchY = touchY;
	}, { passive: false });

	// Handle the scoll down when the user click on the scoll image
	document.querySelector('.scroll-img').addEventListener('click', function() {
		currentSectionIndex = Math.min(currentSectionIndex + 1, sections.length - 1);
		scrollSection(currentSectionIndex);
	});
}

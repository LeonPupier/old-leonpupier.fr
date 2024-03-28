function renderWhoAmIPage() {    
	document.getElementById('app').innerHTML = `
		<div id="background-whoami"></div>

		<div class="sections">
			<div class="section">
				<div class="section-content">

					<img id="user-img" src="img/leon.jpg" alt="User picture" />

					<h2><span>Who am I?</span></h2>
					<p>
					My name is Léon Pupier and I am a french student at 
					<span id="external-link-text" onclick="window.open('https://www.42.fr/', '_blank');">school 42</span>.
					My passion for computer science and more particularly the creation of programs and software solutions
					pushes me to make my creations accessible while trying to provide a quality similar to a professional work.
					</p>
					
					<img id="scroll-img" src="img/scroll.png" alt="Scoll down" />

				</div>
				<div class="ribbon"></div>
			</div>

			<div class="section">
				<div class="section-content">
					<h2>Skills</h2>
					<p>Some skills...</p>
				</div>
			</div>

			<div class="section">
				<div class="section-content">
					<h2>Education</h2>
					<p>Some education...</p>
				</div>
			</div>
		</div>
    `;

	// Handle the click on a span link
	document.getElementById('external-link').addEventListener('click', function() {
		window.open('https://www.42.fr/', '_blank');
	});

	// Handle the navigation when the user scrolls
	let currentSectionIndex = 0;
	const sections = document.querySelectorAll('.section');
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
}

function renderWhoAmIPage() {    
	document.getElementById('app').innerHTML = `
		<div id="background-whoami"></div>

		<div class="sections">
			<div class="section">
				<div class="section-content">

					<img id="user-img" src="img/leon.jpg" alt="User picture" />

					<h2><span>Who am I?</span></h2>
					<p id="paragraph">
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

					<img id="projects-img" src="img/projects.png" alt="Projects picture" />

					<h2><span>Why a website?</span></h2>
					<p id="paragraph">
					You can find my main projects on this website, as well as a non-exhaustive list of my skills.
					Not forgetting an overview of my career.
					This site also serves as a showcase and contact point.
					Thank you for taking the time to look at my creations, I hope to continue producing quality work.
					</p>
					</br>
					<p id="paragraph-sign"><span>Léon Pupier</span></p>
				
				</div>
			</div>
		</div>
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
}

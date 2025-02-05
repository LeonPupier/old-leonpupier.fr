function renderAimShotPage() {
	window.scrollTo(0, 0);

	document.getElementById('app').innerHTML = `
		<video autoplay muted loop playsinline class="background-video">
			<source src="/video/glock.mp4" type="video/mp4">
		</video>

		<div class="aimshot-disclaimer">
			<h1>AimShot</h1>
			<p class="aimshot-disclaimer-text">
				AimShot is a mobile application designed to help shooters track and analyze their shooting sessions.
				<br></br>
				More information coming soon...
			</p>
			<p class="aimshot-safety">
				Always comply with local, state, and federal laws when handling firearms.
			</p>
		</div>
	`;
}
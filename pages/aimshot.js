function renderAimShotPage() {
	window.scrollTo(0, 0);
	
	document.getElementById('app').innerHTML = `
		<video autoplay muted loop class="background-video">
			<source src="/video/glock.mp4" type="video/mp4">
		</video>

		<div class="aimshot-disclaimer">
			<h1>AimShot</h1>
			<p>
				AimShot is a mobile application designed to help shooters track and analyze their shooting sessions.
			</p>
		</div>
	`;
}
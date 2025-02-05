function renderSkillsPage() {
	window.scrollTo(0, 0);

	// Skills list
	const skills = [
		{
			year: '2018', 
			skills: [
				{title: "Shell", description: "Mastered Shell scripting for system interaction."},
				{title: "Basic", description: "Developed BASIC for calculator programs."},
				{title: "Python", description: "Proficient in Python, with ongoing learning.", projects: [
					{title: "Mensible", url: "/projects/mensible"},
					{title: "Reminder", url: "/projects/reminder"},
					{title: "Transcendence", url: "/projects/transcendence", is42: true},
				]},
			],
		},
		{
			year: '2019', 
			skills: [
				{title: "HTML", description: "Gained proficiency in HTML for web development.", projects: [
					{title: "Reminder", url: "/projects/reminder"},
					{title: "Transcendence", url: "/projects/transcendence", is42: true},
				]},
				{title: "CSS", description: "Mastered CSS for website styling.", projects: [
					{title: "Reminder", url: "/projects/reminder"},
					{title: "Transcendence", url: "/projects/transcendence", is42: true},
				]},
				{title: "3D modeling", description: "Learned 3D modeling for game design.", links: [
					{title: "Blender", img: "img/Blender.svg", url: "https://www.blender.org/"},
				]},
			],
		},
		{
			year: '2020', 
			skills: [
				{title: "SQL", description: "Mastered SQL for database management.", projects: [
					{title: "Transcendence", url: "/projects/transcendence", is42: true},
				]},
				{title: "Digital audio", description: "Gained skills in digital audio for sound design.", links: [
					{title: "FL Studio", img: "img/FLStudio.png", url: "https://www.image-line.com/"},
					{title: "LMMS", img: "img/LMMS.svg", url: "https://lmms.io/"},
					{title: "Audacity", img: "img/Audacity.svg", url: "https://www.audacityteam.org/"},
				]},
			],
		},
		{
			year: '2021',
			skills: [
				{title: "Game Engine", description: "Learned game engine for game development.", links: [
					{title: "Unreal Engine", img: "img/UE.svg", url: "https://www.unrealengine.com/"},
					{title: "Unity", img: "img/Unity.svg", url: "https://unity.com/"},
					{title: "Godot", img: "img/Godot.svg", url: "https://godotengine.org/"},
				]},
			],
		},
		{
			year: '2022', 
			skills: [
				{title: "C", description: "Developed proficiency in C for system programming."},
				{title: "C++", description: "Mastered C++ for software development."},
			],
		},
		{
			year: '2023', 
			skills: [
				{title: "React Native", description: "Learned React Native for mobile app development.", projects: [
					{title: "AimShot", url: "/projects/aimshot"},
				]},
				{title: "JavaScript", description: "Gained proficiency in JavaScript for web development.", projects: [
					{title: "This website", url: "/"},
					{title: "Transcendence", url: "/projects/transcendence", is42: true},
				]},
			],
		},
		{
			year: '2024', 
			skills: [
				{title: "To be continued...", description: "Still so much to learn!"},
			],
		},
	];

	// Generate the HTML
	const skillsHtml = skills.map((yearData, index) => {
		let lineClass = 'timeline-line';
		if (index === 0) {
			lineClass = 'timeline-line-start';
		} else if (index === skills.length - 1) {
			lineClass = 'timeline-line-end';
		}

		const yearSkillsHtml = `
			<div class="timeline-content-skills">
				${yearData.skills.map(skill => `
					<div class="timeline-content hidden">
						<h2 class="text">${skill.title}</h2>
						<p class="text">${skill.description}</p>
						<div class="timeline-links">
							${skill.links ? skill.links.map(link => `
								<a class="timeline-link" data-ignore-click href="${link.url}" target="_blank">
									<img class="timeline-link-img" src="${link.img}" alt="${link.title} picture" draggable="false">
									<span class="timeline-link-text">${link.title}</span>
								</a>
							`).join('') : ''}
						</div>
						<div class="timeline-projects">
							${skill.projects ? `
								<p class="text">Some project(s) on the website showcasing this skill:</p>
								${skill.projects.map(project => `
									<a class="timeline-project" data-route="${project.url}">
										• ${project.title} ${project.is42 ? '<img id="menu-img-42" src="img/42.svg" draggable="false">' : ''}
									</a>
								`).join('')}` : ''}
						</div>
					</div>
				`).join('')}
			</div>
		`;

		return `
			<li class="timeline-item">
				<div class="${lineClass}"></div>
				<div class="timeline-point"></div>
				<div class="timeline-year">${yearData.year}</div>
				${yearSkillsHtml}
			</li>
		`;
	}).join('');

	// Render the skills page
	document.getElementById('app').innerHTML = `
		<ul class="timeline">
			${skillsHtml}
		</ul>
	`;

	// Add the observer to animate the skills page
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	}, {
		threshold: 0.5
	});

	const contents = Array.from(document.querySelectorAll('.timeline-content'));
	contents.forEach((content, index) => {
		observer.observe(content);
	});
}
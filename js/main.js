// --------------------------------------------------------------------------------
// ----------------------------------- Router -------------------------------------
// --------------------------------------------------------------------------------

let isPopStateEvent = false;

// Create a new router
const router = {

	routes: {
		// Main
		'/': renderHomePage,
		'/home': renderHomePage,

		// About me
		'/whoami': renderWhoAmIPage,
		'/skills': renderSkillsPage,

		// Projects
		'/projects/aimshot': renderAimShotPage,
		'/projects/mensible': renderMensiblePage,
		'/projects/reminder': renderReminderPage,
	},

	navigate: function(route) {
		// Check if the route is a string
		if (typeof route !== 'string') {
			return;
		}

		// Find the matching route
		const matchingRoute = Object.keys(this.routes).find(r => {
			const regex = new RegExp(`^${r.replace(/:[^\s/]+/g, '([\\w-]+)')}$`);
			return regex.test(route);
		});
	
		if (matchingRoute) {
			// Extract the parameters
			const params = route.match(new RegExp(matchingRoute.replace(/:[^\s/]+/g, '([\\w-]+)'))).slice(1);
	
			// Call the corresponding function with the parameters
			this.routes[matchingRoute](...params);
			
			// Add the new route to the history
			if (!isPopStateEvent) {
				history.pushState({ route: route }, '', route);
			}
			isPopStateEvent = false;
		
		} else {
			// If no route is found
			router.navigate('/');
		}
	}
};


// --------------------------------------------------------------------------------
// ----------------------------- Navigation & Routing -----------------------------
// --------------------------------------------------------------------------------


// When the user clicks on a link, navigate to the given route
async function navigateTo(event, route) {
	event.preventDefault();

	// Don't redirect if the user is already on the page
	if (event.target.closest('#menu-panel') && window.location.pathname === route) {
		return;
	}

	router.navigate(route);
}


// Handle the navigation when the user clicks on a link
document.addEventListener('click', function(event) {
	let target = event.target;
	while (target !== document) {
		if (!target) return;
		if ((target.tagName === 'BUTTON' || target.tagName === 'A') && !target.hasAttribute('data-ignore-click')) {
			event.preventDefault();
			navigateTo(event, target.getAttribute('data-route'));
			return;
		}
		target = target.parentNode;
	}
});


// Handle the navigation when the user clicks on the back or forward button
window.addEventListener('popstate', function(event) {
	if (event.state && event.state.route) {
		isPopStateEvent = true;
		router.navigate(event.state.route);
	}
});


// --------------------------------------------------------------------------------
// ---------------------------------- Observer ------------------------------------
// --------------------------------------------------------------------------------

window.addEventListener('DOMContentLoaded', (event) => {
	// Render the home page
	if (sessionStorage.redirect) {
		const redirectURL = sessionStorage.redirect;
		delete sessionStorage.redirect;
		const cleanURL = redirectURL.replace(location.origin, '').replace(/\/$/, '');
		router.navigate(cleanURL);
	} else {
		const cleanURL = window.location.pathname.replace(/\/$/, '');
		router.navigate(cleanURL);
	}


	// Handle the custom cursor
	var cursor = document.getElementById('custom-cursor');

	if (window.matchMedia("(min-width: 768px)").matches) {
		document.addEventListener('mousemove', function(e) {
			cursor.style.left = (e.clientX - cursor.offsetWidth / 2) + 'px';
			cursor.style.top = (e.clientY - cursor.offsetHeight / 2) + 'px';
		});

		document.addEventListener('mousedown', function() {
			cursor.style.transform = 'scale(0.5)';
		});

		document.addEventListener('mouseup', function() {
			cursor.style.transform = 'scale(1)';
		});

		document.addEventListener('mouseout', function(event) {
			if (!event.toElement && !event.relatedTarget) {
				cursor.style.display = 'none';
			}
		});
		
		document.addEventListener('mouseover', function() {
			cursor.style.display = 'block';
		});
	}


	// Handle the menu button
	document.getElementById('menu').addEventListener('click', function() {
		this.classList.remove('clicked');
		void this.offsetWidth;
		this.classList.add('clicked');

		var img = document.getElementById('menu-img');
		var container = document.getElementById('menu-container');
		var style = window.getComputedStyle(container);

		if (style.left === '-450px') {
			img.src = '/img/menuClose.svg';
			container.style.transition = 'left 0.8s ease';
			container.style.left = '0px';
		} else {
			img.src = '/img/menuOpen.svg';
			container.style.left = '-450px';
			container.style.transition = 'left 0.3s linear';
		}
	});

	// Handle the navigation when the user clicks on a link
	document.body.addEventListener('click', function(event) {
		var img = document.getElementById('menu-img');
		var container = document.getElementById('menu-container');
		var style = window.getComputedStyle(container);
	
		// If the menu is open and the user clicks outside the menu, close it
		if (style.left === '0px' && !container.contains(event.target) && !event.target.matches('#menu')) {
			img.src = '/img/menuOpen.svg';
			container.style.left = '-450px';
			container.style.transition = 'left 0.3s linear';
		}
	});

	// Get the menu links
	var menuLinks = document.querySelectorAll('#menu-panel a');

	// Add a click event listener to each link
	for (var i = 0; i < menuLinks.length; i++) {
		menuLinks[i].addEventListener('click', function() {
			var img = document.getElementById('menu-img');
			var container = document.getElementById('menu-container');
			var style = window.getComputedStyle(container);

			if (style.left === '0px') {
				img.src = '/img/menuOpen.svg';
				container.style.left = '-450px';
				container.style.transition = 'left 0.3s linear';
			}
		});
	}
});
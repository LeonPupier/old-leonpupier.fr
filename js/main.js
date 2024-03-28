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
		'/whoami': renderWhoAmIPage,
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
			console.error('Route not found:', route);
		}
	}
};


// --------------------------------------------------------------------------------
// ----------------------------- Navigation & Routing -----------------------------
// --------------------------------------------------------------------------------


// When the user clicks on a link, navigate to the given route
async function navigateTo(event, route) {
	event.preventDefault();
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
		router.navigate(redirectURL.replace(location.origin, ''));
	} else {
		router.navigate(window.location.pathname);
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
		var panel = document.getElementById('menu-panel');
		var wave = document.getElementById('wave');
		var style = window.getComputedStyle(panel);

		if (style.left === '-450px') {
			img.src = 'img/menuClose.svg';
			panel.style.transition = 'left 0.8s ease';
			panel.style.left = '0px';
			wave.style.transition = 'left 0.8s ease';
			setTimeout(function() {
				wave.style.left = '300px';
			}, 0);
		} else {
			panel.addEventListener('transitionend', function hideWave() {
				panel.removeEventListener('transitionend', hideWave);
			});
			img.src = 'img/menuOpen.svg';
			panel.style.left = '-450px';
			panel.style.transition = 'left 0.3s linear';
			wave.style.left = '-150px';
			wave.style.transition = 'left 0.3s linear';
		}
	});

	// Handle the navigation when the user clicks on a link
	document.body.addEventListener('click', function(event) {
		var img = document.getElementById('menu-img');
		var panel = document.getElementById('menu-panel');
		var wave = document.getElementById('wave');
		var style = window.getComputedStyle(panel);
	
		// If the menu is open and the user clicks outside the menu, close it
		if (style.left === '0px' && !panel.contains(event.target) && !event.target.matches('#menu')) {
			panel.addEventListener('transitionend', function hideWave() {
				panel.removeEventListener('transitionend', hideWave);
			});
			img.src = 'img/menuOpen.svg';
			panel.style.left = '-450px';
			panel.style.transition = 'left 0.3s linear';
			wave.style.left = '-150px';
			wave.style.transition = 'left 0.3s linear';
		}
	});

	// Get the menu links
	var menuLinks = document.querySelectorAll('#menu-panel a');

	// Add a click event listener to each link
	for (var i = 0; i < menuLinks.length; i++) {
		menuLinks[i].addEventListener('click', function() {
			var img = document.getElementById('menu-img');
			var panel = document.getElementById('menu-panel');
			var wave = document.getElementById('wave');
			var style = window.getComputedStyle(panel);

			if (style.left === '0px') {
				panel.addEventListener('transitionend', function hideWave() {
					panel.removeEventListener('transitionend', hideWave);
				});
				img.src = 'img/menuOpen.svg';
				panel.style.left = '-450px';
				panel.style.transition = 'left 0.3s linear';
				wave.style.left = '-150px';
				wave.style.transition = 'left 0.3s linear';
			}
		});
	}
});
"use strict";

/**
 * Ilmenite Cookie Consent
 * 
 * @author Bernskiold Media <info@bernskioldmedia.com>
 */
var Ilmenite_Cookie_Consent = function(ilcc) {

	var body = document.getElementsByTagName('body')[0]

	/**
	 * Module Definition
	 *
	 * @type {{}}
	 */
	var module = {

		/**
		 * Settings
		 */
		settings: {
			noCookieMode: false, // Debug Mode: true will disable the cookie, allowing you to debug the banner.
			consentRememberDuration: 30, // Duration in Days: The number of days before the cookie should expire.
			cookieName: 'EUCookieConsent', // The name of the cookie.
			cookieActiveValue: 1 // The active value of the cookie.
		},

		/**
		 * Sets the cookie with the active value.
		 */
		setCookie: function() {

			// If no debug mode, set the cookie
			if ( ! module.settings.noCookieMode ) {

				// Set the consent duration into a cookie date string
				var date = new Date();
				date.setTime(date.getTime()+(module.settings.consentDuration*24*60*60*1000));

				// Set the actual cookie
				document.cookie = module.settings.cookieName + '=' + module.settings.cookieActiveValue + '; expires=' + date.toGMTString() + '; path=/';

			}

		},

		/**
		 * Create the cookie consent banner and add it
		 * to the DOM.
		 */
		createBanner: function() {

			// Set the contents.
			const consentBlock = document.createElement('div');
			consentBlock.classList = 'ilcc-cookie-consent-notice js--ilcc-cookie-consent-notice';
			consentBlock.innerHTML = '<p>' + ilcc.cookieConsentText + '<button class="ilcc-cookie-consent-close js--ilcc-cookie-consent-close close-cookie-block ' + ilcc.btnClassname + '">' + ilcc.acceptText + '</button></p>';

			// Append to body
			body.appendChild(consentBlock);

			// Add class to body
			body.classList.add('has-cookie-banner');

			// Remove banner and set the accepted cookie on close
			document.querySelector('.js--ilcc-cookie-consent-close').addEventListener('click', function() {
				module.removeBanner();
				module.setCookie();
			});

		},

		/**
		 * Get the value of a cookie by its name.
		 * 
		 * @param {string} name 
		 */
		getCookieValue: function(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
		},

		/**
		 * Remove the cookie banner from the page.
		 */
		removeBanner: function() {
			body.classList.remove('has-cookie-banner');
		}

	};

	/**
	 * When the window loads and the user hasn't already accepted
	 * the cookie terms (ie. we have no cookie), then we
	 * create the banner.
	 */
	document.addEventListener("DOMContentLoaded", function() {
		if(module.getCookieValue(module.settings.cookieName) != module.settings.cookieActiveValue ) {
			module.createBanner();
		}
	});

	// Return the module.
	return module;

}(ilcc);
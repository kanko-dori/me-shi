import createAuth0Client from '@auth0/auth0-spa-js';
import { dev, browser } from '$app/env';

export const auth0 = browser
	? createAuth0Client({
			domain: 'kanko-dori.us.auth0.com',
			client_id: 'sUyBzcnmmsqprfhmvJaJUFFqDaIUPw7O',
			audience: 'appsync-auth0',
			redirect_uri: dev ? 'http://localhost:3000/callback' : 'https://me-shi.ga/callback',
			cacheLocation: 'localstorage'
	  })
	: Promise.reject(new Error('Auth0 is only client'));

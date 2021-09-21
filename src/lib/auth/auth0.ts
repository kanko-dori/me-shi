import { browser } from '$app/env';
import { path } from '$lib/path';
import createAuth0Client from '@auth0/auth0-spa-js';

export const auth0 = browser
	? createAuth0Client({
			domain: 'kanko-dori.us.auth0.com',
			client_id: 'sUyBzcnmmsqprfhmvJaJUFFqDaIUPw7O',
			audience: 'appsync-auth0',
			redirect_uri: `${path}/callback`,
			cacheLocation: 'localstorage'
	  })
	: Promise.reject(new Error('Auth0 is only client'));

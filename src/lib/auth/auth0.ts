import { Auth0Client } from '@auth0/auth0-spa-js';

export const auth0 = new Auth0Client({
	domain: 'kanko-dori.us.auth0.com',
	client_id: 'sUyBzcnmmsqprfhmvJaJUFFqDaIUPw7O',
	audience: 'appsync-auth0',
	redirect_uri: 'http://localhost:3000/callback',
	cacheLocation: 'localstorage'
});

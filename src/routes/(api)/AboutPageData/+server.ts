import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = () => {
	const title = "<code>About</code>";
	const paragraphs = [
		`<code>This is a template project with authentication using JWT and refresh tokens.</code>`,
		`<code>You can configure the database to your needs in ./prisma/schema.prisma. Doing so might cause complications with the authentication logic that will have to be resolved.</code>`,
		`<code>If you change the datasource provider you also have to change the DATABASE_URL property in the root .env file.</code>`,
		`<code>Two roles, <b>ADMIN</b> and <b>USER</b>, and an admin account (username: <b>admin</b>) will be created in the database if they don't exist the first time the DatabaseGateway class is called. This will most likely happen on the first request after the server is started</code>`,
		`<code>The default admin password can be changed in the root .env file</code>`,
		`<h3><code><b>NOTE: IF YOU DELETE THE DEFAULT ADMIN ACCOUNT IT WILL BE RECREATED WITH THE DEFAULT PASSWORD THE NEXT TIME THE SERVER RESTARTS. MAKE SURE TO REMOVE/CHANGE THIS FEATURE TO FIT YOUR NEEDS [see the initDb() function in DatabaseGateway]</b></code></h3>`,
		`<code>To enable authentication you have to provide a private and a public key to the keystore. By default the public key is served from the endpoint found in routes/(api)/publickey. This endpoint can be safely deleted or edited if external access to the key is not required</code>`,
		`<code>This template comes with zero styling done, except some inline styling in the navbars to get the login button to stay on the same line</code>`,
		`<code><b>Disclaimer: The author of this template cannot be held accountable for any security breaches related to the use of this template</b></code>`,
	];

	return new Response(
		JSON.stringify({
			title,
			paragraphs,
		}),
	);
};

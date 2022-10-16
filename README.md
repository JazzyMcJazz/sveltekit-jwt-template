# Sveltekit JWT Template

<h3>Description</h3>

This is a project with pre-implemented logic for authentication and authorization using JWT and
refresh tokens.

It is based on a skeleton Sveltekit (from `npm create svelte@latest my_project`) with TypeScript,
ESLint, Prettier and Playwright included.

The authentication relies on RSA keys to sign and verify JWTs, please supply your own key pair
in the `./src/lib/server/keystore`. Without them authentication will not work.

Please look over the authentication logic for yourself. 
I am no security expert and there might be room for improvement. 

Use at your own discretion. 

<h3>Steps to run this project:</h3>

- Copy the contents from `.env.example` to `.env` and fill in the details.
- `npm install`
- `npm run initdb`. This pushes the Prisma schema to a sqlite database.
- `npm run dev`

<h4>[optional]</h4>

- Add RSA keys to the `./src/lib/server/keystore` folder. Without them authentication will not work. The files must be named `private.pem` and `public.pem`.

<h3>Resources</h3>

- https://kit.svelte.dev/docs/
- https://jwt.io/
- https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/
- https://www.prisma.io/docs/
- https://github.com/auth0/node-jsonwebtoken#readme
- https://github.com/kelektiv/node.bcrypt.js#readme
- https://github.com/CatWithAWand/snowflakify#readme (used to generate user IDs) 

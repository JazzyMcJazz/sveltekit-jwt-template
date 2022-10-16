# Sveltekit JWT Template

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

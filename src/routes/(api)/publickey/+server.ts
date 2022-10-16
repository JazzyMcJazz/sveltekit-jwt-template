import type { RequestHandler } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import fs from 'fs';

/*
 * This endpoint serves the public key used to verify JWTs signed on this server.
 * Microservices that need to verify the user's identity can use this endpoint.
 * Can be safely deleted if you have no need for external JWT verification.
 */
export const GET: RequestHandler = () => {

    let key: Buffer;
    try {
        key = fs.readFileSync('src/lib/server/keystore/public.pem');
    } catch (err) {
        throw error(404, 'Not Found');
    }

    return new Response(JSON.stringify(key));
}

/**
 * Simple smoke test for backend API endpoints used by frontend.
 * Run from project root with: `node frontend/scripts/smoke-test.js`
 */
const fetch = globalThis.fetch || require('node-fetch');
const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

(async function(){
  try{
    console.log('GET /products');
    const p = await fetch(`${API}/products`).then(r=>r.json());
    console.log('products:', Array.isArray(p)? p.length : typeof p, '\n');

    console.log('GET /users/me (unauthenticated expected 401/403)');
    const me = await fetch(`${API}/auth/me`).then(r=>({status:r.status, body:r.status===200?await r.json():null}));
    console.log('status', me.status, '\n');

    console.log('Smoke tests completed');
    process.exit(0);
  }catch(e){
    console.error('Smoke test error', e);
    process.exit(1);
  }
})();

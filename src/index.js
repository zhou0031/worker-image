import {error,json,Router} from 'itty-router'

const router = Router()

async function auth(request,env,ctx){
	const authResponse = await env.auth.fetch(request.clone())
	if (authResponse.status !== 200) 
		return error(401,"Invalid request")	
}


router
	.all('*',auth)
	.get("/",handleRequest)

export default {
	async fetch(request, env, ctx) {
		return router.handle(request,env,ctx).then(json).catch(error)
		//return await handleRequest(request);
	},
};

async function handleRequest(request){
	const imageUrlParam = new URL(request.url).searchParams.get('url');
		
	// Check if the 'url' parameter is present
	if (!imageUrlParam) {
		return new Response('Image URL not provided', {
		  status: 400,
		  headers: { 'Content-Type': 'text/plain' },
		});
	}

	const requestHeaders = {
		'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
		'Referer': 'https://310soft.com',
		'Cache-Control': 'public, max-age=31536000, immutable', // 1 year in seconds
		'Expires': new Date(Date.now() + 31536000000).toUTCString(), // 1 year in milliseconds
		'Referrer-Policy': 'strict-origin-when-cross-origin',
	  };

	  const requestInit = {
		method: 'GET',
		headers: requestHeaders,
	  };

	  try {
		const response = await fetch(imageUrlParam, requestInit);
	
		// Check if the response status is OK (200)
		if (response.ok) {
		 return new Response(await response.arrayBuffer())
		} else {
		  console.error('Request failed with status:', response.status);
		}
	  } catch (error) {
		console.error('Error during tile request:', error);
	  }
}


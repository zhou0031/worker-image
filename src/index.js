export default {
	async fetch(request, env, ctx) {
		
		return await handleRequest(request);
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
		'User-Agent': 'Your-Application-User-Agent',
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
		  console.error('Tile request failed with status:', response.status);
		}
	  } catch (error) {
		console.error('Error during tile request:', error);
	  }
}


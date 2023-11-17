export default {
	async fetch(request, env, ctx) {
		return await handleRequest(request);
	},
};


async function handleRequest(request){
	const requestUrl = new URL(request.url);
	const TILE_URL = 'https://tile.openstreetmap.org'+requestUrl.pathname
	
	const requestHeaders = {
		'User-Agent': 'Your-Application-User-Agent',
		'Referer': 'https://310soft.com',
		'Cache-Control': 'public, max-age=86400', // 24 hours in seconds
		'Expires': new Date(Date.now() + 86400000).toUTCString(), // 24 hours in milliseconds
	  };

	  const requestInit = {
		method: 'GET',
		headers: requestHeaders,
	  };

	  try {
		const response = await fetch(TILE_URL, requestInit);
	
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


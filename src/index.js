export default {
	async fetch(request, env, ctx) {
		/*
		const url = new URL(request.url);
		const searchParams = url.searchParams;
		const accessToken = searchParams.get('access_token');
		
		if(!accessToken){
			return new Response("Token Missing",{
				status:401
			})
		}
		
		const isValid=totp.check(accessToken,env.SECRET)
		if(!isValid)
			return new Response("Invalid Token: "+accessToken,{
			status:401
		})
		*/
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
		'Cache-Control': 'public, max-age=86400', // 24 hours in seconds
		'Expires': new Date(Date.now() + 86400000).toUTCString(), // 24 hours in milliseconds
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


const CACHE_NAME = 'PGNEW'

const addResourcesToCache = async (resources) => {
  try {
    const cache = await caches.open(CACHE_NAME)
    await cache.addAll(resources)
  } catch (e) {
    console.log(e)
  }
}

const putInCache = async (request, response) => {
  try {
    const cache = await caches.open(CACHE_NAME)
    await cache.put(request, response)
  } catch (e) {
    console.log(e)
  }
}

const cacheFirst = async ({ request, preloadResponsePromise, fallbackUrl }) => {
  // First try to get the resource from the cache
  const responseFromCache = await caches.match(request)
  if (responseFromCache) {
    return responseFromCache
  }

  // Next try to use the preloaded response, if it's there
  const preloadResponse = await preloadResponsePromise
  if (preloadResponse) {
    console.info('using preload response', preloadResponse)
    await putInCache(request, preloadResponse.clone())
    return preloadResponse
  }

  // Next try to get the resource from the network
  try {
    const responseFromNetwork = await fetch(request)
    // response may be used only once
    // we need to save clone to put one copy in cache
    // and serve second one
    await putInCache(request, responseFromNetwork.clone())
    return responseFromNetwork
  } catch (error) {
    const fallbackResponse = await caches.match(fallbackUrl)
    if (fallbackResponse) {
      return fallbackResponse
    }
    // when even the fallback response is not available,
    // there is nothing we can do, but we must always
    // return a Response object
    return new Response('Network error happened', {
      status: 408,
      headers: { 'Content-Type': 'text/plain' },
    })
  }
}

// self.addEventListener('activate', (event) => {
// 	event.waitUntil(
// 	    (async () => {
// 	      if (self.registration.navigationPreload) {
// 	        // Enable navigation preloads!
// 	        await self.registration.navigationPreload.enable();
// 	      }
// 	    })(),
// 	  );
// });

self.addEventListener('install', (event) => {
  event.waitUntil(addResourcesToCache(/*files*/))
})

self.addEventListener('fetch', (event) => {
  // if(event.request.url && !(new RegExp('/api759/').test(event.request.url))){
  if (/\.(png|jpg|webp|svg|jpeg|css|woff2|ico|js)$/gi.test(event.request.url)) {
    event.respondWith(
      cacheFirst({
        request: event.request,
        preloadResponsePromise: event.preloadResponse,
        fallbackUrl: '/logo.png',
      }),
    )
  }
})

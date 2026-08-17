export default {
  async fetch(request, env) {
    const assetResponse = await env.ASSETS.fetch(request);

    if (assetResponse.status !== 404) {
      return assetResponse;
    }

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return assetResponse;
    }

    const indexUrl = new URL('/index.html', request.url);
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};

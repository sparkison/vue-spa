// import Vue from 'vue'
import axios from 'axios'
import store from '../store'
// import router from '../router'
// import swal from 'sweetalert'
// import i18n from '../plugins/i18n'
import { cacheAdapterEnhancer, throttleAdapterEnhancer } from 'axios-extensions';

/*
 * Add cache adapter
 * More info: https://github.com/kuitos/axios-extensions
 *
 * Example flow:
 * axios.get('/users'); // make real http request
 * axios.get('/users'); // use the response from the cache of previous request, without real http request made
 * axios.get('/users', { cache: false }); // disable cache manually and the the real http request invoked
 *
 * axios.get('/users', { cache: cacheA }); // two actual request will be made due to the different cache
 * axios.get('/users', { cache: cacheB });
 *
 * http.get('/users', { cache: cacheA, forceUpdate: true }); // a actual request made and cached due to force update configured
 */
axios.defaults.adapter = cacheAdapterEnhancer(axios.defaults.adapter, {
  enabledByDefault: false, // default to not caching responses (can override on per-request basis if needed)
  cacheFlag: 'cache'
});

// Request interceptor
axios.interceptors.request.use(request => {
  // Set locale
  const locale = store.getters['lang/locale']
  if (locale) {
    request.headers.common['Accept-Language'] = locale
  }

  // request.headers['X-Socket-Id'] = Echo.socketId() // If using Laravel Echo, pass socket ID
  return request
});

// Response interceptor
axios.interceptors.response.use(response => response, error => {
  // Get the response status
  const { status } = error.response

  /*
   * Take action based on response type
   */
  switch (status) {
    case 500:
      console.error('server "500 Internal Server Error" error', error);
      // @TODO...
      break

    case 405:
      console.error('server "405 method not allowed" error', error);
      // @TODO...
      break

    case 403:
      console.error('server "403 forbidden" error', error);
      // @TODO...
      break

    case 401:
      console.error('server "401 unauthorized" error', error);
      // @TODO...
      break

    default:
      console.error('server "' + status + '" error', error);
    // @TODO...
  }

  return Promise.reject(error)
});

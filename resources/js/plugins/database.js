import localforage from 'localforage'

// Add search functionality
// Info: https://github.com/localForage/localForage-startsWith
import { extendPrototype } from 'localforage-startswith'

extendPrototype(localforage)

localforage.config({
  driver: localforage.INDEXEDDB, // Force IndexedDB; same as using setDriver()
  name: '__tmi__',
  storeName: 'centurylink_tmi',
  description: 'CenturyLink TMI offline store'
})

export default localforage

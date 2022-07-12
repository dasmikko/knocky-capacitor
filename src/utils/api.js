import axios from "axios"
import { Http } from '@capacitor-community/http';



function KnockoutApiCallNative(type, options = {}) {
  return new Promise( (resolve, reject) => {
    const baseUrl = 'https://api.knockout.chat'

    let mergedOptions = {
      ...options,
      baseURL: baseUrl,
      withCredentials: true,
    }
    console.log(mergedOptions)

    Http.get(mergedOptions).then(response => {
      resolve(response.data)
    }).catch(reason => reject(reason))
  })
}

function KnockoutApiCall(type, options = {}) {
  return new Promise( (resolve, reject) => {
    const baseUrl = 'https://api.knockout.chat'

    let mergedOptions = {
      method: type,
      baseURL: baseUrl,
      withCredentials: true,
      ...options
    }

    //mergedOptions.url = options.url

    axios(mergedOptions).then(response => {
      resolve(response.data)
    }).catch(reason => reject(reason))
  })
}


// Api functions

export function getForum () {
  return KnockoutApiCall('get', {
    url: '/subforum'
  })
}

export function getSubforum (id, page = 1) {
  return KnockoutApiCall('get', {
    url: `/subforum/${id}/${page}`
  })
}

export function getThread (id, page = 1) {
  return KnockoutApiCall('get', {
    url: `/v2/threads/${id}/${page}`
  })
}

export function getSyncData () {
  return KnockoutApiCall('get', {
    url: `/user/syncData`
  })
}

export function getUser () {
  return KnockoutApiCall('get', {
    url: `/user`
  })
}

export function getAlerts (page = 1, hideNsfw = true) {
  return KnockoutApiCall('get', {
    url: `/v2/alerts/${page}?hideNsfw=${hideNsfw}`
  })
}

export function getLatestThreads () {
  return KnockoutApiCall('get', {
    url: `/v2/threads/latest`
  })
}

export function getPopularThreads () {
  return KnockoutApiCall('get', {
    url: `/v2/threads/popular`
  })
}

export function createAlert (threadId, lastPostNumber) {
  return KnockoutApiCall('post', {
    url: `/alert`,
    data: {
      threadId,
      lastPostNumber
    }
  })
}

export function unsubscribe (threadId) {
  return KnockoutApiCall('delete', {
    url: `/v2/alerts/${threadId}`,
    data: {
      threadId,
    }
  })
}

export function readThreads (threadId, lastSeen) {
  return KnockoutApiCall('post', {
    url: `/readThreads`,
    headers: {
      'content-format-version': 1
    },
    data: {
      threadId,
      lastSeen
    }
  })
}



export function logout () {
  return KnockoutApiCall('post', {
    url: `/auth/logout`
  })
}




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
      method: 'get',
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


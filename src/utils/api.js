import axios from "axios"
import { Http } from '@capacitor-community/http';

function KnockoutApiCall(type, options = {}) {
  return new Promise( (resolve, reject) => {
    const baseUrl = 'https://api.knockout.chat'

    let mergedOptions = {
      ...options
    }

    mergedOptions.url = baseUrl + options.url

    Http.get(mergedOptions).then(response => {
      resolve(response.data)
    }).catch(reason => reject(reason))
  })
}

function KnockoutApiCall2(type, options = {}) {
  return new Promise( (resolve, reject) => {
    const baseUrl = 'https://api.knockout.chat'

    let mergedOptions = {
      method: 'get',
      ...options
    }

    mergedOptions.url = baseUrl + options.url

    axios.get(mergedOptions.url).then(response => {
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


import axios from "axios"
import { Http } from '@capacitor-community/http';

function KnockoutApiCall(type, options = {}) {
  return new Promise( (resolve, reject) => {
    const baseUrl = 'https://api.knockout.chat'

    let mergedOptions = {
      ...options
    }

    mergedOptions.url = baseUrl + options.url

    console.log(mergedOptions)

    Http.get(mergedOptions).then(response => {
      resolve(response.data)
    }).catch(reason => reject(reason))
  })
}

export function getSubforum (username, password) {
  return KnockoutApiCall('get', {
    url: '/subforum'
  })
}
import axios from "axios"
import { HTTP } from '@awesome-cordova-plugins/http';

const http = new HTTP()

function KnockoutApiCall(url, options = {}) {
  return new Promise( (resolve, reject) => {
    const baseUrl = 'https://api.knockout.chat'

    http.get(baseUrl + url).then(response => {
      resolve(reponse.data)
    }).catch(reason => reject(reason))
  })
}

export function getSubforum (username, password) {
  return KnockoutApiCall('/subforum', 'get')
}
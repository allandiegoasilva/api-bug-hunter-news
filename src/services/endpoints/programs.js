
class HackeroneEndpoint {
  static _BASE_URL = "https://api.hackerone.com/v1"; 

  static getEndpoint(endpoint){
    return HackeroneEndpoint._BASE_URL + this.endpoint;
  }
}

module.exports = HackeroneEndpoint; 
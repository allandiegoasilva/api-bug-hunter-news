const endpoint = require("../config/hackerone.endpoints");
const axios = require("axios");

class Hackerone {
  constructor(token){
    token = Buffer.from(token).toString("base64"); 

    this.axios = axios.create({
      baseURL: endpoint.base_url,
      headers: {
        authorization: `Basic ${token}`
      }
    });
  }

  async programs(pagenumber = 0, pageSize = 0){
    try {
      const { data } = await this.axios.get(endpoint.programs); 
      const programs = data.data; 
      let items = [];

      programs.map(program => {
          console.log(program)
          let atributes = program.attributes;
          items.push({
            handle: atributes.handle, 
            from: "Hackerone", 
            name: atributes.name,
            image: atributes.profile_picture, 
            offer_payment: atributes.offers_bounties,
            public: atributes.state == "public_mode"
          });
      });

      return items; 
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Hackerone;
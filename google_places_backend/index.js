require ("dotenv").config()
const express = require("express");
const axios = require("axios");
const cors = require('cors')

const app = express();

app.use(cors());

app.get('/all-places/:title/:loc', async (req, res) => {
    const {next_page_token} = req.query;
    const {title , loc }= req.params;
    try {
    let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${title}%20in%20${loc}&key=${process.env.API_KEY}&maxResults=10`;

    if(next_page_token) url = url+`&pagetoken=${next_page_token}`;

    const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error("Error generated");
      }
  
      const data = await response.json();
  
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.get('/details/:placeid', async (req, res) => {
    const {placeid}= req.params;
    try {
    const response = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Cformatted_address%2Cgeometry%2Cformatted_phone_number%2Curl%2Crating%2Cformatted_phone_number%2Cphotos%2Creviews&place_id=${placeid}&key=${process.env.API_KEY}`);
      
      if (!response.ok) {
        throw new Error("Error generated");
      }
  
      const data = await response.json();
  
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.listen(8000,() => {
    console.log("Server is working at localhost:8000");
})

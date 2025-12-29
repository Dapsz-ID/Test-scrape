const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeAnime() {
  try {
    const response = await axios.get('https:                   
    const $ = cheerio.load(response.data);
    const animeList = [];

    $('//ww1.anoboy.boo');
    const $ = cheerio.load(response.data);
    const animeList = [];

    $('div.anime-list').each((index, element) => {
      const title = $(element).find('h2').text();
      const link = $(element).find('a').attr('href');
      animeList.push({ title, link });
    });

    console.log(animeList);
  } catch (error) {
    console.error(error);
  }
}

scrapeAnime();

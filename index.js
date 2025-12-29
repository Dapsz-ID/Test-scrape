const axios = require('axios');
const cheerio = require('cheerio');

const BASE = 'https://ww1.anoboy.boo';

(async () => {
  const { data: html } = await axios.get(BASE);
  const $ = cheerio.load(html);

  const results = [];

  $('tr').each((_, el) => {
    const a = $(el).find('td a');
    const title = a.text().trim();
    const url = a.attr('href');

    if (!title || !url) return;

    results.push({ title, url });
  });

  for (let item of results) {
    try {
      const { data: detail } = await axios.get(item.url);
      const $d = cheerio.load(detail);

      const image =
        $d('meta[property="og:image"]').attr('content') ||
        $d('article img').first().attr('src') ||
        '';

      let rilis = '';
      $d('*').each((_, el) => {
        const t = $d(el).text().trim();
        if (/rilis/i.test(t)) {
          rilis = t.replace(/.*Rilis[:\s]*/i, '').trim();
        }
      });

      console.log({
        title: item.title,
        image,
        rilis
      });
    } catch (e) {}
  }
})();

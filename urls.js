const cheerio = require("../node_modules/cheerio");
const _ = require("lodash");
const axios = require("axios");
const url = "https://github.com/trending";
const Promise = require("bluebird");
const urls = [];

const result = {
  main: [],
  reqest: []
};

const getUrls = async ur => {
  let $;
  try {
    const body = await axios.get(ur);
    $ = cheerio.load(body.data);
  } catch (error) {
    console.log(error);
  }
  $(".select-menu-item").each(function(i, element) {
    const $element = $(element);
    let $l = $element.find("span").text();
    languageUrl = `https://github.com/trending/${$l}?since=daily`;
    urls.push(languageUrl);
  });
};
const languageScraper = async url => {
  Promise.all(
    url.map(async u => {
      axios.get(u).then(body => {
        const $ = cheerio.load(body.data);
        $(".repo-list li").each(function(i, element) {
          const $element = $(element);
          const $title = $element.find("h3 a").text();
          let t = _.replace($title, /\n/g, "").trim();
          const $desc = $element.find(".py-1 p").text();
          let d = _.replace($desc, /\n/g, "").trim();
          const $author = $element.find(".d-inline-block span").text();
          let auth = _.replace($author, /\n/g, "").trim();
          languageS = {
            title: t,
            desc: d,
            labguage: auth
          };
          result.reqest.push(languageS);
        });
        console.log(result);
      });
    })
  );
};

const test = async () => {
  let surl = [];
  let j = 0;
  await getUrls(url);
  for (let i = 5; i < 10; i += 5) {
    surl = urls.slice(j, i);
    j += 5;
    languageScraper(surl);
  }
};

test();

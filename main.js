const cheerio = require("../node_modules/cheerio");
const request = require("..//node_modules/request");
const fetch = require("node-fetch");
const url = "https://github.com/trending";

const githubTrending = () => {
  return fetch(url).then(
    response => {
      if (response.ok) {
        return response.text();
      }
      throw new Error("Request faild");
    },
    networkError => {
      console.log(networkError.message);
    }
  );
};
githubTrending().then(body => {
  var self = this;
  self.items = new Array();
  const $ = cheerio.load(body);
  $(".repo-list li").each(function(i, element) {
    const $element = $(element);
    const $title = $element.find("h3 a").text();
    var t = $title.replace(/\n/g, "").trim();
    const $desc = $element.find(".py-1 p").text();
    var d = $desc.replace(/\n/g, "").trim();
    const $author = $element.find(".d-inline-block span").text();
    let auth = $author.substr($author.indexOf("/") + 0).trim();
    // console.log(auth);
    self.items[i] = {
      id: i,
      title: t,
      desc: d,
      language: auth
    };
  });
  console.log(self.items);
});

const cheerio = require('../node_modules/cheerio');
const request = require('..//node_modules/request');
const fetch = require('node-fetch');
const url = 'hackbuddy.in';


const githubTrending = ()=>{
    return fetch(url).then(response =>{
        if(response.ok){
            return response.text()
        }throw new Error ('Request faild');  
    },networkError=>{
        console.log(networkError.message)
    });    
}
githubTrending().then(body =>{
        var self = this;
		self.items = new Array();
    const $ = cheerio.load(body);
    $('.explore-content').each(function(i,element){
        const $element = $(element);
        const $title = $element.find('li span').text()
        console.log($title)
        const $desc = $element.find('p' ).text()
        console.log($desc);
        self.items[i] = {
            title: $title,
            desc: $desc

        };
    });
    console.log(self.items) 
});

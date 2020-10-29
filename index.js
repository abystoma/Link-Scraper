//const [,,directory,url,file] = process.argv
const directory = "dir",
  url = "https://docs.python.org/3/",
  file = "index.html";
const fs = require("fs");
const color = require("colors");
const axios = require("axios");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

try {
  fs.mkdirSync(__dirname + "/" + directory);
} catch (err) {
  console.log(err.message);
}

axios.get(url).then((data) => {
  fs.writeFileSync(__dirname + "/" + directory + "/" + file, data.data);
  const {
    window: { document },
  } = new JSDOM(data.data);
  const links = document.querySelectorAll("a");
  //console.log(links);
  const arr = ["a", "title", "ul", "ol", "li", "p"];
  arr.forEach((tag, index) => {
    const elems = document.querySelectorAll(tag);
    console.log(index, tag);
  });
  let content = `<head> 
    <style> 
        a{
            color: #111;
            padding: 5px;
            display: block;
            font-family: Arial;
        }
    </style>
  </head>`;
  Array.from(links).forEach((a) => {
    const isAbsolute = a.href.startsWith("https://");
    console.log(color.blue.bold(a.textContent));
    content += `<a href = ${
      isAbsolute ? a.href : "https://docs.python.org/" + a.href
    }> ${a.textContent} </a> \n </br>`;
  });
  fs.writeFileSync(__dirname + "/" + directory + "/" + "link.html", content);
});

const fs = require('fs')
const path = require('path')
const { JSDOM } = require('jsdom')
const manifest = require('./build/asset-manifest.json'); // eslint-disable-line
const pkg = require('./package.json')

const indexPath = path.resolve(__dirname, 'build/index.html')
const html = fs.readFileSync(indexPath, 'utf8')
const dom = new JSDOM(html)

const scripts = dom.window.document.querySelectorAll('script')
const links = dom.window.document.querySelectorAll('link')

const includeStyles = Array.from(links)
  .filter((link) => /.*\.chunk\.css$/.test(link.href))
  .map((link) => link.href)

const includeScripts = []
let setupScriptText = ''

scripts.forEach((script) => {
  if (script.src) {
    includeScripts.push(script.src)
    return
  }

  if (script.text) {
    setupScriptText += script.text
  }
})

const hash = Date.now().toString(16)
const setupFileName = `setup.${hash}.js`
const setupFilePath = path.resolve(__dirname, `build/${setupFileName}`)
fs.writeFileSync(setupFilePath, setupScriptText, 'utf8')
includeScripts.unshift(path.join(pkg.homepage, setupFileName))

const arrayify = (arr) => arr.map(JSON.stringify.bind(JSON)).join(',')

const baseFilePath = path.resolve(__dirname, 'build/base.js')
fs.writeFileSync(
  baseFilePath,
    `(function(document, styles, scripts) {
  styles.forEach(function(href) {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
  });
  scripts.forEach(function(src) {
    var script = document.createElement('script');
    script.charset = 'UTF-8';
    script.type = 'text/javascript';
    script.src = src;
    document.body.appendChild(script);
  });
})(document, [${arrayify(includeStyles)}], [${arrayify(includeScripts)}]);
`,
    'utf8'
)

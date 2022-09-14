import {Pattern, UrlWildcharMatcher } from "./UrlWildcharMatcher.js"


let patternList = [
		new Pattern('/objects/*/users', 'User'),
		new Pattern('/objects/0/users', 'User'),
		new Pattern('/objects/global/users', 'GlobalUser'),
		new Pattern('/sites/*', 'City')
]
let m = new UrlWildcharMatcher(patternList);
console.log(m.patterns)

let url;
let ptn;
url = '/objects/global/users'
ptn = m.find(url)
console.log('found:',ptn)

url = '/objects/0/role'
ptn = m.find(url)
console.log('found:',ptn)

url = '/objects/country/users'
ptn = m.find(url)
console.log('found:',ptn)

url = '/objects/country'
ptn = m.find(url)
console.log('found:',ptn)

url = '/sites/abc'
ptn = m.find(url)
console.log('found:',ptn)

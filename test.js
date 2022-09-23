import { assert } from "https://deno.land/std@0.155.0/testing/asserts.ts"
import {Pattern, UrlWildcharMatcher } from "./UrlWildcharMatcher.js"


let patternList = [
		new Pattern('/objects/*/users', 'User*'),
		new Pattern('/objects/*/roles', 'Roles*'),
		new Pattern('/objects/0/users', 'User'),
		new Pattern('/objects/*/users', 'User'),
		new Pattern('/objects/global/users', 'GlobalUser'),
		new Pattern('/sites/*', 'City')
]
let m = new UrlWildcharMatcher(patternList);
console.log(m.patterns)

let url;
let ptn;

Deno.test("unit test",()=> {

url = '/objects/0/roles'
ptn = m.find(url)
console.log('found:',ptn)

url = '/objects/global'
ptn = m.find(url)
console.log('found:',ptn,url)
assert(!ptn)

url = '/objects/global/users'
ptn = m.find(url)
console.log('found:',ptn,url)
assert(ptn)

url = '/objects/global/users/00'
ptn = m.find(url)
console.log('found:',ptn,url)
assert(!ptn)


url = '/objects/0/role'
ptn = m.find(url)
console.log('found:',ptn, url)
assert(!ptn)

url = '/objects/country/users'
ptn = m.find(url)
console.log('found:',ptn, url)
assert(ptn)

url = '/objects/country'
ptn = m.find(url)
console.log('found:',ptn, url)
assert(!ptn)

url = '/sites/abc'
ptn = m.find(url)
console.log('found:',ptn,url)
assert(ptn)


})

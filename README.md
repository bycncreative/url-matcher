# Url matcher

Match url from url pattern list fastly.

> url patterns:

	/objects/*/users	 (`*` stands for any characters between two `/` )

## Usage:

	let patternList = [new Pattern('/objects/*/users'), new Pattern('/sites/city')]
	let m = new UrlWildcharMatcher(patternList);
	let pattern = m.find('/objects/country/users');




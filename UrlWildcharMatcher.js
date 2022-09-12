
class Node {
	constructor(name,ptnLeaf, child){
		this.ptnLeaf = ptnLeaf
		this.name = name
		this.child = child
	}
}

export class Pattern{
	constructor(format,userData){
		this.format = format
		this.userData = userData
	}
}

export class UrlWildcharMatcher {
	constructor(patternList){
		this.patterns = this._compile(patternList)
	}	

	find(urlPath){
		let n = this.patterns;
		let arr = urlPath.split('/');
		if(arr[0]=='') arr.shift();
		//console.log('path to find:', arr)
		for(let i=0;i<arr.length;i++){
			let a = arr[i];
			if(!n)
				break;
			let na = n[a]||n['*'];
			if(na && i==arr.length-2){
				return na.ptnLeaf;
			}
			if(!na){
				break;
			}
			n = na.child
		}
		return null;
	}


	_appendPtn(cptns, ptn){
		let n = cptns;
		let arr = ptn.format.split('/');
		if(arr[0]=='') arr.shift();
		//console.log('arr to compile:',arr)
		for(let i=0;i<arr.length;i++){
			let a = arr[i];
			if(!n) 
				break;
			if(n[a]) {
				if(i==arr.length-2){
					n[a].ptnLeaf = ptn;
				}
			}else{
				n[a] = new Node(a,i==arr.length-2? ptn:null, {});
			}
			n = n[a].child
		}

	}
	_compile(patternList){
		let cptns = {};
		for(let ptn of patternList){
			this._appendPtn(cptns,ptn);	
		}
		return cptns;
	}	
}



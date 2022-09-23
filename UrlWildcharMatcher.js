
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
	/**
	 *@returns Pattern object or null
	 */
	find(urlPath){
		let n = this.patterns;
		let arr = urlPath.split('/');
		if(arr[0]=='') arr.shift();
		//console.log('path to find:', arr)
		return this._find(n,arr,0);
	}

	_find(n,arr,i){
		//console.log(n, i);
		if(!n || i>=arr.length) return null;
		//console.log(arr[i]);
		let a = arr[i]
		let na = n[a]||n['*'];
		if(!na) 
			return null;
		if(i==arr.length-1){
			return na.ptnLeaf;
		}
		let r = this._find(na.child, arr, i+1);
		if(!r && na.name !='*' && n['*'])
			r = this._find(n['*'].child,arr,i+1);
		return r;
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
				if(i==arr.length-1){
					n[a].ptnLeaf = ptn;
				}
			}else{
				n[a] = new Node(a,i==arr.length-1? ptn:null, {});
			}
			n = n[a].child
		}

	}

	/**  format:
	 *   { 
	 *      path1: {	name: 'path1', 
	 *					pthLeaf: o,
	 *					child: {pathi: {} } 
	 *			   }
	 *
	 *		pathi:{  }
	 *   }
	 *
	 */
	_compile(patternList){
		let cptns = {};
		for(let ptn of patternList){
			this._appendPtn(cptns,ptn);	
		}
		return cptns;
	}	
}



var title = "Generate Prime #'s"
var prs = []

//percentage math
//Math.floor((i/limit())*10)

function load(){
	prs = []
	document.getElementById('title').innerHTML = title
}


function generate_prime_numbers(){
	
	prs = []
	document.getElementById('output').innerHTML = ''
	
	var p = prs.length
	
	for(var i = limit('a'); i < limit('b'); i++){
		var s = 0
		for(var d = 2; d < i; d++){
			if((i/d)*1000 === Math.ceil(i/d)*1000)
				s=1
			if(d === i-1 && s === 0)
				prs.push(i)
		}
	}
	
	document.getElementById('output').innerHTML = prs.join(', ')
}

function limit(r){
	return Number(document.getElementById('input_' + r).innerHTML)
}
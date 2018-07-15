var title = 'Solve X'

//pull user input value from <input> element
var input, A, A_sign, solution
var score = [0,0]

function init(){
	A 		 = Math.round(Math.random()*13)
	A_sign   = sign(A,solution)
	solution = Math.round(Math.random()*23)
	
	document.getElementsByTagName("TITLE")[0] = title

	fillContent_by_id('title'    , title)
	fillContent_by_id('X'        , 'X')
	fillContent_by_id('A'        , A)
	fillContent_by_id('A_sign'   , A_sign)
	fillContent_by_id('solution' , solution)
	
	document.getElementById('input_box').style.visibility = 'visible'
	document.getElementById('input').focus()
}

//populate the element with output value
function send(){
	assignContent_by_id('A')
	assignContent_by_id('solution')
	input = document.getElementById('input').value
	document.getElementById('user_text').innerHTML = ''
	
	if(input === '')
		{user_error("you didn't enter anything")}
	else
	if(!Number(input) && input != 0)
		{user_error('"' + input + '"' + ' is not a number')} 
	else
	if(calculate() === Number(solution))
		{pass_build()} 
	else 
		{fail_build()}
	
	document.getElementById('input').focus()
	
}

function user_error(text){
	document.getElementById('user_text').style.color = 'blue'
	document.getElementById('user_text').innerHTML = text
	document.getElementById('input').value = null
}

function fillContent_by_id(id,content){
	document.getElementById(id).innerHTML = content
}

function assignContent_by_id(id,v){
	v = document.getElementById(id).innerHTML
}

function assignValue_by_id(id){
	id = document.getElementById(id).value
}

function exp_scramble(v){
	return v.split('X =')
}

function next(){
	document.getElementById('btn').onclick = send
	document.getElementById('btn').innerHTML = 'Calculate'
	clear_it()
	init()
}


function pass_build(){
	update_score('pass')
	fillContent_by_id('X', input)
	fillContent_by_id('user_text', 'Correct!')
	document.getElementById('user_text').style.color = 'green'
	document.getElementById('btn').onclick = next
	document.getElementById('btn').innerHTML = 'Next'
	document.getElementById('input').value = null
	document.getElementById('input_box').style.visibility = 'hidden'
}

function fail_build(){
	update_score('fail')
	fillContent_by_id('X', input)
	fillContent_by_id('user_text', 'Incorrect')
	document.getElementById('user_text').style.color = 'red'
	document.getElementById('input').value = null
}

function update_score(type){
	if(!type){
		score[1]=score[1]+1
		fillContent_by_id('score_' + type, score[1])
	}else if(type === 'fail'){
		score[1]=score[1]+1
		fillContent_by_id('score_pass', score[0])
		fillContent_by_id('score_fail', score[1])
	}else if(type === 'pass'){
		score[0]=score[0]+1
		fillContent_by_id('score_pass', score[0])
		fillContent_by_id('score_fail', score[1])
	} else {
		error('check parameters -> update_score')
	}
}

function error(text){
	console.log('error: ' + text)
}

function clear_it(){
	document.getElementById('user_text').innerHTML = ''
}

function sign(a,b){
	var d
	if(a>b){d = b}else{d = a}
		error((a+b)/d)
	if(((a+b)/d) > 5)
		return '-'
	else
		return '+'
}

function calculate(){
	if(A_sign == '-')
		return Number(A) - Number(input)
	
	if(A_sign == '+')
		return Number(A) + Number(input)
}

document.getElementsByTagName("BODY")[0].addEventListener("keyup", function(event) {
  event.preventDefault()
  if (event.keyCode === 13) {
	if(document.getElementById("btn").innerHTML === 'Calculate')
    	send()
    else
    	next()
  }
})
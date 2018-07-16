var title = 'Solve X'

//pull user input value from <input> element
var input, A, A_sign, solution, level = 1
var score = [0,0],
	best_streak = [0,0,0],
	current_streak = 0
	
function load(){
	document.getElementById('current_streak').innerHTML = 0
	document.getElementById('best_streak').innerHTML = 0
	update_difficulty(0)
}

function init(){
	generate_formula()
	
	document.getElementById('user_text').innerHTML = ''
	
	document.getElementsByTagName("TITLE")[0] = title

	fillContent_by_id('title'    , title)
	fillContent_by_id('X'        , 'X')
	fillContent_by_id('A'        , A)
	fillContent_by_id('A_sign'   , A_sign)
	fillContent_by_id('solution' , solution)
	
	document.getElementById('input_box').style.visibility = 'visible'
	document.getElementById('input').focus()
}

function generate_formula(){
	var cycle_cnt = 0
	var tmp_A 		 = Math.round(Math.random()*(13*level))
	var tmp_A_sign   = sign(A,solution)
	var tmp_solution = Math.round(Math.random()*(23*level))
	var diff = Number(tmp_A) / Number(tmp_solution)
	if(diff < 1.2 && diff > 0.8 || tmp_A === 0 || tmp_solution === 0){
		cycle_cnt++
		generate_formula()
	}else{
		A 		 = tmp_A
		A_sign   = tmp_A_sign
		solution = tmp_solution
		console.log(cycle_cnt)
		cycle_cnt = 0
	}
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
	init()
}


function pass_build(){
	update_score('pass')
	current_streak++
	update_streak()
	console.log(current_streak)
	fillContent_by_id('X', input)
	fillContent_by_id('user_text', 'Correct!')
	document.getElementById('user_text').style.color = 'green'
	document.getElementById('btn').onclick = next
	document.getElementById('btn').innerHTML = 'Next'
	document.getElementById('input').value = null
	document.getElementById('input_box').style.visibility = 'hidden'
}

function fail_build(){
	update_streak()
	current_streak = 0
	document.getElementById('current_streak').innerHTML = 0
	update_score('fail')
	fillContent_by_id('X', input)
	fillContent_by_id('user_text', 'Incorrect')
	document.getElementById('user_text').style.color = 'red'
	document.getElementById('input').value = null
}

function update_streak(){
	if(current_streak === 0){
		document.getElementById('best_streak').innerHTML = 0
	}else if(current_streak > best_streak[level-1]){
		best_streak[level-1] = current_streak
		document.getElementById('best_streak').innerHTML = current_streak
	}
	
	document.getElementById('current_streak').innerHTML = current_streak
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

function sign(a,b){
	if(Math.random()*11>5)
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

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("difficulty").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("difficulty-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

function update_difficulty(lvl){
	level = Number(lvl) +1
	document.getElementById('level').innerHTML = level
	init()
}
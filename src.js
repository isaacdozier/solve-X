//pull user input value from <input> element
var input, 
	A, 
	A_sign, 
	solution, 
	level = 1

var score = [0,0],
	best_streak = [0,0,0,0],
	current_streak = 0

function init(){
	generate_formula()
	
	document.getElementById('user_text').innerHTML = ''
	
	fillContent_by_id('X'        , 'X')
	fillContent_by_id('A'        , A)
	fillContent_by_id('A_sign'   , A_sign)
	fillContent_by_id('solution' , solution)
	
	document.getElementById('input').focus()

	console.log(best_streak)
}

function generate_formula(){
	var tmp_A 		 = Math.round(Math.random()*(10*level))
	var tmp_solution = Math.round(Math.random()*(10*level))
	var tmp_A_sign   = sign(tmp_A,tmp_solution)
	
	var diff = Number(tmp_A) / Number(tmp_solution)
	if(diff < 1.2 && diff > 0.8 || tmp_A === 0 || tmp_solution === 0){
		generate_formula()
	}else{
		A 		 = tmp_A
		A_sign   = tmp_A_sign
		solution = tmp_solution
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
	document.getElementById('user_text').innerHTML   = text
	document.getElementById('input').value 			 = null
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


function pass_build(){
	score[0]=score[0]+1
	fillContent_by_id('score_pass', score[0])

	current_streak++
	update_streak()

	document.getElementById('input').value = null
	init()

	/*console.log(current_streak)
	fillContent_by_id('X', input)
	fillContent_by_id('user_text', 'Correct!')
	document.getElementById('user_text').style.color = 'green'
	document.getElementById('btn').onclick = next
	document.getElementById('btn').innerHTML = 'Next'
	document.getElementById('input').value = null
	document.getElementById('input_box').style.visibility = 'hidden'*/
}

function fail_build(){
	score[1]=score[1]+1
	fillContent_by_id('score_fail', score[1])
	
	current_streak = 0
	update_streak()

	document.getElementById('input').value = null

	document.getElementById('user_text').innerHTML = 'Incorrect'
	document.getElementById('user_text').style.color = 'red'
}

function update_streak(){
	if(current_streak > best_streak[best_lvl()]){
		best_streak[best_lvl()] = current_streak
		document.getElementById('best_streak').innerHTML  = current_streak
	}

	document.getElementById('current_streak').innerHTML = current_streak
}

function best_lvl(){
 	if(level === 1){return 0}
 	if(level === 10){return 1}
 	if(level === 100){return 2}
 	if(level === 1000){return 3}
	if(level === 10000){return 4}
 }

function error(text){
	console.log('error: ' + text)
}

function sign(a,b){
	if(a>b)
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
  }
})

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function difficulty() {
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
	level = Number(lvl)
	document.getElementById('level').innerHTML = level
	current_streak = 0
	document.getElementById('current_streak').innerHTML  = current_streak
	document.getElementById('best_streak').innerHTML     = best_streak[best_lvl()]
	init()
}

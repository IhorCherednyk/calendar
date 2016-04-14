var curentData = new Date();
var year = curentData.getFullYear();
var mont = curentData.getMonth();

function createCalendar(id,year,mont){
	var div = document.getElementById(id); // присваеваем айдишник елемнта в котором будет создан календарь
	var date = new Date(year, mont); // создаем дадту исходя из аргументов функции
	var lastMonthDate = new Date(date.getFullYear(), (date.getMonth() + 1), 0); // Получаем последнюю дату месяца
	var lastMonthDay = lastMonthDate.getDate(); // Получаем последнее число месяца
	var firstMonthDay = date; // получаем первый день месяца
	firstMonthDay.setDate(1); //устанавливаем первое число


	var arrMonth = ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"]; // создаем массив месяцов
	function createHeaderCal(){
		var headcal = document.createElement("div"); // Создаем шапку календаря
		headcal.className = "header-cal"; // вешаем на шапку класс
		var currentMonth = date.getMonth();  // текущий месяц
		var p = document.createElement("p"); // создаем параграфф
		p.className = "panel-cal"; // присваеваем ему класс
		p.innerHTML = arrMonth[currentMonth] + " " + date.getFullYear();// вставляем внутрь текст наш месяц через массив и добовляем год
		var row = document.createElement("div");//создаем первое поле спанов для дней недели
			row.className = "rowtop"
		var arrDays = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
		for (var i = 0; i < 7; i++) {
			var span = document.createElement("span");
			span.className = "klt";
			if(i == 5 || i == 6){
				span.className = "klt dayoff";// выходные дни
			}
			span.innerHTML = arrDays[i];
			row.appendChild(span)
		};
		div.appendChild(headcal);
		headcal.appendChild(p);
		headcal.appendChild(row);
	}
	createHeaderCal();

	function checkOfRows(date) {
		
		var a = firstMonthDay.getDay(); // Получаем первый день месяца
		a = (a !== 0) ? a : 7;

		function checkleapYear() {     // Вычисляем кол-во строк календаря
			if ( (lastMonthDay === 28) && (a === 1) ) {
				return 4;
			} else if ( ((lastMonthDay === 31) && (a === 6 || a === 7)) ||
				((lastMonthDay === 30) && (a === 7)) ) {
				return 6;
			} else {
				return 5;
			}
		}

		var monthObj = {
			firstMonthDay: a,
			bodyRows: checkleapYear()
		};
		return monthObj;
	}

	function createBodyCalk(){
		var rows = +checkOfRows(date).bodyRows;
		var firstDay = checkOfRows(date).firstMonthDay;		
		var bodycal = document.createElement("div");
		bodycal.className = "bodycal"
		var z = 1;
		var x  = 1;

		for (var i = 1; i <= rows; i++) { // i = 1 ; 1 < 7
			var row = document.createElement("div");
			row.className = "rowcal"
			for (var j = 1; j <= 7; j++) {
				var span = document.createElement("span");
				span.className = "klt";
				if (j === 6 || j === 7){
					span.className = "klt dayoff"
				}
				if(firstDay > 0 && firstDay > z){
					span.innerHTML = " ";
					row.appendChild(span);
					z++;
				}else if (x <= lastMonthDay){
					span.innerHTML = x;
					row.appendChild(span);
					x++;
				}else {
					span.innerHTML = " ";
					row.appendChild(span);
				}
			};
			bodycal.appendChild(row);
		};
		div.appendChild(bodycal);
	}
	createBodyCalk()
}
createCalendar("cal",year,mont);
	var el = function(element) {
		return document.querySelector(element); // Иначе возвращаем коллекцию элементов
	};
	var left = el(".left");
	var right = el(".right");

	left.onclick = lclick;
	right.onclick = rclick;
	function lclick(){
		var a = document.getElementById("cal");
		a.innerHTML = "";
		mont = mont - 1;
		createCalendar("cal", year, mont);
	}
	function rclick(){
		var a = document.getElementById("cal");
		a.innerHTML = "";
		mont = mont + 1;
		createCalendar("cal", year, mont);	
	}
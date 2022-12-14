displayNotes();
var addBtn = document.getElementById('addBtn');

// прослушиватель событий + добавление пользовательского ввода
addBtn.addEventListener('click',function(){
	
	let notesObj;
	let addNote = document.getElementById('addNote');
	let notesString = localStorage.getItem('notes');
	
	if(notesString == null){
		notesObj = [];
	}
	else{
		notesObj = JSON.parse(notesString);
	}
	
	//добавление даты и времени
	let now = new Date();
	let dateTime = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()} | ${now.getHours()}:${now.getMinutes()}`;
	
	
	//перемещение в локальное хранилище
	let tempObj = { text: addNote.value, time: dateTime };
	
	notesObj.push(tempObj);
	localStorage.setItem('notes',JSON.stringify(notesObj));
	
	addNote.value = '';
	
	displayNotes();
});


// функция отображения данных в локальном хранилище
function displayNotes(){
	let notesObj;
	let notesString = localStorage.getItem('notes');
	
	if(notesString == null){
		notesObj = [];
	}
	else{
		notesObj = JSON.parse(notesString);
	}
	
	let html = '';
	
	notesObj.forEach(function(element,index){
		html += `
				<div class="card mx-4 my-2 bg-secondary text-white thatsMyNote" style="width: 15rem;">
					<div class="card-body">
						<h6>${element.time}</h6>
						<p class="card-text">${element.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
						<button id="${index}" onclick=deleteNote(this.id) class="btn btn-danger">Удалить</button>
					</div>
				</div>
			`;
	});
	
	let noteEle = document.getElementById('notes');
	
	if(notesObj.length != 0){
		noteEle.innerHTML = html;
	}
	else{
		noteEle.innerHTML = '<h3 style="text-align: center; color: grey;">Нет заметок</h3>';
	}
	
}


//функция удаления заметок
function deleteNote(index){
	let notesObj;
	let notesString = localStorage.getItem('notes');
	
	if(notesString == null){
		notesObj = [];
	}
	else{
		notesObj = JSON.parse(notesString);
	}
	
	notesObj.splice(index,1);
	localStorage.setItem('notes',JSON.stringify(notesObj));
	
	displayNotes();
}



let search = document.getElementById('search');
search.addEventListener('input',function(e){
	
	let inputText = search.value;
	
	//инструкция ниже будет выполнена, когда строка поиска будет очищена
	if(inputText == ''){
		document.getElementById('noMatches').innerHTML = '';
	}
	
	var countNone = 0;
	
	let cards = document.getElementsByClassName('thatsMyNote');
	
	
	Array.from(cards).forEach(function(ele){
		let cardText = ele.getElementsByTagName('p')[0].innerText;
		if(cardText.includes(inputText)){
			ele.style.display = 'block';
		}
		else{
			ele.style.display = 'none';
			
			countNone++;
			
			if(countNone === cards.length){
				document.getElementById('noMatches').innerHTML = '<h3 style="text-align: center; color: grey;">Заметки не найдены</h3>';
			}
			else{
				document.getElementById('noMatches').innerHTML = '';
			}
		}
	});
	
	//код ниже будет выполнен, когда введенный текст будет соответствовать всем элементам
	if(countNone === 0){
		document.getElementById('noMatches').innerHTML = '';
	}
	
});
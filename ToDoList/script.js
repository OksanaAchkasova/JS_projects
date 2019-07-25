	function editEvent() {
 	  alert("Здесь будет реализована возможность редактирования данных о мероприятии");
	};

	//Функция для удаления мероприятий из таблиц
	function delEvent(r) { 
 	 	var table = event.target.parentNode.parentNode.parentNode.parentNode;
   		var i = r.parentNode.parentNode.rowIndex;
 		document.getElementById(table.id).deleteRow(i);
	};

	//Функция для добавления мероприятия в третью таблицу (пока так реализовано)
	function addEvent() {
 		var name = document.getElementById('eventName').value;
 		var date = document.getElementById('eventDate').value;
 		var startTime = document.getElementById('eventStartTime').value;
 		var endTime = document.getElementById('eventEndTime').value;
 	
 	 if (name && date && startTime && endTime) {
		var row = document.createElement("tr");
		var col1 = document.createElement("td");
		var col2 = document.createElement("td");
		var col3 = document.createElement("td");
		var col4 = document.createElement("td");
		var col5 = document.createElement("td");

		var text1 = document.createTextNode(name);
		var text2 = document.createTextNode(date);
		var text3 = document.createTextNode(startTime);
		var text4 = document.createTextNode(endTime);
		
		var button1 = document.createElement("i");
		var butAtr = document.createAttribute('class');
		butAtr.value = "fa fa-pencil fa-fw fa-border";
		button1.setAttributeNode(butAtr);
		var butAtr2 = document.createAttribute('onclick');
		butAtr2.value = 'editEvent()';
		button1.setAttributeNode(butAtr2);

		var button2 = document.createElement("i");
		var butAtr = document.createAttribute('class');
		butAtr.value = "fa fa-trash-o fa-lg fa-border";
		button2.setAttributeNode(butAtr);
		var butAtr2 = document.createAttribute('onclick');
		butAtr2.value = 'delEvent(this)';
		button2.setAttributeNode(butAtr2);
		
		col1.appendChild(text1);
		col2.appendChild(text2);
		col3.appendChild(text3);
		col4.appendChild(text4);
		col5.appendChild(button1);
		col5.appendChild(button2);

		row.appendChild(col1);
		row.appendChild(col2);
		row.appendChild(col3);
		row.appendChild(col4);
		row.appendChild(col5);

		var table = document.getElementById('thirdTable');
		table.appendChild(row);
		console.log("added");
 	 }
 	 else {
		 alert ("Введите все необходимые данные о мероприятии"); 	 	
 	 }
   
  };


	
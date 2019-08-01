	function editEvent() {
 	  alert("Здесь будет реализована возможность редактирования данных о мероприятии");
	};

	//Функция для удаления мероприятий из таблиц
	function delEvent(r) { 
	    event.target.closest("tr").remove();
 	};

	//Функция для добавления мероприятия в третью таблицу (пока так реализовано)
	function addEvent() {
 		var name = $("#eventName").val();
 		var date = $("#eventDate").val();
 		var startTime = $("#eventStartTime").val();
 		var endTime = $("#eventEndTime").val();

 	 if (name && date && startTime && endTime) 
		$("#thirdTable tr:last").after('<tr><td>' + name + '</td><td>' + date + '</td><td>' + startTime + '</td><td>' + endTime + '</td><td><i class="fa fa-pencil fa-fw fa-border" onclick="editEvent()" ></i><i class="fa fa-trash-o fa-lg fa-border" onclick="delEvent(this)" ></i></td></tr>');
	 else 
		 alert ("Введите все необходимые данные о мероприятии"); 	 	
 	 
   
  };


	
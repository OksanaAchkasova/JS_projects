$(document).ready(function() {

  $('#eventStartTime').on('change', function() { //При изменении поля времени начала мероприятия
       //время окончания мероприятия сбрасывается, если оно было задано
        $('#eventEndTime').val(""); 
       //устанавливается минимальный порог окончания мероприятия - не позднее его начала   
        var a = $('#eventStartTime').val();
        $('#eventEndTime').attr("min", a);
    });


   (function showdate(){ 
    	//определяем текущую дату
            var dt=new Date();
            var day=dt.getDate();
            var month=dt.getMonth() + 1;
            var year=dt.getFullYear();
                if (month <=9) month = '0'+month;
                if (day <=9) day = '0'+day;
            var nowDate = year+'-'+month+'-'+day;
           //записываем текущую дату в качестве минимально допустимого значения в поле дата мероприятия
            $('#eventDate').attr("min", nowDate);
   })();

});


//Функция для редактирования данных о мероприятии
function editEvent() {
	$(event.target).closest("tr").children().each(function(index) {
  			if (index == 0) {
  				$(this).text("")
  				       .append('<input type ="text" id ="cellName">')
  				       .on('keydown', function(e) {
 		       	            if (e.keyCode === 13)  		       	     	
 		          	          $(this).text($("#cellName").val());
 		        	   	  });
  			}
  			if (index == 1) {
  			  $(this).text("")
  			         .append('<input type ="date" id = "cellDate">')
  			         .on('keydown', function(e) {
 		       	            if (e.keyCode === 13)  		       	     	
 		          	          $(this).text($("#cellDate").val());
 		        	   	  });
  			}
		});
 		
	};

	//Функция для удаления мероприятий из таблиц
	function delEvent(r) { 
    var row = $(event.target).closest("tr");
    var text = row.find('td').eq(0).text();
      
    //удаляем запись об этом мероприятии из локального хранилища
    for ( var i = 0; i < localStorage.length; ++i ) {
      if (text === JSON.parse(localStorage.getItem(localStorage.key(i))).name)
        localStorage.removeItem(localStorage.key(i));
      else console.log ("такого элемента нет в хранилище");  
    }

    //удаляем запись об этом мероприятии из таблицы на странице 
	  row.remove();

 	};

	//Функция для добавления мероприятия в третью таблицу (пока так реализовано)
	function addEvent() {
    var tdMask = 'tdl_';
    var tdId = 0;

 		var $name = $("#eventName").val();
 		var $date = $("#eventDate").val();
 		var $startTime = $("#eventStartTime").val();
 		var $endTime = $("#eventEndTime").val();

    //добавление данных в таблицу
 	  if ($name && $date && $startTime && $endTime) 
		 $("#thirdTable tr:last").after('<tr><td>' + $name + '</td><td>' + $date + '</td><td>' + $startTime + '</td><td>' + $endTime + '</td><td><i class="fa fa-pencil fa-fw fa-border" onclick="editEvent()" ></i><i class="fa fa-trash-o fa-lg fa-border" onclick="delEvent(this)" ></i></td></tr>');
	  else 
		 alert ("Введите все необходимые данные о мероприятии"); 	 	
 	 
    var taskData = new Object ();
    taskData.name = $name;
    taskData.date = $date; 
    taskData.startTime = $startTime;
    taskData.endTime = $endTime;
    
    //генерируем ключ для нового мероприятия   
    var lsLen = localStorage.length;
    if (lsLen > 0) {
      for (var i=0; i<lsLen; i++) {
        var key = localStorage.key(i);
        if (Number(key.slice(4)) >= tdId)
           tdId = Number(key.slice(4)) + 1;
      //  console.log (tdId);      
       }
    }

   // Put the object into storage
    localStorage.setItem(tdMask+tdId, JSON.stringify(taskData));
    
  };


	
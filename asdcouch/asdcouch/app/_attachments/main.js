// ASDI

// Term 1308
// Banchop Ben Kangdouangnhot


	//Json
	$("#getJson").on("click", function(){
		$("#jsonlist").empty();
		$('<h1 style="color: blue"> Json Lists </h1>').appendTo("#jsonlist");
		$.ajax({
			url: "json.json",
			type: "GET",
			dataType: "json",
			success: function(data){
				for(var i=0, j=data.jsontickets.length; i<j; i++){
					var obj = data.jsontickets[i];
					$('<li class="ui-li ui-li-static ui-btn-up-c ui-first-child ui-last-child">' +
					  '<h3 class="ui-li-heading">' + obj.Nfl +'</h3>' +
					  '<p class="ui-li-desc">' + 'VS: ' + obj.versus + '</p>' +
					  '<p class="ui-li-desc">' + 'Location: ' + obj.local + '</p>' +
					  '</li>').appendTo("#jsonlist");
				}
			},
			error: function(error){
			}
		});
	
	});

	


	//Get XML
	$("#xml").on("click", function(){
		$("#xmllist").empty();
		$('<h1 style="color: blue" > XML Lists </h1>').appendTo("#xmllist");
		$.ajax({
			url: "ticket_catalog.xml",
			type: "GET",
			dataType: "xml",
			success: function(data){
				$(data).find("TK").each(function() {
					$('<li class="ui-li ui-li-static ui-btn-up-c ui-first-child ui-last-child">' +
					  '<h3 class="ui-li-heading">' + $(this).find('TEAMS').text() +'</h3>' +
					  '<p class="ui-li-desc">' + 'Tickets found: Qty ' + $(this).find('TICKETS').text() + '</p>' +
					    '</li>').appendTo("#xmllist");
				});
			},
			error: function(error){
				console.log("Error:" + error + "\n" + "Parse Error: ");
			}
		});
	});


// jQuery refactoring form
$('#testform').on('pageinit', function() {

// Storing DATA
function storeData() {

	var id 					= Math.floor(Math.random()* 100000001);

	var item 				={};
	
		item.fullname  		=['Name:', $('#fullname').val()];
		item.email			=['Email:', $('#email').val()];
		item.concerns		=['Concerns:', $('#concerns').val()];
		
	localStorage.setItem(id, JSON.stringify(item));
	alert('contact saved!');
}

// Getting DATA
function getData() {

	if(localStorage.length === 0) {
		alert("Local Storage empty...");
		
		
	}
	
	var makeDiv = $('<div></div>');
	makeDiv.attr("id", "items");
	makeDiv.attr("data-role","fieldcontain");
	var makeList = $('<ul></ul>');
	makeDiv.append(makeList);
	$('#testform').append(makeDiv);
	$('#clearLocal').css('display', 'inline');
	for(var i=0, len=localStorage.length; i<len; i++) {
		var makeLi = $('<li></li>');
		var linksLi = $('<li></li>');
		makeList.append(makeLi);
		var key = localStorage.key(i);
		var value = localStorage.getItem(key);
		var obj = JSON.parse(value);
		var makeSubList = $('<ul></ul>');
		makeLi.append(makeSubList);
		for(var n in obj) {
			var makeSubLi = $('<li></li>');
			makeSubList.append(makeSubLi);
			var optSubText = obj[n][0]+ " "+obj[n][1];
			makeSubLi.html(optSubText);
			makeSubList.append(linksLi);
		}
		makeItemLinks(localStorage.key(i),linksLi);
	}
}


//Edit and delete
function makeItemLinks(key, linksLi) {
	var editLink = $('<a></a>');
	editLink.attr("href", "#");
	editLink.key = key;
	var editText = "Edit Info";
	$(editLink).click(function() {
		editItem(key);
		$('#displayData').css('display', 'none');
	});
	editLink.html(editText);
	linksLi.append(editLink);

	var breakTag = $('<br/>');
	linksLi.append(breakTag);
	
	var deleteLink = document.createElement("a");
	deleteLink.href = "#";
	deleteLink.key = key;
	var deleteText = "Delete Item";
	deleteLink.addEventListener("click", deleteItem);
	deleteLink.innerHTML = deleteText;
	linksLi.append(deleteLink);

} 

// Delete single item
  function deleteItem() {
 		if(confirm("Delete Item?")){
 			localStorage.removeItem(this.key);
			window.location.reload();
			alert("Item deleted!");
		}else{
		alert("Nothing happen");
	}
}

//Edit Item
function editItem(key) {
	var value = localStorage.getItem(key);
	var item = JSON.parse(value);
	
	$('#fullname').val(item.fullname[1]);
	$('#email').val(item.email[1]);
	$('#concerns').val(item.concerns[1]);
}

	//Clear localStroage
	$("#clearLocal").on("click", function(){
		if(localStorage.length === 0){
			alert("Data empty!");
		} else {
			if(confirm("Data will be deleted! Click OK to continue, or CANCEL!")){
				localStorage.clear();
				alert("Data cleared!");
				window.location.reload();
			}
		}
	});
	
	//Refresh
	function refresh(){
		window.location.reload();
	}
		$('#refresh').on('click', function() {
		refresh();
	
	});
	

	$('#displayData').on('click', function() {
		getData();
	
	});
	
	$('#submit').on('click', function() {
		storeData();
		//window.location.reload();
		
	});

});








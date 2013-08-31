

$(document).on('pageinit', '#home', function(){
	localStorage.clear();
	var entry = function(item){
		var makeEntry = $('<div data-role="collapsible">' +
				  		 '<h2>' + item.name + '</h2>'+
				         '<ul>' +
				         '<li>' + "Email: " + item.email + '</li>' +
				         '<li>' + "Concerns: " + item.concerns + '</li>')
		return makeEntry;
	}
	
	var removeEdit = function(item){
		var buttonLinks = $('<li>' + '<a href="#" class="delete" data-id="'+item.id+'" data-rev="'+item.rev+'">' + 'Delete' + '</a>' + '</li>' +
			  		        '<li>' + '<a href="#addItem" class="edit" data-id="'+item.id+'" data-rev="'+item.rev+'">' + 'Edit' + '</a>' + '</li>')
		return buttonLinks;
	}
		

	
	$.couch.db("dbtesting").view("asdproject/user", {
		success: function(data){
		$('#ticketList').empty();
		$.each(data.rows, function(index, tick){
			var item = (tick.value || tick.doc);
			$(removeEdit(item)).appendTo($(entry(item)).appendTo("#ticketList"))
		});
			$('#ticketList div').collapsible();
		}
	});
	


//Create
$(document).on('pageinit', '#addItem', function(){
	if(localStorage.length == 1){
		var value  = localStorage.getItem("itemEdit")
		    obj    = JSON.parse(value);
		var doc      = {};
			doc._id  = obj._id;
			doc._rev = obj._rev;
		var edit = true;
		$.couch.db("dbtesting").openDoc(doc._id, {
			success : function(data){
				console.log(data);
				$('#name').val(data.name);
				$('#email').val(data.email);
				$('#concerns').val(data.concerns);
			    localStorage.clear();	
			}
		});
	} else {
		var edit = false;
	}
	

	$('#save').on("click", function(){
		var id = Math.floor(Math.random()*10000000001);
		var data              = $("#addform").serializeArray();
		var tickets         = {};
			tickets._id	  = "user:"+data[2].value.toLowerCase()+":"+id
			tickets.name     = [data[0].value];
			tickets.email     = [data[1].value];
			tickets.concerns     = [data[2].value];

		if (tickets.name == ''){
			$('#error').removeClass('hidden');  //Validation Form for Pop ups!
		} else {
			$('#error').addClass('hidden');
			if (edit == true){
				$.couch.db("dbtesting").removeDoc(doc, {
					success: function(data) {
					}
				});	
			};
			$.couch.db("dbtesting").saveDoc(tickets, {
				success: function(data) {
					alert("Ticket Info saved!");
					window.location = "index.html";
				},
				error: function(status) {
					console.log(status);
				}
			});
		}
	});
});



//Delete	
$('body').on('click', '.delete', function(data){
	var doc = {};
		doc._id = $(this).data('id');
		doc._rev = $(this).data('rev');
	console.log(doc);
	if(confirm("Are you sure you want to delete item?")){
		$.couch.db("dbtesting").removeDoc(doc, {  
			success: function(data) {
				alert("Item deleted!");
				window.location.reload();
			}
		});
	}
});


//Edit
$('body').on("click", '.edit', function(){
	localStorage.clear();
	var doc = {};
		doc._id = $(this).data('id');
		doc._rev = $(this).data('rev');
		localStorage.setItem('itemEdit', JSON.stringify(doc));
		console.log(localStorage);
});
	

//Create Button
$('body').on("click", '.create', function(){

});
});



    
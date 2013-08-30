
$('#home').on('pageinit', function(){
	//code needed for home page goes here
});

$('#addItem').on('pageinit', function(){
	//delete $.validator.methods.date;
	var myForm = $('#addForm');
	myForm.validate({
		invalidHandler: function(form, validator) {
		},
		submitHandler: function() {
			var data = myForm.serializeArray();
			storeData(data);
			getDatas();
		}

		});
});


$('#displays').on('pageshow', function(){
	//getDatas();
	addTask();
});


$('#adds').on('pageshow', function(){
	//getData();

});


var getDatas = function(){
	
	var appendLocation = $('#remoteList').html('');
	var ajaxURL = "asdproject/all";

	
	$.couch.db('asdproject').view(ajaxURL, {
		success: function(data){
			console.log(data);
			$.each(data.rows, function(index, names){
				var makeEntry = $('<div>')
					.attr('data-role', 'collapsible')
					.attr('data-mini', 'true')
					.attr('id', names.key)
					.appendTo(appendLocation)
				;
				
				var makeH3 = $('<h3>')
					.html(names.value.name)
					.appendTo(makeEntry)
				;
				
				var makeDetailsList = $('<ul>').appendTo(makeEntry);
				var labelCounter = 0;
				for (var k in names.value) {
					var makeLi = $('<li>')
						.appendTo(makeDetailsList)
					;

				}
				
			// create edit/delete buttons for each entry
			   var buttonHolder = $('<div>').attr('class', 'ui-grid-a').appendTo(makeEntry);
				var editButtonDiv = $('<div>').attr('class', 'ui-block-a').appendTo(buttonHolder);
				var removeButtonDiv = $('<div>').attr('class', 'ui-block-b').appendTo(buttonHolder);
				
				var editButton = $('<a>')
					.attr('data-role', 'button')
					.attr('href', '#display')
					.html('Edit')
					.data('key', names.key[0])
					.data('rev', names.key[1])
					.appendTo(editButtonDiv)
					.on('click', editItem)	
				;
				
				var removeButton = $('<a>')
					.attr('data-role', 'button')
					.attr('href', '#')
					.html('Remove')
					.data('key', names.key[0])
					.data('rev', names.key[1])
					.appendTo(removeButtonDiv)
					.on('click', removeItem)
				;  
				console.log(names.key[0]);
				console.log(names.key[1]);
				$(makeEntry).trigger('create');
			});
			$(appendLocation).trigger('create');
		}
	});
};


//Edit Item
function editItem(key) {
	var value = localStorage.getItem(key);
	var item = JSON.parse(value);
	
	$('#name').val(item.name[1]);
	$('#email').val(item.email[1]);
	$('#concerns').val(item.concerns[1]);
}




function removeItem(data) {
	
	var doc = {};
		doc._id = $(this).data('id');
		doc._rev = $(this).data('rev');
	console.log(doc);
	if(confirm("Are you sure you want to delete item?")){
		$.couch.db("asdproject").removeDoc(doc, {
			success: function(data) {
				alert("Items deleted!");
				window.location.reload();
			}
		});
	}

}; 


//StoreData
var storeData = function(data){
	var key = $('#saveForm').data('key');
	var rev = $('#saveForm').data('rev');
	//console.log(key);
	//console.log(rev);
	var items = {};

	if (rev) {		// updating existing document
		items._id = key;
		items._rev = rev;
	}

	items.name = data[0].value;
	items.email = data[1].value;
	items.concerns = data[2].value;
	
	console.log(items);
	
	$.couch.db('asdproject').saveDoc(items, {
		success: function(items){
			alert('Items Saved to Remote Database!');
			//resetForm();
			$('#saveForm').attr('value', 'Add Data')//.removeData('key').removeData('rev');
			//$.mobile.changePage('#home');
		}
	});
}; 






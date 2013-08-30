
function (doc){
	if (doc._id !== '_design/asdproject'){
		emit([doc._id, doc._rev], {

			"name": doc.name,
			"email": doc.email,
			"concerns:": doc.concerns
		});
	}
}

/*
function (doc){
	if (doc._id !== 'all'){
		emit([doc._id, doc._rev], {
			"id": doc.id,
			"rev" : doc.rev,
			"name": doc.name,
			"email": doc.email,
			"concerns:": doc.concerns
		});
	}
};


function (doc){
	if (doc._id !== '_design/asdproject'){
		emit([doc._id, doc._rev], {

			"name": doc.name,
			"email": doc.email,
			"concerns:": doc.concerns
		});
	}
}
*/
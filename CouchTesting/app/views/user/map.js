function (doc) {
	if(doc._id.substr(0, 5) === "user:"){
		emit(doc._id.substr(9), {
			"id": doc._id,
			"rev" : doc._rev,
			"name": doc.name,
			"email": doc.email,
			"concerns": doc.concerns

		});
	}
}
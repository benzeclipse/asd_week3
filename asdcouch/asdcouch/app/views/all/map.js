function (doc) {
	if(doc._id.substr(0, 9) === "all"){
		emit(doc._id.substr(9), {
			"name": doc.name,
			"email": doc.email,
			"concerns": doc.concerns

		});
	}
}
function (doc){
	
	if(doc._id.substr(0,7) === "jason") {
		emit(doc._id, {
			"nfl" : doc.nfl,
			"versus" : doc.versus,
			"local" : doc.local
			
			
		}); 
			

		
	}
		
};

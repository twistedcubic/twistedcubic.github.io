$(document).ready(function(){

    var transition = ["therefore ", "although ", "<br> ", "just because.",  " I suppose. ", " well then ", " ", " despite that, ", " ", "<br>" ];
    $("#first").datepicker();
    $("#second").datepicker();
    $("#date").click( function date( ){

	var searchTerm = "";

	var words = $("#keyword").val();
	if(words != ""){
	    searchTerm += ("q="+words + "&");
	}

	var firstDate = $("#first").datepicker("getDate" );
	var firstFormatDate = $.datepicker.formatDate("yymmdd", firstDate);
	if(firstFormatDate != ""){
	    searchTerm = searchTerm + "begin_date=" + firstFormatDate + "&";
	    console.log(Number(firstFormatDate));
	}

	var secondDate = $("#second").datepicker("getDate");
	var secondFormatDate = $.datepicker.formatDate("yymmdd", secondDate);
	if(secondFormatDate != ""){
	    searchTerm += ("end_date=" + secondFormatDate + "&");
	    console.log(Number(secondFormatDate));
	}
	

	if(searchTerm == ""){
	    alert("Gotta enter something!");
	    return;
	}
	//console.log($.datepicker.formatDate("yymmdd", firstDate));

	$.ajax({

	    url:"http://api.nytimes.com/svc/search/v2/articlesearch.json?"+searchTerm+"api-key=8d8f8feb8c9291d8c8b6e2d9fb712192:19:54406938",
	    //url:"http://api.nytimes.com/svc/search/v2/articlesearch.json?q="+words+"&begin_date="+firstFormatDate+"&end_date="+secondFormatDate+"&api-key=8d8f8feb8c9291d8c8b6e2d9fb712192:19:54406938",

	    method:"GET",
	    dataType:"json"
	}).done(function(data){
	    if(data.response.meta.hits == 0)
		alert("Darn, no hits!");

	    var titles = "";
	    var map = {Obama:"The Boss", Clinton:"The Woman"};

	    $.each(data.response.docs, function(index, value){
		var newTitle = value.snippet.replace(/Clinton|Obama/ig , function(matched){
		    return map[matched];

		});

		titles += (newTitle + transition[Math.round(Math.random()*(transition.length-1))]);
		//document.write(newTitle); 
		//document.write(transition[Math.round(Math.random()*(transition.length-1))]);

	    });
	    document.getElementById("loadDate").innerHTML = titles;

	});
    });

    $("#top").click( function topStory(){
	$.ajax({
	    url: "http://api.nytimes.com/svc/topstories/v1/home.json?api-key=013683ddcb4ae91ce5f192f4702eee80:0:54406938",
	    method: "GET",
	    dataType: "json"
	}).done(function(data){
	    
	    var titles = "";
	    $.each(data.results, function(index, value){
		
		var map = {Obama:"The Boss", Clinton:"The Woman", Bush:"the maverick"};
		var newTitle = value.title.replace(/Clinton|Obama|Bush/ig , function(matched){
		    return map[matched];
		});
		titles += (newTitle + ", " + transition[Math.round(Math.random()*(transition.length-1))]);

		//document.write(newTitle);
		//document.write(",\n");
		//document.write(transition[Math.round(Math.random()*(transition.length-1))]);
	    });
	    document.getElementById("loadTop").innerHTML = titles;

	    $("#reload").click(function( ) {
		location.reload();
	    });

	});
    });
});


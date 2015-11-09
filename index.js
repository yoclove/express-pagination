var express = require('express');
var app = express();

app.set('views', 'views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs')

app.get('/', function(req, res){

	var totalStudents = 80,
			pageSize = 10,
			pageCount = totalStudents/pageSize,
			currentPage = 1,
			students = [],
			studentsArrays = [],
			studentsList = []

	for (var i = 0; i < totalStudents; i++){
		students.push({name: 'Student Number ' + i})
	}

	while (students.length > 0){
		studentsArrays.push(students.splice(0, pageSize))
	}

	if (typeof req.query.page !== 'undefined') {
		currentPage = +req.query.page
	}

	studentsList = studentsArrays[+currentPage - 1]

	res.render('index', {
		students: studentsList,
		pageSize: pageSize,
		totalStudents: totalStudents,
		pageCount: pageCount,
		currentPage: currentPage
	})
})

var server = app.listen(3000, function(){
	console.log('Listening on port %d', server.address().port);
})
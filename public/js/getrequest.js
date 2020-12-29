$(function () {

    // GET REQUEST
    $('#allStudents').click( function(event) {
        event.preventDefault();
        ajaxGet();
    });

    // DO GET
    function ajaxGet() {
        $.ajax({
            type: 'GET',
            url: window.location + 'api/students/all',
            success: function(result) {
                $('#getResultDiv ul').empty();
                var studentList = '';
                $.each(result, function(i, student) {
                    $('#getResultDiv .list-group').append(
                      '<div class="item">' +
                        student.firstname + ' ' +
                        student.lastname + ' - ' +
                        student.age +  ' ' +
                        student.score +
                        '<button type="button" onclick="onStudentDelete(student.id)">Delete</button>' +
                        '</div>')
                });
                console.log('Success: ', result);
            },
            error: function(e) {
                $('#getResultDiv').html('<strong>Error</strong>');
                console.error('ERROR: ', e);
            }
        });
    }
});

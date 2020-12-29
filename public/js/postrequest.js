$(function () {

    // SUBMIT FORM
    $('#studentsForm').submit(function(event) {
        // Prevent the form from submitting via the browser.
        event.preventDefault();
        ajaxPost();
    });


    function ajaxPost() {

        // PREPARE FORM DATA
        var formData = {
            firstname: $('#firstname').val(),
            lastname: $('#lastname').val(),
            age: $('#age').val(),
            score: $('#score').val()
        };

        // DO POST
        $.ajax({
            type: 'POST',
            contentType: 'application/json',
            url: window.location + 'api/students/save',
            data: JSON.stringify(formData),
            dataType: 'json',
            success: function(student) {
                $('#postResultDiv').html('<p>' +
                    'Post Successfully! <br>' +
                    '--->' + JSON.stringify(student) + '</p>');
            },
            error: function(e) {
                console.error('ERROR: ', e);
            }
        });

        // Reset FormData after Posting
        resetData();
    }

    function resetData() {
        $('#firstname').val('');
        $('#lastname').val('');
        $('#age').val(18);
        $('#score').val(0);
    }

    function onStudentDelete(id) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id == id) {
                arr.splice(i, 1);
            }

        }

});
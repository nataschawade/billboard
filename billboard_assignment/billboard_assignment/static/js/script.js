$(document).ready(function() {
  $("#add_post").click(function() {
    $("#add_post_form").toggle();
  });
});

$('#post_button').on('click', function(e) {
    e.preventDefault();
    addPost();
});

function addPost() {
    var title = $('#post_title').val();
    var text = $('#post_description').val();
    $.ajax({
        url: '/new_post/',
        type: 'POST',
        data: {
            'title': title,
            'text': text,
        },
    })

    .done(function(data) {
        $('#post_title').val(' ');
        $('#post_description').val(' ');
        if (data.code == 200) {
            var post = data.post;
        }
        $('#container').append('<p>' + post['date'] + '</p>'+ '<h2 class="title2">' + post['title'] + '</h2>'+ '<p class="text">' + post['text'] + '</p>' + '<span class="gilad">' + post['user'] + '</span>');
    })

    .fail(function(data) {
        alert('Issue adding your task');
    });


}

$(function() {
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
    var csrftoken = getCookie('csrftoken');

    function csrfSafeMethod(method) {
        return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
    }

    function sameOrigin(url) {
        var host = document.location.host;
        var protocol = document.location.protocol;
        var sr_origin = '//' + host;
        var origin = protocol + sr_origin;
        return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
            (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
            !(/^(\/\/|http:|https:).*/.test(url));
    }

    $.ajaxSetup({
        beforeSend: function(xhr, settings) {
            if (!csrfSafeMethod(settings.type) && sameOrigin(settings.url)) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken);
            }
        }
    });
});
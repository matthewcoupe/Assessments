/*mark essay copy rubric text to textarea*/
$(function () {
    $('.assessment-rubric-chkbx').change(function () {

        if (this.checked) {
            var rubric = this.value + " ";
            var box = $('#feedbackTextarea');
            box.val(box.val() + rubric);
        }

    });
});

$(document).ready(function () {
    $('#markdashboard').DataTable();
});

$(function () {
    $('.btn-assessment-start').click(function (e) {
        e.preventDefault();
        $('.assessment-intro-panel').hide();
        $('#mcq-clock-static').hide();
        $('#mcq-clock').show();
        $('.assessment-question-panel').hide();
        var id = $(this).attr('id');
        var showme = '#Q' + id
        $(showme).show();
    });
});

$(function () {
    $('.btn-assessment-toggle').click(function (e) {
        e.preventDefault();
        $('.assessment-question-panel').hide();
        var id = $(this).attr('id');
        var showme = '#Q' + id
        $(showme).show();
    });
});

$(function () {
    $('.btn-assessment-reset').click(function (e) {
        e.preventDefault();
        $('.assessment-question-panel').show();
        $('.assessment-intro-panel').show();
    });
});

$(function () {
    $('.btn-assessment-demo').click(function (e) {
        e.preventDefault();
        $('.assessment-question-panel').hide();
        $('.assessment-intro-panel').show();
    });
});

$(function () {
    $('.ass-intro').click(function (e) {
        e.preventDefault();
        $('.ass-welcome-1').hide();
        $('.ass-welcome-2').show();
    });
});




function wordCount(val) {
    var wom = val.match(/\S+/g);
    return {
        charactersNoSpaces: val.replace(/\s+/g, '').length,
        characters: val.length,
        words: wom ? wom.length : 0,
        lines: val.split(/\r*\n/).length
    };
}



document.getElementById("essaytext").addEventListener("input", function () {
    var v = wordCount(this.value);
    document.getElementById("essaycount").innerHTML = (
        v.words
    );
    if (v.words > 0) {
        $('#essay-count-0').hide();
    }

    if (v.words <= 800 && v.words >= 400) {
        document.getElementById("essay-submit").disabled = false;
        $('#essay-word-count-issue').hide();
             
    } else {
        document.getElementById("essay-submit").disabled = true;
        $('#essay-word-count-issue').show();
    }
    

}, false);


document.getElementById("essaytext").addEventListener("input", function () {
    var v = wordCount(this.value);
    if (v > 500) { $('#EssayWordCount').addClass('alert-danger').removeClass('alert-info'); }
}, false);





/*Clock function from: https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies */

function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    var clock = document.getElementById(id);

    var minutesSpan = clock.querySelector('.minutes');
    var secondsSpan = clock.querySelector('.seconds');

    function updateClock() {
        var t = getTimeRemaining(endtime);


        minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
        secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
        if (t.seconds > 30) {
            $('#mcq-timer').addClass('alert-info').removeClass('alert-warning').removeClass('alert-danger');

        }
        else if (t.seconds <= 30) {
            $('#mcq-timer').addClass('alert-warning').removeClass('alert-info').removeClass('alert-danger');
            if (t.seconds <= 10) {
                $('#mcq-timer').addClass('alert-danger').removeClass('alert-warning');
            }
        }
        if (t.total <= 0) {
            clearInterval(timeinterval);
        }

    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
}


function startClock(minutes) {
    var m = parseInt(minutes);
    var deadline = new Date(Date.parse(new Date()) + 40 * 60 * 1000);
    initializeClock('mcq-clock', deadline);
}


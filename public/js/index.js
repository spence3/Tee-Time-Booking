const teeTimeAPI = '/api/v1/teetimes'

$(function () {
  function getTeeTimes(timeList) {
      $.ajax({
        url: teeTimeAPI,
        method: 'GET',
        success: function (data) {
          var list = $(timeList)
          $.each(data, function (i, time) {
            var data = $('<li></li>').text(time.time)
            list.append(data)
          });
        },
        error: function (err) {
          alert(err);
        },
      });
    }
    $('#sleepy').on('click', function(){
      getTeeTimes('#sleepyList')
    })
})

//
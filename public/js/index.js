const teeTimeAPI = '/api/v1/teetimes'

$(function () {
  function getTeeTimes(timeList) {
      $.ajax({
        url: teeTimeAPI,
        method: 'GET',
        success: function (data) {
          var ul = $(timeList)
          $.each(data, function (i, time) {
            var li = $('<li></li>')
            var data = $('<a href="https://foreupsoftware.com/index.php/booking/19396/1726#teetimes" class="block text-center w-96 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover: cursor-pointer"></a>').text(time.time)
            li.append(data)
            ul.append(li)
          });
        },
        error: function (err) {
          alert(err);
        },
      });
    }
    getTeeTimes('#sleepyList')
    $('#sleepy').on('click', function(){
      var dropdown = $('#sleepyList')
      dropdown.toggleClass('hidden')
    })
})

//
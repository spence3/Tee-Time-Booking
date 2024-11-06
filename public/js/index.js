$(function () {
  function getTeeTimes(timeList, API) {
      $.ajax({
        url: API,
        method: 'GET',
        success: function (data) {
          var ul = $(timeList)
          $.each(data, function (i, time) {
            var li = $('<li></li>')
            //href="https://foreupsoftware.com/index.php/booking/19396/1726#teetimes"
            var data = $('<a class="block text-center w-96 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover: cursor-pointer"></a>').text(time.time)
            li.append(data)
            ul.append(li)
          });
        },
        error: function (err) {
          alert(err);
        },
      });
    }

    $('#sleepy').on('click', function(){
      const sleepyAPI = '/api/v1/sleepy'
      getTeeTimes('#sleepyList', sleepyAPI)
      var dropdown = $('#sleepyList')
      dropdown.toggleClass('hidden')
    })

    $('#timp').on('click', function(){
      const timpAPI = '/api/v1/timp'
      getTeeTimes('#timpList', timpAPI)
      var dropdown = $('#timpList')
      dropdown.toggleClass('hidden')
    })



})

//
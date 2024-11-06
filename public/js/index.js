$(function () {
  function getTeeTimes(buttonTag, dropDownTag, timeList, API) {
      $.ajax({
        url: API,
        method: 'GET',
        beforeSend: function(){//adds spinning wheel while loading
          $(buttonTag).append('<svg class="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24"> <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-dasharray="31.4" stroke-dashoffset="0" fill="none"></circle> </svg>')
        },

        success: function (data) {
          var button = $(buttonTag)
          var ul = $(timeList)
          $.each(data, function (i, time) {
            var li = $('<li></li>')
            var data = $('<a class="block text-center w-96 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover: cursor-pointer"></a>').text(time.time)
            li.append(data)
            ul.append(li)
          });
          
          var dropdown = $(dropDownTag);
          dropdown.removeClass('hidden');
        },
        
        complete: function(){//gets rid of spinning wheel after data is loaded
          $(buttonTag).find('svg').remove()
        },
        error: function (err) {
          alert(err);
        },
      });
    }

    function dropDownShow(buttonTag, dropdown, timeList, API){
      const isVisible = !dropdown.hasClass('hidden'); // Check if it's already visible

      // Hide it if it's visible, or show it if it's hidden
      if (isVisible) {
        dropdown.addClass('hidden');
      } else {
        getTeeTimes(buttonTag, dropdown, timeList, API);
      }
    }

    $('#sleepy').on('click', function(){
      const sleepyAPI = '/api/v1/sleepy'
      var dropdown = $('#sleepyDropDown')
      dropDownShow('#sleepy', dropdown,'#sleepyList', sleepyAPI)
    //   const isVisible = !dropdown.hasClass('hidden'); // Check if it's already visible

    // // Hide it if it's visible, or show it if it's hidden
    // if (isVisible) {
    //   dropdown.addClass('hidden');
    // } else {
    //   getTeeTimes('#sleepy', '#sleepyDropDown','#sleepyList', sleepyAPI);
    // }
    })

    $('#timp').on('click', function(){
      const timpAPI = '/api/v1/timp'
      var dropdown = $('#timpDropDown')
      dropDownShow('#timp', dropdown,'#timpList', timpAPI)
      // const isVisible = !dropdown.hasClass('hidden'); // Check if it's already visible

      // // Hide it if it's visible, or show it if it's hidden
      // if (isVisible) {
      //   dropdown.addClass('hidden');
      // } else {
      //   getTeeTimes('#timp', '#timpDropDown', '#timpList', timpAPI);
      // }
    })



})

//
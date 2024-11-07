$(function () {
  //Make this Async
  function getTeeTimes(buttonTag, dropDownTag, timeList, API, URL) {
      $.ajax({
        url: API,
        method: 'GET',
        beforeSend: function(){//adds spinning wheel while loading
          $(buttonTag).append('<svg class="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24"> <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" stroke-dasharray="31.4" stroke-dashoffset="0" fill="none"></circle> </svg>')
        },

        success: function (data) {
          var button = $(buttonTag)
          var ul = $(timeList)
          $.each(data, function (i, data) {
            console.log('in here')
            //switching army to standard
            var armyTime = data.time.split(' ')
            var standardTime = moment(armyTime[1], 'HH:mm').format('h:mm A');
            var li = $('<li></li>')
            //var data = $('<a class="block text-center w-96 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white hover: cursor-pointer"></a>').text(time.time)
            var book = $(`<a href="${URL}" class="flex flex-row justify-evenly p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">` +
                          `<h5 class="px-4 dark:text-white">Time: ${standardTime}</h5>` +
                          `<p class="px-4 dark:text-white">Minimum Players: ${data.minimum_players}</p>` +
                          ` <p class="px-4 dark:text-white">Maximum Players: ${data.maximum_players_per_booking}</p>` +
                          `<p class="px-4 dark:text-white">Holes: ${data.holes}</p>` +
                          `<p class="px-4 dark:text-white">Available Spots: ${data.available_spots}</p>`
            )
            li.append(book)
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

    //Make Async
    function dropDownShow(buttonTag, dropdown, timeList, API, URL){
      const isVisible = !dropdown.hasClass('hidden'); // Check if it's already visible

      // Hide it if it's visible, or show it if it's hidden
      if (isVisible) {
        dropdown.addClass('hidden');
      } else {
        getTeeTimes(buttonTag, dropdown, timeList, API, URL);
      }
    }

    $('#sleepy').on('click', function(){
      const sleepyAPI = '/api/v1/sleepy'
      var dropdown = $('#sleepyDropDown')
      //Call it as an async
      dropDownShow('#sleepy', dropdown,'#sleepyList', sleepyAPI, 'https://foreupsoftware.com/index.php/booking/19396/1726#/teetimes')
    })

    $('#timp').on('click', function(){
      const timpAPI = '/api/v1/timp'
      var dropdown = $('#timpDropDown')
      //Call it as an async
      dropDownShow('#timp', dropdown,'#timpList', timpAPI, 'https://foreupsoftware.com/index.php/booking/6279/49#/teetimes')
    })

    $('#oaks').on('click', function(){
      const oaksAPI = '/api/v1/oaks'
      var dropdown = $('#oaksDropDown')
      //Call it as an async
      dropDownShow('#oaks', dropdown,'#oaksList', oaksAPI, 'https://foreupsoftware.com/index.php/booking/6279/49#/teetimes')
    })
})
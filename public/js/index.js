const teeTimeAPI = '/api/v1/teetimes'

$(function () {
    function getTeeTimes() {
        $.ajax({
          url: teeTimeAPI,
          method: 'GET',
          success: function (data) {
            $.each(data, function (i, test) {
              console.log(test.time)
            });
          },
          error: function (err) {
            alert(err);
          },
        });
      }
    getTeeTimes()
})
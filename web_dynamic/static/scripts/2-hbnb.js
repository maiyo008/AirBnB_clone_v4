$(document).ready(function () {
  $.get('http://0.0.0.0:5001/api/v1/status/',
    function (response) {
      if (response.status === 'OK') {
        $('div#api_status').addClass('available');
      } else {
        $('div#api_status').removeClass('available');
      }
    });
  const amenList = {};
  $('input[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenList[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenList[$(this).attr('data-id')];
    }
    let text = Object.values(amenList).join(', ');
    if (text.length > 37) {
      text = text.slice(0, 37) + '...';
    }
    if (text) {
      $('.amenities > h4').text(text);
    } else {
      $('.amenities > h4').text('\xa0');
    }
  });
});

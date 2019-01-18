const app = {};

app.getStations = function() {
  $.ajax({
    url: 'https://api.flyporter.com/1.2/WidgetHandler/GetStations',
    method: 'GET',
    dataType: 'json'
  }).then(function(res) {
    const results = JSON.parse(res);
    results.Stations.forEach(element => {
      const key = element.DisplayName;
      const value = element.StationCode;

      const selection = `<option value="${value}">${key}</option>`

      $('#destFrom').append(selection).delay(100).queue(function() {
        app.getDestinations();
      });
    });
  });
};

app.getDestinations = function() {
  $('#destFrom').on('change', function () {
    const fromStation = $('#destFrom').val();
    $.ajax({
      url: `https://api.flyporter.com/1.2/WidgetHandler/GetStations?destinationStationCode=${fromStation}`,
      method: 'GET',
      dataType: 'json'
    }).then(function(res) {
      const results2 = JSON.parse(res);
      results2.Stations.forEach(element => {
        const key = element.DisplayName;
        const value = element.StationCode;

        const selection = `<option value="${value}">${key}</option>`

        $('#destTo').append(selection);
      });
    });
  });
};

app.datepicker = function() {
  $('.destDates').daterangepicker({
    autoUpdateInput: false,
    locale: {
      cancelLabel: 'Clear'
    }
  });
  $('.destDates').on('apply.daterangepicker', function (ev, picker) {
    $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
  });

  $('.destDates').on('cancel.daterangepicker', function (ev, picker) {
    $(this).val('');
  });
};

app.hideChildAge = function() {
  $('.container__childAge').hide();
  $('.childAge').hide();
};

app.childAge = function() {
  $('#passengersChildren').on('change', function() {
    if ($('#passengersChildren').val() != '0Children') {
      $('.container__childAge').show();
      const displayNumber = parseInt($('#passengersChildren').val(),10 + 1);
      $('.childAge').slice(0,displayNumber).show();
    } else {
      $('.container__childAge').css({display: 'none'});
    };
  });
};



app.init = function() {
  app.getStations();
  app.datepicker();
  app.hideChildAge();
  app.childAge();
};

$(function() {
  app.init();
});
$(document).on('click', '#btnSomar', function() {
  var num1 = $('#num1').val();
  var num2 = $('#num2').val();
  var result = parseInt(num1) + parseInt(num2);

  $('#result').val(result);
})

$(document).on('click', '#btnAtualizar', function() {
  var onSuccess = function(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    console.log(latitude, longitude);

    $.ajax({
      url: "https://api.hgbrasil.com/weather?format=json-cors&key=ef18279f&lat=" + latitude + "&lon="+ longitude + "&user_ip=remote",
      type: "get",
      dataType: "json",
      success: function(data){ //Executar se der certo

      cidade = "<p>"+ data.results.city +"</p>";
      clima = "<p><strong>Clima: </strong>"+ data.results.description +"</p>";
      temperatura = "<p>"+ data.results.temp +"ºC</p>";

      navigator.notification.alert("Aguarde...", atualizarDados(), "Carregando informações");

      function atualizarDados()
      {
        $('#cidade').html(cidade);
        $('#clima').html(clima);
        $('#temperatura').html(temperatura);
      }
    },
    error: function(){ //Executar se der erro
      alert("Deu erro!");
    }
    })
    };

    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

  navigator.geolocation.getCurrentPosition(onSuccess, onError);
});
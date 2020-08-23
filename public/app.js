
//Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 1000,
  to: 20000,
  prefix: "$"
})

function setSearch() {
  let busqueda = $('#checkPersonalizada');
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}


$( document ).ready(function() {
    setSearch();

    $('#buscar').on('click', () => {

      let urlAPI = 'http://localhost:8080/api/bienes';
      let busquedaAvanzada = $('#checkPersonalizada');
      let selectCiudad = $('#ciudad').val();
      let selectTipo = $('#tipo').val();
      let precioMin = $("#rangoPrecio").data("ionRangeSlider").result.from;
      let precioMax = $("#rangoPrecio").data("ionRangeSlider").result.to;

      if($('#checkPersonalizada').prop('checked')) {
        let opciones = '?advanced=true';

        opciones = selectCiudad==='' ? opciones : `${opciones}&ciudad=${selectCiudad}`;
        opciones = selectTipo==='' ? opciones : `${opciones}&tipo=${selectTipo}`;
        opciones = `${opciones}&pMin=${precioMin}`;
        opciones = `${opciones}&pMax=${precioMax}`;

        urlAPI = urlAPI + opciones;

      }



      $.ajax({
        url: urlAPI,
        method: 'GET'
      }).done((data, textStatus, jqXHR) => {
        muestraInmuebles(data);
      })
      .fail((jqXHR, textStatus, error) => {
        alert("Hubo un error: " + error);
      });
    });

    $('select').on('contentChanged', function() {
      $(this).material_select();
    });

    obtenerListadoCiudades();
    obtenerListadoTipos();
});

function muestraInmuebles(listado) {
  let respHtml = '';

  for(var k in listado) {
    respHtml = respHtml + `<div class="card horizontal">
                  <div class="card-image">
                    <img src="img/home.jpg">
                  </div>
                  <div class="card-stacked">
                    <div class="card-content">
                      <div>
                        <b>Direccion: </b>${listado[k].Direccion}<p></p>
                      </div>
                      <div>
                        <b>Ciudad: </b>${listado[k].Ciudad}<p></p>
                      </div>
                      <div>
                        <b>Telefono: </b>${listado[k].Telefono}<p></p>
                      </div>
                      <div>
                        <b>Código postal: </b>${listado[k].Codigo_Postal}<p></p>
                      </div>
                      <div>
                        <b>Precio: </b>${listado[k].Precio}<p></p>
                      </div>
                      <div>
                        <b>Tipo: </b>${listado[k].Tipo}<p></p>
                      </div>
                    </div>
                    <!--<div class="card-action right-align">
                      <a href="#">Ver más</a>
                    </div>-->
                  </div>
                </div>`
  }

  $('#listadoResultados').html(respHtml);
}

function obtenerListadoCiudades(){
  $.ajax({
    url: 'http://localhost:8080/api/bienes/ciudades',
    method: 'GET'
  }).done((data, textStatus, jqXHR) => {
    $.each(data, function (i, item) {
      $('#ciudad').append($('<option>', {
          value: item.Ciudad,
          text : item.Ciudad
      }));
    });
    $('#ciudad').trigger('contentChanged');
  })
  .fail((jqXHR, textStatus, error) => {
    alert("Hubo un error: " + error);
  });
}



function obtenerListadoTipos(){
  $.ajax({
    url: 'http://localhost:8080/api/bienes/tipos',
    method: 'GET'
  }).done((data, textStatus, jqXHR) => {
    $.each(data, function (i, item) {
      $('#tipo').append($('<option>', {
          value: item.Tipo,
          text : item.Tipo
      }));
    });
    $('#tipo').trigger('contentChanged');
  })
  .fail((jqXHR, textStatus, error) => {
    alert("Hubo un error: " + error);
  });
}

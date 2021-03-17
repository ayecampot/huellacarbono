function Persona(nombre, tamanio, calefaccion, bombillas, temperatura, aire, alimento, transporte, vuelos) {
    this.nombre = nombre;
    this.tamanio = tamanio;
    this.bombillas = bombillas;
    this.calefaccion = calefaccion;
    this.temperatura = temperatura;
    this.aire = aire;
    this.alimento = alimento;
    this.transporte = transporte;
    this.vuelos = vuelos;

    this.consumo = function () {
        return tamanio + bombillas + calefaccion + temperatura + aire + alimento + transporte + vuelos;
    }
}

function changeResImg(src, texto) {
    $('#img-resultado').attr("src", src);
    $("#resultadoTexto").text(texto);
}

function showResult(huellaCarbono) {
    if (huellaCarbono > 170) {
        changeResImg("imagenes/cactus.jpg", "MAYOR al promedio ¡A trabajar! ");
    } else if (huellaCarbono <= 170 && huellaCarbono >= 150) {
        $.ajax({
            url: 'https://dog.ceo/api/breed/poodle/images/random',
            success: function (response) {
                changeResImg(response.message, "IGUAL al promedio ¡Nada mal!" )
            }
        });
     
    } else {
        $.ajax({
            url: 'https://api.thecatapi.com/v1/images/search',
            success: function (response) {
                changeResImg(response[0].url, "MENOR al promedio ¡Felicitaciones!")
            }
        });
    }
}





function calcularHuella() {
    var nombre = $("#nombre").val();
    var tamanio = parseInt($("#inputVivienda").val());
    var bombillas = parseInt($("#inputBombillas").val());
    var calefaccion = parseInt($("#inputCalefaccion").val());
    var temperatura = parseInt($("#inputTemperatura").val());
    var aire = parseInt($("#inputAire").val());
    var alimento = parseInt($("#inputAlimento").val());
    var transporte = parseInt($("#inputTransporte").val());
    var vuelos = parseInt($("#inputVuelos").val());
    var persona = new Persona(nombre, tamanio, calefaccion, bombillas, temperatura, aire, alimento, transporte, vuelos);

    var huellaCarbono = persona.consumo();

    showResult(huellaCarbono)

    var nuevoStorage = [];
    if (localStorage.getItem("histPersonas") !== null) {
        var storage = JSON.parse(localStorage.histPersonas);
        if (storage.length > 0) {
            nuevoStorage = eliminarPersonaRepetida(persona, storage);
        }
    }

    nuevoStorage.push(persona)
    localStorage.histPersonas = JSON.stringify(nuevoStorage);
}

function eliminarPersonaRepetida(nuevaPersona, storage) {
    return storage.filter(function (personaGuardada) {
        return personaGuardada.nombre !== nuevaPersona.nombre
    })
}

function completarHistorial() {
    var option = $("#inputHistorial").val();
    var storage = JSON.parse(localStorage.histPersonas);
    var persona;
    storage.forEach(element => {
        if (element.nombre == option) {
            persona = element
        }
    });

    $("#nombre")[0].value = persona.nombre;
    $("#inputVivienda")[0].value = persona.tamanio;
    $("#inputBombillas")[0].value = persona.bombillas;
    $("#inputCalefaccion")[0].value = persona.calefaccion;
    $("#inputTemperatura")[0].value = persona.temperatura;
    $("#inputAire")[0].value = persona.aire;
    $("#inputAlimento")[0].value = persona.alimento;
    $("#inputTransporte")[0].value = persona.transporte;
    $("#inputVuelos")[0].value = persona.vuelos;
}


$("#calculo").click(calcularHuella);
$("#reload").click(function () {
    location.reload()
})

if (localStorage.getItem("histPersonas") !== null) {
    var storage = JSON.parse(localStorage.histPersonas);
    if (storage.length > 0) {
        $("#historial").toggle()

        var historialSelect = $("#inputHistorial");
        storage.forEach(element => {
            var option = document.createElement("option")
            option.innerHTML = element.nombre
            historialSelect[0].appendChild(option)
        });
        historialSelect.change(completarHistorial);
        completarHistorial();
    }
}
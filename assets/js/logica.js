const asignarEventos = ()=>{
    let principales = document.getElementById('divPrincipales');
    principales.addEventListener('mouseenter', pintarPrincipales);
    let secundario = document.getElementById('divSecundarios');
    secundario.addEventListener('mouseenter', pintarSecundario);
    let otros = document.getElementById('divOtros');
    otros.addEventListener('mouseenter', pintarOtros);
};

const consumirAPI = (contador, color)=>{
    let url = `https://swapi.dev/api/people/${contador}`;
    fetch(url)
        .then((respuesta)=>{
            console.log(respuesta);
            respuesta.json()
                .then((objJsonRespuesta)=>{
                    console.log(objJsonRespuesta);

                    let divCard = document.createElement('div');
                    divCard.setAttribute("class", "estilosCards");
                    let laClaseCirculo = '';
                    switch(color){
                        case 'rojo':
                            laClaseCirculo = "circuloRojo";
                            break;
                        case 'verde':
                            laClaseCirculo = "circuloVerde";
                            break;
                        case 'azul':
                            laClaseCirculo = "circuloAzul";
                            break;
                        default:
                            laClaseCirculo = "circuloDefault";
                    }
                    let contenidoCard = `
                        <div class="card" style="width: 17rem;">
                            <div class="card-body">
                                <h5 class="card-title"><div class=${laClaseCirculo}></div> ${objJsonRespuesta.name}</h5>
                                <div class="container">
                                    <div class="row">
                                        <div class="col-6">
                                            <p>Altura: <span>${objJsonRespuesta.height}</span> cm </p>
                                        </div>
                                        <div class="col-6">
                                            <p>Masa: <span">${objJsonRespuesta.mass}</span> kg </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `;
                        divCard.innerHTML = contenidoCard;
                        document.getElementById('contenedorCard').appendChild(divCard);
                        
                })
                .catch((errorTransformacion)=>{
                    console.log('error al transformar la api en json: ', errorTransformacion);
                })
        })
        .catch((error)=>{
            console.log('error en ejecutar la Api: ', error);
        })
};

let contadorPrincipales = 1;
let contadorSecundario = 2;
let contadorOtros = 12;

var generadorCardPrincipales = crearCardPrincipales();
var generadorCardSecundarios = crearCardSecundarios();
var generadorCardOtros = crearCardOtros();

const pintarPrincipales = ()=>{
    generadorCardPrincipales.next();
};
const pintarSecundario = ()=>{
    generadorCardSecundarios.next();
};
const pintarOtros = ()=>{
    generadorCardOtros.next();
};

function* crearCardPrincipales(){
    while(contadorPrincipales <= 5){
        consumirAPI(contadorPrincipales, 'rojo');
        yield contadorPrincipales++;
    }
};
function* crearCardSecundarios(){
    while(contadorSecundario <= 11){
        consumirAPI(contadorSecundario, 'verde');
        yield contadorSecundario++;
    }
};
function* crearCardOtros(){
    while(contadorOtros <= 17){
        consumirAPI(contadorOtros, 'azul');
        yield contadorOtros++;
    }
};
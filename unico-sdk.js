import { UnicoCheckBuilder, SelfieCameraTypes, UnicoThemeBuilder, DocumentCameraTypes } from './UnicoCheckBuilder.min.js'
/*import axios from 'axios';*/
var callback = {
    on: {
        success: function (obj) {
            // Realiza a requisição com os dados
            // da imagem para o endpoint (api2)
            createProcess(obj);
            var url = new URL(window.location.href);
            var idValor = url.searchParams.get('id');
            console.log(idValor);
            console.log(obj.base64)

            fetch(
                "https://sboxgestor.bubbleapps.io/version-test/api/1.1/wf/recieve_selfie/initialize",
                {
                    method: 'POST',
                    body: JSON.stringify(obj),
                    headers: { 'Content-Type': 'application/json' }
                }
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                })
                .catch((error) => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
        },
        error: function (error) {
            console.log(error);
            //confira na aba "Configura  es" sobre os tipos de erros
        },
    },
};

const unicoCameraBuilder = new UnicoCheckBuilder();
unicoCameraBuilder.setResourceDirectory('/resources');
unicoCameraBuilder.setModelsPath('/models');

const unicoTheme = new UnicoThemeBuilder()
    .build();

unicoCameraBuilder.setTheme(unicoTheme);

const unicoCamera = unicoCameraBuilder.build();
const cameraPromised = unicoCamera.prepareSelfieCamera('/services.json', SelfieCameraTypes.SMART);
cameraPromised.then(cameraOpener => cameraOpener.open(callback))

function createProcess(unico) { console.log(unico) };
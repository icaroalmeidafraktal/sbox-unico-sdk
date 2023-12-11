import { UnicoCheckBuilder, SelfieCameraTypes, UnicoThemeBuilder, DocumentCameraTypes } from './UnicoCheckBuilder.min.js'
import axios from './node_modules/axios/dist/browser/axios.cjs';
var callback = {
    on: {
        success: function (obj) {

            // Realiza a requisição com os dados
            // da imagem para o endpoint (api2)
            createProcess(obj);

            axios.post('https://sboxgestor.bubbleapps.io/version-test/api/1.1/wf/recieve_selfie/initialize', obj)
                .then(response => {
                    res.end();
                })
                .catch(error => {
                    res.end();
                });

        },
        error: function (error) {
            //confira na aba "Configura��es" sobre os tipos de erros
        }
    }
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

function createProcess(unico) {
    console.log(unico)
}
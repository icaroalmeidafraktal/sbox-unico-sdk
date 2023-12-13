import { UnicoCheckBuilder, SelfieCameraTypes, UnicoThemeBuilder, DocumentCameraTypes } from './UnicoCheckBuilder.min.js'

function mostrarModal() {
    let modal = document.createElement("div");
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    modal.style.display = "flex";
    modal.style.alignItems = "center";
    modal.style.justifyContent = "center";
    let conteudo = document.createElement("div");
    conteudo.style.backgroundColor = "white";
    conteudo.style.padding = "20px";
    conteudo.style.borderRadius = "10px";
    let mensagem = document.createElement("p");
    mensagem.textContent = "Processo executado com sucesso. A página já pode ser fechada.";
    conteudo.appendChild(mensagem);
    modal.appendChild(conteudo);
    document.body.appendChild(modal);
    return mensagem;
}

var callback = {
    on: {
        success: function (obj) {
            // Realiza a requisição com os dados
            // da imagem para o endpoint (api2)
            createProcess(obj);
            var url = new URL(window.location.href);
            var idValor = url.searchParams.get('id');

            const jsonToSend = {
                id: idValor,
                base64: obj.base64,
                encrypted: obj.encrypted
            };


            fetch(
                "https://sboxgestor.bubbleapps.io/api/1.1/wf/recieve_selfie",
                { method: 'POST', body: JSON.stringify(jsonToSend), headers: { 'Content-Type': 'application/json' } }
            )
                .then((response) => { if (!response.ok) { throw new Error('Network response was not ok'); } })
                .catch((error) => { console.error('There has been a problem with your fetch operation:', error); });

            mostrarModal();

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
document.getElementById('uploadButton').addEventListener('click', function (event) {
    event.preventDefault(); // Impede o comportamento padrão do botão

    var imageInput = document.getElementById('imageInput').files[0];
    console.log(imageInput)
    if (imageInput) {
        var formData = new FormData();
        formData.append('image', imageInput);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.imgur.com/3/image', true);
        xhr.setRequestHeader('Authorization', 'Client-ID 8631a103f44b899'); // Substitua pelo seu Client ID

        xhr.onload = function () {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                document.getElementById('img-preview').setAttribute("src", response.data.link);
                // document.getElementById('uploadedImgUrl').value = response.data.link;


                var springapi = new XMLHttpRequest();
                var springurl = "http://localhost:8080/usuarios/cadastrar"

                var userCad = {
                    "username":document.getElementById("username").value,
                    "password": document.getElementById("password").value,
                    "imgPath": response.data.link
                }

                springapi.open("POST",springurl)
                springapi.setRequestHeader("Content-Type", "application/json");

                springapi.send(JSON.stringify(userCad));


            } else {
                document.getElementById('uploadedImgUrl').value = 'Erro ao fazer upload da imagem.';
            }
        };
        xhr.onerror = function () {
            document.getElementById('uploadedImgUrl').value = 'Erro ao fazer upload da imagem. Não foi possível conectar ao servidor.';
        };
        xhr.send(formData);
    } else {
        alert('Por favor, selecione uma imagem.');
    }
});
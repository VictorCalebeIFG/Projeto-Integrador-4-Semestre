// Obter o parâmetro de username da URL
const params = new URLSearchParams(window.location.search);
const username = params.get('username');

console.log('username: ' + username);
document.getElementById('usernamespan').innerHTML = username;

// FOTO DE PERFIL DO USUÁRIO
var xhr = new XMLHttpRequest();
xhr.open('GET', "http://localhost:8080/usuarios/" + username);

xhr.onload = function () {
    if (xhr.status === 200) {
        var user = JSON.parse(xhr.responseText);
        console.log(user);  // Verifique a resposta do servidor
        document.getElementById('imgprofile').src = user.imgPath;  // Use imgPath
    } else {
        console.error('Erro ao carregar dados do usuário');
    }
};

xhr.send();

// TODOS OS POSTS
var xhrPosts = new XMLHttpRequest();
xhrPosts.open('GET', "http://localhost:8080/posts");

function create_post(post) {
    return new Promise((resolve, reject) => {
        var xhrUserImg = new XMLHttpRequest();
        xhrUserImg.open('GET', "http://localhost:8080/usuarios/" + post.username);
        
        xhrUserImg.onload = function () {
            if (xhrUserImg.status === 200) {
                var userimg = JSON.parse(xhrUserImg.responseText);
                const newDiv = document.createElement("div");
                newDiv.innerHTML = `
                    <div class='postunit'>
                        <div class='profileimgpost'> 
                            <img src="${userimg.imgPath}" alt="${post.username}"> 
                            <h3>${post.username}</h3> 
                        </div>
                        <div class='postimg'>
                            <img src="${post.imagepath}" alt="${post.username}">
                        </div>
                        <div class='buttonspost'>
                            <img src="../Assets/barra_post.png" alt="" srcset="" style="width: 250px;">
                            <p> ❤️ ${post.likes}</p>
                        </div>
                    </div>
                `;
                resolve(newDiv);  // Resolva a Promise com o novo post
            } else {
                reject('Erro ao carregar imagem do usuário');
            }
        };
        
        xhrUserImg.onerror = function () {
            reject('Erro na requisição para imagem do usuário');
        };

        xhrUserImg.send();
    });
}

xhrPosts.onload = function () {
    if (xhrPosts.status === 200) {
        var posts = JSON.parse(xhrPosts.responseText);
        console.log(posts);  // Verifique os dados dos posts

        // Iterar sobre os posts e criar os elementos
        posts.forEach(post => {
            create_post(post).then(postElement => {
                document.getElementById('post-area').appendChild(postElement);  // Adicione ao DOM
            }).catch(error => {
                console.error(error);  // Trate qualquer erro
            });
        });
    } else {
        console.error('Erro ao carregar dados dos posts');
    }
};

xhrPosts.send();

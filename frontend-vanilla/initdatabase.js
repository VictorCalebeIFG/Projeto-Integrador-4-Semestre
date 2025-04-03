var apirequest = new XMLHttpRequest
var apirul = 'http://localhost:8080/posts'
apirequest.open('POST',apirul)
apirequest.setRequestHeader('Content-Type', 'application/json')
var post1 = {
    "username": "usuario123",
    "titulo": "Meu primeiro post",
    "imagepath": "https://i.pinimg.com/736x/1d/da/0f/1dda0f6733adc512830e8fff4d4e9743.jpg",
    "likes": 0
}
apirequest.send(JSON.stringify(post1))

// ---

var apirequest3 = new XMLHttpRequest
var apirul = 'http://localhost:8080/posts'
apirequest3.open('POST',apirul)
apirequest3.setRequestHeader('Content-Type', 'application/json')
var post2 = {
    "username": "usuario123",
    "titulo": "Meu Segundo Post",
    "imagepath": "https://i.pinimg.com/736x/4f/75/ee/4f75ee8f361442816c72ca356808432d.jpg",
    "likes": 0
}
apirequest3.send(JSON.stringify(post2))



// ------------------------------------


var apirequest2 = new XMLHttpRequest
var apirul2 = 'http://localhost:8080/usuarios/cadastrar'

apirequest2.open('POST',apirul2)
apirequest2.setRequestHeader('Content-Type', 'application/json')

var user1 = {
    "username":"victor",
    "password": "123",
    "imgPath": "https://i.pinimg.com/736x/53/00/1a/53001a7c4523a0d30a3ed53ddf59ab1b.jpg"
}

apirequest2.send(JSON.stringify(user1))


// ---

var apirequest4 = new XMLHttpRequest
var apirul4 = 'http://localhost:8080/usuarios/cadastrar'

apirequest4.open('POST',apirul2)
apirequest4.setRequestHeader('Content-Type', 'application/json')

var user2 = {
    "username":"usuario123",
    "password": "123",
    "imgPath": "https://i.pinimg.com/736x/a2/36/85/a23685050ebfdad9d12c1422273bf7fa.jpg"
}

apirequest4.send(JSON.stringify(user2))


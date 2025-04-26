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
    "imagepath": "https://i.pinimg.com/736x/8e/ba/37/8eba37b2286bcf9a2bf4428d7cc1f7e6.jpg",
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
    "imgPath": "https://i.pinimg.com/736x/7a/1a/02/7a1a02575b8ec249b387376418126682.jpg"
}

apirequest4.send(JSON.stringify(user2))


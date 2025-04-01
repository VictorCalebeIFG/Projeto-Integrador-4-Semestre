var apirequest = new XMLHttpRequest
var apirul = 'http://localhost:8080/posts'

apirequest.open('POST',apirul)
apirequest.setRequestHeader('Content-Type', 'application/json')

var post = {
    "username": "usuario123",
    "titulo": "Meu primeiro post",
    "imagepath": "https://i.imgur.com/B1EQxqX.jpeg",
    "likes": 0
}

apirequest.send(JSON.stringify(post))
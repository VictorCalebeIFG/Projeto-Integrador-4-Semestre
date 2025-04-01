package com.senac.equipamentos.model;

import jakarta.persistence.*;

@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private String username;

    @Column(nullable = true)
    private String titulo;

    @Column(nullable = true)
    private String imagepath;

    @Column(nullable = true)
    private int likes = 0;

    public Post() {}

    public Post(String titulo, String imagepath, String username) {
        this.titulo = titulo;
        this.imagepath = imagepath;
        this.username = username;
    }

    public Long getId() {
        return this.id;
    }

    public String getTitulo() {
        return this.titulo;
    }


    public String getImagepath() {
        return this.imagepath;
    }

    public int getLikes() {
        return this.likes;
    }

    public String getUsername(){
        return this.username;
    }


}

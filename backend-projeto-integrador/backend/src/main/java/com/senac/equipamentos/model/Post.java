package com.senac.equipamentos.model;

import jakarta.persistence.*;

@Entity
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String titulo;

    @Lob
    @Column(columnDefinition = "BYTEA") // Para PostgreSQL. Use `BLOB` se estiver usando MySQL
    private byte[] imagepath;

    private int likes = 0;


    public Post() {}

    public Post(String titulo, byte[] imagepath, String username) {
        this.titulo = titulo;
        this.imagepath = imagepath;
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public byte[] getImagepath() {
        return imagepath;
    }

    public int getLikes() {
        return likes;
    }

    public String getUsername() {
        return username;
    }



    public void setLikes(int likes) {
        this.likes = likes;
    }

}

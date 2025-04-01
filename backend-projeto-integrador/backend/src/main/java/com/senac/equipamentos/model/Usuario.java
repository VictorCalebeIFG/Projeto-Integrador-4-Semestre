package com.senac.equipamentos.model;

import jakarta.persistence.*;

@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column
    private String imgPath; // Pode ser nulo

    public Usuario() {}

    public Usuario(String username, String password, String imgPath) {
        this.username = username;
        this.password = password;
        this.imgPath = imgPath;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getImgPath() {
        return imgPath;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setImgPath(String imgPath) {
        this.imgPath = imgPath;
    }
}
package com.senac.equipamentos.model;

import jakarta.persistence.*;

@Entity
public class Comentario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String texto;

    private Long idPost;      // id do post (sem relacionamento)

    private String usuario;   // nome do usuário que comentou (string simples)

    public Comentario() {}

    public Comentario(String texto, Long idPost, String usuario) {
        this.texto = texto;
        this.idPost = idPost;
        this.usuario = usuario;
    }

    public Long getId() {
        return id;
    }

    public String getTexto() {
        return texto;
    }

    public Long getIdPost() {
        return idPost;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public void setIdPost(Long idPost) {
        this.idPost = idPost;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }
}

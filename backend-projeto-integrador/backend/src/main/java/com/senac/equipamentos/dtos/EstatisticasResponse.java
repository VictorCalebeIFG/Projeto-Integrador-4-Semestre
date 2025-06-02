package com.senac.equipamentos.dtos;


public class EstatisticasResponse {
    private String username;
    private int totalLikes;
    private long totalComentarios;
    private long totalPosts;

    public EstatisticasResponse(String username, int totalLikes, long totalComentarios, long totalPosts) {
        this.username = username;
        this.totalLikes = totalLikes;
        this.totalComentarios = totalComentarios;
        this.totalPosts = totalPosts;
    }

    // Getters e setters

    public String getUsername() {
        return username;
    }

    public int getTotalLikes() {
        return totalLikes;
    }

    public long getTotalComentarios() {
        return totalComentarios;
    }

    public long getTotalPosts() {
        return totalPosts;
    }
}

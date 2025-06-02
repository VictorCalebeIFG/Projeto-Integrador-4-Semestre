package com.senac.equipamentos.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.senac.equipamentos.dtos.EstatisticasResponse;
import com.senac.equipamentos.model.Post;
import com.senac.equipamentos.repository.ComentarioRepository;
import com.senac.equipamentos.repository.PostRepository;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "*") // Permite acesso do Angular
public class PostController {

    private final PostRepository postRepository;
    private final ComentarioRepository comentarioRepository;

    public PostController(PostRepository postRepository,ComentarioRepository comentarioRepository) {
        this.postRepository = postRepository;
        this.comentarioRepository = comentarioRepository;
    }

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        List<Post> posts = postRepository.findAll();
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/usuario/{username}")
    public ResponseEntity<List<Post>> listarPostsPorUsuario(@PathVariable String username) {
        List<Post> posts = postRepository.findByUsername(username);
        return ResponseEntity.ok(posts);
    }

    @PostMapping
    public ResponseEntity<Post> criarPost(
            @RequestParam String titulo,
            @RequestParam String username,
            @RequestParam(value = "image", required = false) MultipartFile image) throws IOException {

        byte[] imageBytes = null;
        if (image != null && !image.isEmpty()) {
            imageBytes = image.getBytes();
        }

        Post post = new Post(titulo, imageBytes, username);
        Post savedPost = postRepository.save(post);
        return ResponseEntity.ok(savedPost);
    }

    @PostMapping("/{id}/like")
    public ResponseEntity<Post> curtirPost(@PathVariable Long id) {
        return postRepository.findById(id).map(post -> {
            post.setLikes(post.getLikes() + 1); // incrementa likes
            Post atualizado = postRepository.save(post);
            return ResponseEntity.ok(atualizado);
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarPost(@PathVariable Long id) {
        if (postRepository.existsById(id)) {
            postRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/estatisticas/{username}")
    public ResponseEntity<?> getEstatisticasPorUsuario(@PathVariable String username) {
        Integer totalLikes = postRepository.totalLikesByUsername(username);
        Long totalPosts = postRepository.totalPostsByUsername(username);
        Long totalComentarios = comentarioRepository.totalComentariosByUsuario(username);

    // Evita null pointer caso não tenha nenhum like ainda
        if (totalLikes == null) totalLikes = 0;

        return ResponseEntity.ok(new EstatisticasResponse(username, totalLikes, totalComentarios, totalPosts));
}


}

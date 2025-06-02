package com.senac.equipamentos.controller;

import com.senac.equipamentos.model.Comentario;
import com.senac.equipamentos.repository.ComentarioRepository;
import com.senac.equipamentos.repository.PostRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comentarios")
@CrossOrigin(origins = "*")
public class ComentarioController {

    private final ComentarioRepository comentarioRepository;
    private final PostRepository postRepository;

    public ComentarioController(ComentarioRepository comentarioRepository, PostRepository postRepository) {
        this.comentarioRepository = comentarioRepository;
        this.postRepository = postRepository;
    }

    // Adicionar comentário, agora com usuario como string e idPost simples
    @PostMapping
    public ResponseEntity<Comentario> adicionarComentario(
        @RequestParam Long postId,
        @RequestParam String usuario,
        @RequestParam String texto) {

        // Verifica se o post existe
        if (!postRepository.existsById(postId)) {
            return ResponseEntity.badRequest().build();
        }

        Comentario comentario = new Comentario(texto, postId, usuario);
        Comentario salvo = comentarioRepository.save(comentario);
        return ResponseEntity.ok(salvo);
    }

    // Listar comentários de um post (filtra por idPost)
    @GetMapping("/post/{postId}")
    public ResponseEntity<List<Comentario>> listarComentariosPorPost(@PathVariable Long postId) {
        if (!postRepository.existsById(postId)) {
            return ResponseEntity.notFound().build();
        }

        List<Comentario> comentarios = comentarioRepository.findByIdPost(postId);
        return ResponseEntity.ok(comentarios);
    }

    // Contar número de comentários em um post
    @GetMapping("/count/{postId}")
    public ResponseEntity<Integer> contarComentarios(@PathVariable Long postId) {
        if (!postRepository.existsById(postId)) {
            return ResponseEntity.notFound().build();
        }

        int count = comentarioRepository.countByIdPost(postId);
        return ResponseEntity.ok(count);
    }
}

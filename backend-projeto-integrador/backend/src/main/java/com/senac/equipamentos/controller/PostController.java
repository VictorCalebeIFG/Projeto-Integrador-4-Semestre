package com.senac.equipamentos.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.senac.equipamentos.model.Post;
import com.senac.equipamentos.repository.PostRepository;
import com.senac.equipamentos.service.PostService;


@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "*") // Permite acesso do Angular
public class PostController {
    
    private final PostRepository postRepository;

    public PostController(
        PostRepository postRepository,
        PostService postService
    ){
        this.postRepository = postRepository;
    }

    @GetMapping
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Post> criarPost(@RequestBody Post post) {
        Post rpost = postRepository.save(post);
        return ResponseEntity.ok(rpost);
    }
    

}

package com.senac.equipamentos.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.senac.equipamentos.model.Post;
import com.senac.equipamentos.repository.PostRepository;

@Service
public class PostService {

    private final PostRepository postRepository;
    
    public PostService(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    public List<Post> listAllPost(){
        return postRepository.findAll();
    }

}

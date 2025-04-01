package com.senac.equipamentos.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.senac.equipamentos.model.Post;

public interface PostRepository extends JpaRepository<Post,Long> {

}

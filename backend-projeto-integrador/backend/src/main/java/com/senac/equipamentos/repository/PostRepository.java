package com.senac.equipamentos.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.senac.equipamentos.model.Post;

public interface PostRepository extends JpaRepository<Post,Long> {

    List<Post> findByUsername(String username);

    @Query("SELECT SUM(p.likes) FROM Post p WHERE p.username = :username")
    Integer totalLikesByUsername(@Param("username") String username);

    @Query("SELECT COUNT(p) FROM Post p WHERE p.username = :username")
    Long totalPostsByUsername(@Param("username") String username);
}

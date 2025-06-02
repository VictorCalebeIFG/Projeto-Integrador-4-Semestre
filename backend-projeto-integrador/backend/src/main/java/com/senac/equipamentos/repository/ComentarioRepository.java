package com.senac.equipamentos.repository;

import com.senac.equipamentos.model.Comentario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ComentarioRepository extends JpaRepository<Comentario, Long> {

    List<Comentario> findByIdPost(Long idPost);

    int countByIdPost(Long idPost);

    @Query("SELECT COUNT(c) FROM Comentario c WHERE c.idPost IN (SELECT p.id FROM Post p WHERE p.username = :usuario)")
    Long totalComentariosByUsuario(@Param("usuario") String usuario);
}

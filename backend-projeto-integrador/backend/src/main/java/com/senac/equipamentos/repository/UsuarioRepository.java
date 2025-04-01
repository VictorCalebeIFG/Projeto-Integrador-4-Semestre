package com.senac.equipamentos.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.senac.equipamentos.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Optional<Usuario> findByUsernameAndPassword(String username, String password);
    Optional<Usuario> findByUsername(String username);
}
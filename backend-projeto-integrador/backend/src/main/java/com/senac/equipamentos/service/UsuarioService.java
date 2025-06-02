package com.senac.equipamentos.service;

import org.springframework.stereotype.Service;

import com.senac.equipamentos.model.Usuario;
import com.senac.equipamentos.repository.UsuarioRepository;

import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public boolean verificarCredenciais(String username, String password) {
        Optional<Usuario> usuario = usuarioRepository.findByUsernameAndPassword(username, password);
        return usuario.isPresent();
    }

    // public boolean atualizarImagem(String username, String novoImgPath) {
    //     Optional<Usuario> usuarioOptional = usuarioRepository.findByUsername(username);
    //     if (usuarioOptional.isPresent()) {
    //         Usuario usuario = usuarioOptional.get();
    //         usuario.setImgPath(novoImgPath);
    //         usuarioRepository.save(usuario);
    //         return true;
    //     }
    //     return false;
    // }
}
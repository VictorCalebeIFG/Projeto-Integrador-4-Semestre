package com.senac.equipamentos.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.senac.equipamentos.model.Usuario;
import com.senac.equipamentos.service.UsuarioService;
import com.senac.equipamentos.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;

    public UsuarioController(UsuarioService usuarioService, UsuarioRepository usuarioRepository) {
        this.usuarioService = usuarioService;
        this.usuarioRepository = usuarioRepository;
    }

    @PostMapping("/verificar")
    public ResponseEntity<Boolean> verificarUsuario(@RequestParam String username, @RequestParam String password) {
        boolean existe = usuarioService.verificarCredenciais(username, password);
        return ResponseEntity.ok(existe);
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<Usuario> cadastrarUsuario(
            @RequestParam("username") String username,
            @RequestParam("password") String password,
            @RequestParam(value = "image", required = false) MultipartFile image
    ) throws IOException {

        byte[] imgBytes = null;
        if (image != null && !image.isEmpty()) {
            imgBytes = image.getBytes();
        }

        Usuario novoUsuario = new Usuario(username, password, imgBytes);
        Usuario salvo = usuarioRepository.save(novoUsuario);
        return ResponseEntity.ok(salvo);
    }

    @GetMapping
    public List<Usuario> getAllUsers() {
        return usuarioRepository.findAll();
    }

    @GetMapping("/{username}")
    public Usuario getUserByUserName(@PathVariable String username) {
        for (Usuario usuario : usuarioRepository.findAll()) {
            if (usuario.getUsername().equals(username)) {
                return usuario;
            }
        }
        return null;
    }

    @PutMapping("/atualizar-senha")
    public ResponseEntity<String> atualizarSenha(
        @RequestParam String username,
        @RequestParam String novaSenha) {

    Usuario usuario = usuarioRepository.findByUsername(username);
    if (usuario != null) {
        usuario.setPassword(novaSenha);
        usuarioRepository.save(usuario);
        return ResponseEntity.ok("Senha atualizada com sucesso.");
    } else {
        return ResponseEntity.status(404).body("Usuário não encontrado.");
    }
}

}

package com.senac.equipamentos.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.senac.equipamentos.model.Usuario;
import com.senac.equipamentos.service.UsuarioService;
import com.senac.equipamentos.repository.UsuarioRepository;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*") // Permite acesso do Angular
public class UsuarioController {

    private final UsuarioService usuarioService;
    private final UsuarioRepository usuarioRepository;

    // 🔥 Construtor único para injeção correta das dependências
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
    public ResponseEntity<Usuario> cadastrarUsuario(@RequestBody Usuario usuario) {
        Usuario novoUsuario = usuarioRepository.save(usuario);
        return ResponseEntity.ok(novoUsuario);
    }

    @PutMapping("/{username}/imagem")
    public ResponseEntity<String> atualizarImagem(@PathVariable String username, @RequestParam String imgPath) {
        boolean atualizado = usuarioService.atualizarImagem(username, imgPath);
        if (atualizado) {
            return ResponseEntity.ok("Imagem de perfil atualizada com sucesso.");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping
    public List<Usuario> getAllUsers() {
        return usuarioRepository.findAll();
    }

    @GetMapping("/{username}")
    public Usuario getUserByUserName(@PathVariable String username) {
        // Inicializa o usuário
        Usuario user = null;

        // Itera sobre todos os usuários e verifica se o username corresponde
        for (Usuario usuario : usuarioRepository.findAll()) {
            if (usuario.getUsername().equals(username)) {
                user = usuario;  // Atribui o usuário correspondente
                break;  // Sai do loop assim que encontrar o usuário
            }
        }

        // Retorna o usuário encontrado ou null caso não encontre
        return user;
    }
}

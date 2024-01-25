package com.example.Back.controller;

import com.example.Back.entity.Category;
import com.example.Back.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryRepository categoriaRepository;

    @GetMapping
    public List<Category> getAllCategorias() {
        return categoriaRepository.findAll();
    }

    @PostMapping
    public Category addCategoria(@RequestBody Category categoria) {
        return categoriaRepository.save(categoria);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategoria(@PathVariable Long id, @RequestBody Category categoriaActualizada) {
        Optional<Category> categoriaOptional = categoriaRepository.findById(id);

        if (categoriaOptional.isPresent()) {
            Category categoriaExistente = categoriaOptional.get();

            // Actualizar campos de la categoriaExistente con los valores de la categoriaActualizada
            categoriaExistente.setNombre(categoriaActualizada.getNombre());
            categoriaExistente.setDescripcion(categoriaActualizada.getDescripcion());
            categoriaExistente.setImagenes(categoriaActualizada.getImagenes());
            // Actualiza otros campos según sea necesario

            // Guarda la categoría actualizada en la base de datos
            categoriaRepository.save(categoriaExistente);

            return ResponseEntity.ok(categoriaExistente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategoria(@PathVariable Long id) {
        Optional<Category> categoriaOptional = categoriaRepository.findById(id);

        if (categoriaOptional.isPresent()) {
            categoriaRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // Código de respuesta 204 (No Content) para indicar éxito sin contenido
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}


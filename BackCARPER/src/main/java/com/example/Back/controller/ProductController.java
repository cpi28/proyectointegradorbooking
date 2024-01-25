package com.example.Back.controller;

import com.example.Back.entity.Category;
import com.example.Back.entity.Product;
import com.example.Back.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductoById(@PathVariable Long id) {
        Optional<Product> productoOptional = productRepository.findById(id);

        return productoOptional.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProducto(@PathVariable Long id, @RequestBody Product productoActualizado) {
        Optional<Product> productoOptional = productRepository.findById(id);

        if (productoOptional.isPresent()) {
            Product productoExistente = productoOptional.get();

            // Actualizar campos del productoExistente con los valores del productoActualizado
            productoExistente.setNombre(productoActualizado.getNombre());
            productoExistente.setDescripcion(productoActualizado.getDescripcion());
            productoExistente.setImagenes(productoActualizado.getImagenes());
            productoExistente.setPrecio(productoActualizado.getPrecio());
            productoExistente.setMarca(productoActualizado.getMarca());
            productoExistente.setModelo(productoActualizado.getModelo());

            // Guarda el producto actualizado en la base de datos
            productRepository.save(productoExistente);

            return ResponseEntity.ok(productoExistente);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProducto(@PathVariable Long id) {
        Optional<Product> productoOptional = productRepository.findById(id);

        if (productoOptional.isPresent()) {
            productRepository.deleteById(id);
            return ResponseEntity.noContent().build(); // Código de respuesta 204 (No Content) para indicar éxito sin contenido
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Product>> buscarProductosPorNombre(@RequestParam String nombre) {
        List<Product> productos = productRepository.findByNombreContainingIgnoreCase(nombre);

        if (!productos.isEmpty()) {
            return ResponseEntity.ok(productos);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


}


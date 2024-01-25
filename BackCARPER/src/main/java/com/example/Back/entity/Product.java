package com.example.Back.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


@Entity
@Table(name = "products")
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String descripcion;
    private String imagenes;
    private Double precio;
    private String marca;
    private String modelo;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category categoria;

    // getters y setters

    // constructor(s)
}


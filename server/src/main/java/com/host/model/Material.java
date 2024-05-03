package com.host.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name="material")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Material {
    @Id
    @GeneratedValue
    private int m_id;
    private String name;
    private String categorie;
    private String date;
    @OneToMany
    private List<UserMaterial> owner;
}

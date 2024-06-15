package com.host.material;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="material")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long m_id;
    private String name;
    private String categorie;
    private String date;
    @OneToMany(mappedBy = "material_id", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserMaterial> owner  = new ArrayList<>();


}

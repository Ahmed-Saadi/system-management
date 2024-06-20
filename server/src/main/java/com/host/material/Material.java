package com.host.material;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
    @OneToMany(mappedBy = "material", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonBackReference("materialRefrence")
    private List<UserMaterial> owner  = new ArrayList<>();


}

package com.host.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.host.Dto.MaterialDto;
import com.host.Dto.Owner;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.Date;
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

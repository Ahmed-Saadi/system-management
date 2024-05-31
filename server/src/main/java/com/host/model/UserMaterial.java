package com.host.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name="user_material")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserMaterial {
    @Id
    @GeneratedValue
    private long user_material_id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference
    private User user_id;
    @ManyToOne
    @JoinColumn(name = "material_id")
    @JsonBackReference
    private Material material_id;

    private String first_date;
    private String last_date;

}


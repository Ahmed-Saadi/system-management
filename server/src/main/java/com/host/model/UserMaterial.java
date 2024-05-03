package com.host.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name="user_material")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserMaterial {
    @Id
    @GeneratedValue
    private int user_material_id;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user_id;
    @ManyToOne
    @JoinColumn(name = "material_id")
    private Material material_id;

    private String first_date;
    private String last_date;
}

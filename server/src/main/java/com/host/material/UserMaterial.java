package com.host.material;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.host.accounts.User;
import com.host.material.Material;
import jakarta.persistence.*;
import lombok.*;

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
    @JsonBackReference("userRefrence")
    private User user;
    @ManyToOne
    @JoinColumn(name = "material_id")
    @JsonBackReference("materialRefrence")
    private Material material;

    private String first_date;
    private String last_date;

}


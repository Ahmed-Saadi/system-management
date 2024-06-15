package com.host.material;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name="demands_material")
public class Demand_materiel {
    @Id
    @GeneratedValue
    private long d_id;
    private String name;
    private String categorie;
    private String type;
    @Lob
    @Column(length = 65535)
    private String description;
    private String status;
    private String comment;
}

package com.host.demandMaterial;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

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
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    @Temporal(TemporalType.TIMESTAMP)
    private Date date;

    @Lob
    @Column(length = 65535)
    private String description;
    private String status;
    private String Response;
    private String comment;
}

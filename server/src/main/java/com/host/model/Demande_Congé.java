package com.host.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "demande_congées")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Demande_Congé {
    @Id
    @GeneratedValue
    private long dc_id;
    private String name;
    private String type;
    private String date_debut;
    private String date_fin;
    private String cause;

}

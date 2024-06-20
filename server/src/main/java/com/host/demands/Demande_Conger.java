package com.host.demands;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.host.accounts.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "demande_congées")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Demande_Conger {
    @Id
    @GeneratedValue
    private long dc_id;
    private String name;
    private String type;
    private String date_debut;
    private String date_fin;
    private String cause;
    private int nb_days;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference("demandCongerRefrence")
    private User user;

}

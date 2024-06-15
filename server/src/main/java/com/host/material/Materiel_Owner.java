package com.host.material;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Materiel_Owner {
    private long m_id;
    private String name;
    private String categorie;
    private String Date;
    private Owner owner;
}

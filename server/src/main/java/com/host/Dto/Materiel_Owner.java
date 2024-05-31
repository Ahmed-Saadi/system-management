package com.host.Dto;


import com.host.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;


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

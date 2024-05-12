package com.host.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name="users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue
    private int u_id ;
    private String user_family_name;
    private String username;
    private String password;
    private String email;
    private String phone_number;
    private String dob;
    private String profession;
    private String gender;
    @OneToMany
    private List<UserMaterial> material;
}

package com.host.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name="users")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue
    private long u_id ;
    private String family_name;
    private String username;
    private String password;
    private String email;
    private String phone_number;
    private String dob;
    private String profession;
    private String gender;
    @OneToMany(mappedBy = "user_id", cascade = CascadeType.ALL, orphanRemoval = true)

    private List<UserMaterial> material;
}

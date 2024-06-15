package com.host.accounts;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.host.material.UserMaterial;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


import java.util.Collection;
import java.util.List;

@Entity
@Table(name="users")
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User  implements UserDetails{
    @Id
    @GeneratedValue
    private long u_id ;
    private String lastname;
    private String firstname;
    @JsonIgnore
    private String password;
    private String email;
    private String phone_number;
    private String dob;
    private String profession;
    private String gender;
    @Enumerated(EnumType.STRING)
    private Role role;
    @OneToMany(mappedBy = "user_id", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UserMaterial> material;



    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("user"));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

package com.host.email;




import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.host.accounts.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "email")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Email {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne
    private User receiver;
    @OneToOne
    private User sender;
    private String subject;
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;
    private String date;
    private Boolean favorite;
    private Boolean deleted;


    @OneToMany(mappedBy = "email", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("emailFileRefrence")
    private List<EmailFile> files = new ArrayList<>();



}

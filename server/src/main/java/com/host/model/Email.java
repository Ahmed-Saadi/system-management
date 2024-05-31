package com.host.model;




import com.fasterxml.jackson.annotation.JsonManagedReference;
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
    private String reciver;
    private String subject;
    @Column(name = "content", columnDefinition = "TEXT")
    private String content;
    private String date;
    private Boolean favorite;
    private Boolean deleted;


    @OneToMany(mappedBy = "email", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<File> files = new ArrayList<>();

}

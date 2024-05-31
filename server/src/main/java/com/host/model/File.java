package com.host.model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table(name = "files")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class File {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String filename;
    private String fileType;
    private String filepath;

    @ManyToOne
    @JoinColumn(name = "email_id")
    @JsonBackReference
    private Email email;


}


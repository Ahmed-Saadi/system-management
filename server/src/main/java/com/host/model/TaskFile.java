package com.host.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "task_files")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskFile {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String filename;
        private String fileType;
        private String filepath;

        @ManyToOne
        @JoinColumn(name = "task_id")
        @JsonBackReference
        private Task task;


    }

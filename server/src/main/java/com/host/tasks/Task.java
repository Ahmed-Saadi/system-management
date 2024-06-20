package com.host.tasks;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.host.accounts.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tasks")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long  id ;
    private String title;
    private String status;
    private String description;
    @OneToOne
    @JoinColumn(name = "assignee")
    private User assignee;
    private String date;

    @OneToMany(mappedBy = "task", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("taskRefrence")
    private List<TaskFile> files = new ArrayList<>();







}

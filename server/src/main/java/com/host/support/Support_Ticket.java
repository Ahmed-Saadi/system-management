package com.host.support;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.host.accounts.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "support_ticket")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Support_Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String subject;
    private String status;
    private String Type;
    @Column(name = "created_at", nullable = false, updatable = false)
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp updatedAt;

    @OneToMany(mappedBy = "supportTicket", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference("supportMessagesList")
    private List<Support_Message> supportMessagesList = new ArrayList<>();


    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}

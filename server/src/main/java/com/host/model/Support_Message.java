package com.host.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "support_messages")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Support_Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id ;
    private String sender;
    private String content;
    @Column(name = "sent_at", nullable = false, updatable = false)
    private Timestamp sentAt;

    @ManyToOne
    @JoinColumn(name = "support_ticket_id", nullable = false)
    @JsonBackReference
    private Support_Ticket supportTicket;


}

package com.host.Repositories;


import com.host.model.Support_Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupportTicketRepo extends JpaRepository<Support_Ticket,Long> {
}

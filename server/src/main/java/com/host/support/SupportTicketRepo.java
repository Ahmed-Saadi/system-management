package com.host.support;


import com.host.support.Support_Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupportTicketRepo extends JpaRepository<Support_Ticket,Long> {
}

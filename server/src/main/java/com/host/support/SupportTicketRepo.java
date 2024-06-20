package com.host.support;


import com.host.support.Support_Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SupportTicketRepo extends JpaRepository<Support_Ticket,Long> {

@Query("select sp from Support_Ticket sp join sp.user u where u.u_id = :UID")
List<Support_Ticket> findBySenderId(long UID);

}

package com.host.support;

import com.host.support.Support_Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SupportMessageRepo extends JpaRepository<Support_Message,Long> {
//    @Query("select sm from Support_Message sm join User u on sm.sender.u_id = u.u_id where sm.sender.u_id= :uid")
//    public List<Support_Message> getSupportMessageForUser(Long uid);


//@Query("select sm from Support_Message sm join sm.supportTicket st join sm.sender u where st.id = :id")
//public List<Support_Message> findByTicketId(Long id);
}

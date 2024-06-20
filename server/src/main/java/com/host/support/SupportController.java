package com.host.support;


import com.host.accounts.User;
import com.host.accounts.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;


@RestController
@CrossOrigin("*")
@RequestMapping("/api/support")
public class SupportController {
    @Autowired
    private SupportMessageRepo supportMessageRepo;
    @Autowired
    private SupportTicketRepo supportTicketRepo;
    @Autowired
    private UserRepo userRepo;


    @PostMapping("/create")
    private Support_Ticket createSupportTicket(@RequestBody SupportCreateDto supportCreateDto){
        Support_Ticket supportTicket = new Support_Ticket();
        Support_Message supportMessage =new Support_Message();
        supportTicket.setSubject(supportCreateDto.getSubject());
        supportTicket.setType(supportCreateDto.getType());
        supportTicket.setStatus("open");
        supportTicket.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        supportTicket.setUser(supportCreateDto.getSender());
        supportMessage.setContent(supportCreateDto.getRequestMessage());
        supportMessage.setSupportTicket(supportTicket);
        supportMessage.setSentAt(new Timestamp(System.currentTimeMillis()));
        supportMessage.setSender(supportCreateDto.getSender());
        supportTicket.getSupportMessagesList().add(supportMessage);
        supportTicket.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        supportTicketRepo.save(supportTicket);
        return supportTicket;
    }

    @GetMapping("/get")
    public List<Support_Ticket> getallthetickets () {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepo.findByEmail(username).get();
        return supportTicketRepo.findBySenderId(user.getU_id());
    }
    @GetMapping("/getsupportTockets")
    public List<Support_Ticket> getTicketsForAdmin () {
                return supportTicketRepo.findAll();
    }
    @PostMapping("/update")
    public Support_Ticket updateSupportTicket(@RequestBody SupportCreateDto supportCreateDto){
        Support_Ticket supportTicket = supportTicketRepo.findById(supportCreateDto.getId()).get();
        Support_Message supportMessage =new Support_Message();
        supportMessage.setContent(supportCreateDto.getRequestMessage());
        supportMessage.setSupportTicket(supportTicket);
        supportMessage.setSentAt(new Timestamp(System.currentTimeMillis()));
        supportMessage.setSender(supportCreateDto.getSender());
        supportTicket.getSupportMessagesList().add(supportMessage);
        supportTicket.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        supportTicketRepo.save(supportTicket);
        return supportTicket;
    }
}

package com.host.controller;


import com.host.Dto.SupportCreateDto;
import com.host.Repositories.SupportMessageRepo;
import com.host.Repositories.SupportTicketRepo;
import com.host.model.Support_Message;
import com.host.model.Support_Ticket;
import org.springframework.beans.factory.annotation.Autowired;
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


    @PostMapping("/create")
    private Support_Ticket createSupportTicket(@RequestBody SupportCreateDto supportCreateDto){
        Support_Ticket supportTicket = new Support_Ticket();
        Support_Message supportMessage =new Support_Message();
        supportTicket.setSubject(supportCreateDto.getSubject());
        supportTicket.setType(supportCreateDto.getType());
        supportTicket.setStatus("open");
        supportTicket.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        supportMessage.setContent(supportCreateDto.getRequestMessage());
        supportMessage.setSupportTicket(supportTicket);
        supportMessage.setSentAt(new Timestamp(System.currentTimeMillis()));
        supportTicket.getSupportMessagesList().add(supportMessage);
        supportTicket.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        supportTicketRepo.save(supportTicket);
        return supportTicket;
    }

    @GetMapping("/get")
    public List<Support_Ticket> getallthetickets () {
        return supportTicketRepo.findAll();
    }

    @PostMapping("/update")
    public Support_Ticket updateSupportTicket(@RequestBody SupportCreateDto supportCreateDto){
        Support_Ticket supportTicket = supportTicketRepo.findById(supportCreateDto.getId()).get();
        Support_Message supportMessage =new Support_Message();
        supportMessage.setContent(supportCreateDto.getRequestMessage());
        supportMessage.setSupportTicket(supportTicket);
        supportMessage.setSentAt(new Timestamp(System.currentTimeMillis()));
        supportTicket.getSupportMessagesList().add(supportMessage);
        supportTicket.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        supportTicketRepo.save(supportTicket);
        return supportTicket;
    }
}

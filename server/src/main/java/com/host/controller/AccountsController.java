package com.host.controller;

import com.host.Repositories.UserRepo;
import com.host.configuration.Myconfig;
import com.host.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/user")
public class AccountsController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private Myconfig myconfig;


    @GetMapping("/get")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users= userRepo.findAll();
        return ResponseEntity.ok(users);
    }
    @PostMapping("/add")
    public ResponseEntity<String> adduser(@RequestBody User user){
        userRepo.save(user);
        return ResponseEntity.ok("done its really done");
    }
}
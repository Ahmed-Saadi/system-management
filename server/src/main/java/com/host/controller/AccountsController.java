package com.host.controller;

import com.host.Dto.UserDto;
import com.host.Repositories.UserRepo;
import com.host.configuration.Myconfig;
import com.host.model.Material;
import com.host.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<User> adduser(@RequestBody UserDto user){
        User new_user = new User();
        new_user.setUsername(user.username());
        new_user.setFamily_name(user.family_name());
        new_user.setEmail(user.email());
        new_user.setPassword(user.password());
        new_user.setPhone_number(user.phone_number());
        new_user.setDob(user.dob());
        new_user.setProfession(user.profession());
        new_user.setGender(user.gender());
        userRepo.save(new_user);

        return ResponseEntity.ok(new_user);
    }
    @PutMapping("/edit")
    public ResponseEntity<User> editUser(@RequestBody UserDto user){
        Optional<User> existingUserOptional= userRepo.findById(user.u_id());
        if (existingUserOptional.isPresent()) {
            User existingUser=existingUserOptional.get();
            existingUser.setUsername(user.username());
            existingUser.setFamily_name(user.family_name());
            existingUser.setEmail(user.email());
            existingUser.setPassword(user.password());
            existingUser.setPhone_number(user.phone_number());
            existingUser.setDob(user.dob());
            existingUser.setProfession(user.profession());
            existingUser.setGender(user.gender());
            userRepo.save(existingUser);
            System.out.println(existingUser);
            return ResponseEntity.ok(existingUser);
        } else {
            return ResponseEntity.notFound().build();
        }

    }
    @DeleteMapping("/del/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable long id){
        userRepo.deleteById(id);
        return ResponseEntity.ok("hahahah its deleted loool ");
    }
}
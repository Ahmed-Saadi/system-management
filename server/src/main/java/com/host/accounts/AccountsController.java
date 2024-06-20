package com.host.accounts;

import jakarta.websocket.server.PathParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/user")
public class AccountsController {

    @Autowired
    private UserRepo userRepo;



    @GetMapping("/get")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> users= userRepo.findAll();
        return ResponseEntity.ok(users);
    }
    @PostMapping("/add")
    public ResponseEntity<User> adduser(@RequestBody UserDto user){
        User new_user = new User();
        new_user.setFirstname(user.firstname());
        new_user.setLastname(user.lastname());
        new_user.setEmail(user.email()+"@company-us.com");
        new_user.setPassword("Password");
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
            existingUser.setFirstname(user.firstname());
            existingUser.setLastname(user.lastname());
            existingUser.setEmail(user.email()+"@company-us.com");
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


    @PostMapping("/{id}/ProfilePicture")
    public ResponseEntity<?> changeProfilePicture(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            String folderPath = "uploads/profile_pictures/";

            File folder = new File(folderPath);
            if (!folder.exists()) {
                folder.mkdirs();
            }

            String fileName = id + "_" + file.getOriginalFilename();
            Path path = Paths.get(folderPath + fileName);

            // Save the file
            Files.write(path, file.getBytes());

            // Update the user's profile picture path in the database
            User user = userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
            user.setProfilePicture(path.toString());
            userRepo.save(user);

            // Return the path to the saved file instead of file bytes
            return ResponseEntity.ok(path.toString());
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload file");
        }
    }

}
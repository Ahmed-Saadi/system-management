package com.host.email;


import com.host.accounts.User;
import com.host.accounts.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/emails")
public class EmailController {

        @Autowired
        private EmailRepo emailRepo;

        @Autowired
        private EmailFileRepo emailFileRepo;

        @Autowired
        private UserRepo userRepo;


        private static final String UPLOAD_DIR = "uploads/";

        @GetMapping("/get")
        public List<Email> getAllEmails() {
            return emailRepo.findAll();
        }




    @PostMapping("/add")
    public ResponseEntity<String> createEmail(
            @RequestPart("subject") String subject,
            @RequestPart("content") String content,
            @RequestPart("receiver") String emailreceiver,
            @RequestPart(value = "files", required = false) MultipartFile[] files) {

        try {
            if (files == null) {
                files = new MultipartFile[0]; // Empty array as default
            }

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User user = userRepo.findByEmail(username).get();
            User receiver = userRepo.findByEmail(emailreceiver).get();
            Email email = new Email();
            email.setFavorite(false);
            email.setDeleted(false);
            email.setSubject(subject);
            email.setContent(content);
            email.setReceiver(receiver);
            email.setSender(user);
            email.setDate(new Date().toString());
            email.setFiles(new ArrayList<>());

            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    Path path = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
                    Files.write(path, file.getBytes());

                    EmailFile emailFile = new EmailFile();
                    emailFile.setFilename(file.getOriginalFilename());
                    emailFile.setFileType(file.getContentType());
                    emailFile.setFilepath(path.toString());
                    email.getFiles().add(emailFile);
                }
            }

            emailRepo.save(email);
            return ResponseEntity.ok("Email has been added");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Error has occurred: " + e.getMessage());
        }
    }



    @DeleteMapping("/{id}")
        public void deleteEmail(@PathVariable Long id) {
            emailRepo.deleteById(id);
        }

        @PutMapping("/favorite/{id}")
        public Email makeFavorite(@PathVariable long id ){

                Email email = emailRepo.findById(id).get();
            email.setFavorite(!email.getFavorite());
                email = emailRepo.save(email);
               return  email;
            }

        @GetMapping("/favorites")
        public Optional<List<Email>> getFavoriteEmails() {
            Optional<List<Email>> emails = emailRepo.findfavoritemails();
            return emails;
        }
        @PostMapping("/deleteEmails")
        public List<Email> sendEmailsToDelete(@RequestBody List<Email> emailsDeleted){
            List<Email> emails = new ArrayList<>();
            for(Email emaildelete: emailsDeleted){
               Email email = emailRepo.findById(emaildelete.getId()).get();
               email.setFavorite(false);
               email.setDeleted(true);
               emailRepo.save(email);
               emails.add(email);
            }
            return emails;
        }



        @PostMapping("/deleteEmailsforever")
        public List<Email>  deleteemailsforever(@RequestBody List<Email> emailsDeleted){
            List<Email> emails = new ArrayList<>();
            for(Email emaildelete: emailsDeleted){
                Email email = emailRepo.findById(emaildelete.getId()).get();
                emails.add(email);
                emailRepo.deleteById(email.getId());
            }
            return emails;
        }
        @PostMapping("/restoreEmail")
    public List<Email> restoreEmails(@RequestBody List<Email> emailstoRestore){
            List<Email> emails = new ArrayList<>();
            for(Email emailRestore: emailstoRestore){
                Email email = emailRepo.findById(emailRestore.getId()).get();
                email.setDeleted(false);
                emailRepo.save(email);
                emails.add(email);
            }
            return emails;
        }
        @GetMapping("/findAllEmails")
    public List<String> finAllEmails(){
            return userRepo.findAllByEmail();
        }
        @GetMapping("deletedemails")
    public List<Email> getDeletedEmails(){
            return emailRepo.findEmailsDeleted();
        }


}



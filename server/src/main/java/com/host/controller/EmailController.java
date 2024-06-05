package com.host.controller;


import com.host.Repositories.EmailRepo;
import com.host.Repositories.EmailFileRepo;
import com.host.model.Email;
import com.host.model.EmailFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/emails")
public class EmailController {

        @Autowired
        private EmailRepo emailRepo;

        @Autowired
        private EmailFileRepo emailFileRepo;


        private static final String UPLOAD_DIR = "uploads/";

        @GetMapping("/get")
        public List<Email> getAllEmails() {
            List<Email> emails = emailRepo.findAll();
            return emails;
        }

//        @GetMapping("/{id}")
//        public Email getEmailById(@PathVariable Long id) {
//            return emailService.getEmailById(id);
//        }



    @PostMapping("/add")
    public ResponseEntity<String> createEmail(
            @RequestParam("subject") String subject,
            @RequestParam("content") String content,
            @RequestParam("reciver") String receiver,
            @RequestParam( value = "files",required = false) MultipartFile[] files
    ) {

        try {
            // Save the email
            if (files == null) {
                files = new MultipartFile[0]; // Empty array as default
            }
            Email email = new Email();
            email.setFavorite(false);
            email.setDeleted(false);
            email.setSubject(subject);
            email.setContent(content);
            email.setReciver(receiver);
            email.setDate(new Date().toString());
            email.setFiles(new ArrayList<>());


            // Save files and set file paths in the email

               for (MultipartFile file : files) {
                   if (!file.isEmpty()) {
                       Path path = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
                      // Files.write(path, file.getBytes());

                       // Create File entity and set file path
                       EmailFile emailFile = new EmailFile();
                       emailFile.setFilename(file.getOriginalFilename());
                       emailFile.setEmail(email);
                       emailFile.setFileType(file.getContentType());
                       emailFile.setFilepath(path.toString());
                       email.getFiles().add(emailFile);
                   }
               }
               Date date = new Date();
               email.setDate(date.toString());
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
                if(email.getFavorite()){
                    email.setFavorite(false);
                }else{
                    email.setFavorite(true);
                }
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
        @GetMapping("/deletedemails")
        public List<Email> getemailDeleted(){
            return emailRepo.findEmailsDeleted();
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


}



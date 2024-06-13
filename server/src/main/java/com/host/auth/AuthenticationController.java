package com.host.auth;

import com.host.Repositories.UserRepo;
import com.host.model.User;
import lombok.RequiredArgsConstructor;
import org.apache.http.auth.InvalidCredentialsException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.mail.AuthenticationFailedException;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final UserRepo userRepo;
    private final AuthenticationService service;


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterQuest request) {
               return ResponseEntity.ok(service.register(request));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest request) {
        try {
            return ResponseEntity.ok(service.authenticate(request));
        } catch (AuthenticationException | InvalidCredentialsException e) {
            return ResponseEntity.status(404).body("Username and/or Password is wrong.");
        }
    }
     @PostMapping("/checkprivilege")
        public String checktheprivilegeoftheuser(){
         Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
         String username = authentication.getName();
         System.out.println(username);
         User user = userRepo.findByEmail(username).get();
         System.out.println(user.getRole());
            if(user.getRole().name().equals("ADMIN") ){
                return "admin";
            }else {
                return "user";
            }

        }
    }









package com.host.team;

import com.host.accounts.User;
import com.host.accounts.UserRepo;
import org.jetbrains.annotations.Range;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/team")
public class TeamController {

    @Autowired
    private TeamRepo teamRepo;
    @Autowired
    private UserRepo userRepo;

    @GetMapping("/get")
    public List<Team> getTeam(){
        return teamRepo.findAll();
    }
    @PostMapping("/create")
    public Team createTeam(@RequestBody Team team){
        team.setCreationDate(new Timestamp(System.currentTimeMillis()).toString());
        return teamRepo.save(team);
    }
    @GetMapping("/getuserTeam")
    public ResponseEntity<?> findTeamByUserId( ){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Optional<User> user = userRepo.findByEmail(username);
        if(user.isPresent()){
            return ResponseEntity.ok(teamRepo.findByUser(user.get().getU_id()));
        }
        return ResponseEntity.notFound().build();
    }

}

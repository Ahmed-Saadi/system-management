package com.host.demands;

import com.host.accounts.User;
import com.host.accounts.UserRepo;
import com.host.demandMaterial.Demand_materiel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/demands")
public class DemandeController {

    @Autowired
    private DemandeCongerRepo demandeCongerRepo;
    @Autowired
    private UserRepo userRepo;



    @GetMapping("conger/get")
    public ResponseEntity<List<Demande_Conger>> getAllTheDemandsCongéForAuser(){

        List<Demande_Conger> demands = demandeCongerRepo.findAll();
        return ResponseEntity.ok(demands);
    }
    @PostMapping("conger/add")
    public ResponseEntity<?> addANewDemandCongé(@RequestBody Demande_Conger demandeCongé){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Optional<User> user = userRepo.findByEmail(username);
        if(user.isPresent()){
            demandeCongé.setUser(user.get());
            Demande_Conger demandConger = demandeCongerRepo.save(demandeCongé);
            return ResponseEntity.ok(demandConger);
        }
        return ResponseEntity.badRequest().body("the user is not authentificated");


    }



}

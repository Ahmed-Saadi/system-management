package com.host.demandMaterial;


import com.host.accounts.User;
import com.host.material.Material;
import com.host.material.MaterialRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;


@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/demandsMaterial")
public class DemandeMaterialController {
    @Autowired
    private DemandeMaterialRepo demandeMaterialRepo;
    @Autowired
    private MaterialRepo materialRepo;

    // demande de materiel
    @GetMapping("/get")
    public ResponseEntity<List<Demand_materiel>> getAllTheDemandsForAuser(){
        List<Demand_materiel> demands = demandeMaterialRepo.findAll();
        return ResponseEntity.ok(demands);
    }
    @PostMapping("/add")
    public ResponseEntity<Demand_materiel> addANewDemand(@RequestBody Demand_materiel demandMateriel){
        demandMateriel.setStatus("created");
        demandMateriel.setDate(new Date());
        Demand_materiel demandMateriel1 = demandeMaterialRepo.save(demandMateriel);
        return ResponseEntity.ok(demandMateriel1);
    }


    @PostMapping("/material/update")
    public ResponseEntity<?> updatethedemandematerial(@RequestBody UpdateMaterialStatus update){
        Optional<Demand_materiel> demandMateriel = demandeMaterialRepo.findById(update.getId());
        if(demandMateriel.isPresent()){
            demandMateriel.get().setStatus("closed");
            demandMateriel.get().setResponse(update.getResponse());
            demandMateriel.get().setComment(update.getComment());
            demandeMaterialRepo.save(demandMateriel.get());
            return ResponseEntity.ok(demandMateriel);
        }
        return ResponseEntity.badRequest().body("the material is not found");
    }



}
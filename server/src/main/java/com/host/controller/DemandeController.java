package com.host.controller;

import com.host.Repositories.DemandeMaterialRepo;
import com.host.model.Demand_materiel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/demands")
public class DemandeController {
    @Autowired
    private DemandeMaterialRepo demandeMaterialRepo;


    @GetMapping("/get")
    public ResponseEntity<List<Demand_materiel>> getAllTheDemandsForAuser(){
        List<Demand_materiel> demands = demandeMaterialRepo.findAll();
        return ResponseEntity.ok(demands);
    }
    @PostMapping("/add")
    public ResponseEntity<Demand_materiel> addANewDemand(@RequestBody Demand_materiel demandMateriel){
        Demand_materiel demandMateriel1 = demandeMaterialRepo.save(demandMateriel);
        return ResponseEntity.ok(demandMateriel1);
    }
}

package com.host.controller;

import com.host.Repositories.DemandeCongéRepo;
import com.host.Repositories.DemandeMaterialRepo;
import com.host.model.Demand_materiel;
import com.host.model.Demande_Congé;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/demands")
public class DemandeController {
    @Autowired
    private DemandeMaterialRepo demandeMaterialRepo;
    @Autowired
    private DemandeCongéRepo demandeCongéRepo;

        // demande de materiel
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


    //demande de congé
    @GetMapping("conger/get")
    public ResponseEntity<List<Demande_Congé>> getAllTheDemandsCongéForAuser(){
        List<Demande_Congé> demands = demandeCongéRepo.findAll();
        return ResponseEntity.ok(demands);
    }
    @PostMapping("conger/add")
    public ResponseEntity<Demande_Congé> addANewDemandCongé(@RequestBody Demande_Congé demandeCongé){
        Demande_Congé demandeCongé1 = demandeCongéRepo.save(demandeCongé);
        return ResponseEntity.ok(demandeCongé1);
    }
    @PostMapping("/material/update")
    public Demand_materiel updatethedemandematerial(@RequestBody Map<String, Object> payload){
        long id = ((Number) payload.get("id")).longValue();
        Optional<Demand_materiel> demandMateriel = demandeMaterialRepo.findById(id);
        if(demandMateriel.isPresent()){
            demandMateriel.get().setStatus("closed");
            demandMateriel.get().setComment((String)  payload.get("comment"));
            demandeMaterialRepo.save(demandMateriel.get());
        }
        return demandMateriel.get();
    }



}

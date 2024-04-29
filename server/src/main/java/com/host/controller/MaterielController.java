package com.host.controller;
import com.host.Repositories.MaterialRepo;
import com.host.model.Material;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
public class Materiel {
    @Autowired
    private MaterialRepo materialRepo;
    @PostMapping("/addmaterial")
    public ResponseEntity<String> addmateriel(@RequestBody Material material){
        materialRepo.save(material);
        return ResponseEntity.status(200).body("the mmaterial has been add correctly");
    }
    @GetMapping("/getmaterial")
    public ResponseEntity<List<Material>> getmaterial(){
        List<Material> m =  materialRepo.findAll();
        return ResponseEntity.ok(m);
    }

}

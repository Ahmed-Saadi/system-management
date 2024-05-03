package com.host.controller;
import com.host.Repositories.MaterialRepo;
import com.host.model.Material;
import com.host.Dto.MaterialDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@Controller
@RequestMapping("/api")
public class MaterielController {
    @Autowired
    private MaterialRepo materialRepo;

//    @GetMapping("/test")
//    public ResponseEntity<String> testConnection(){
//        return ResponseEntity.ok("connection established");
//    }

    @PostMapping("/add")
    public ResponseEntity<Material> addmateriel(@RequestBody MaterialDto material){
        Material new_material = new Material();
        new_material.setName(material.name());
        new_material.setCategorie(material.categorie());
        new_material.setDate(material.date());
        materialRepo.save(new_material);
    return ResponseEntity.ok(new_material);
    }
    @GetMapping("/get")
    public ResponseEntity<List<Material>> getmaterial(){
        List<Material> m =  materialRepo.findAll();
        return ResponseEntity.ok(m);
    }
    @DeleteMapping("/del/{id}")
    public ResponseEntity<String> deletematerial(@PathVariable int id ){
        materialRepo.deleteById(id);
        return ResponseEntity.ok("done");
    }


    @PutMapping("/update")
    public ResponseEntity<Material> changeMaterial(@RequestBody Material material) {
        Optional<Material> existingMaterialOptional = materialRepo.findById(material.getM_id());
        if (existingMaterialOptional.isPresent()) {
            Material existingMaterial = existingMaterialOptional.get();
            existingMaterial.setName(material.getName());
            existingMaterial.setCategorie(material.getCategorie());
            existingMaterial.setOwner(material.getOwner());
            Material updatedMaterial = materialRepo.save(existingMaterial);
            return ResponseEntity.ok(updatedMaterial);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

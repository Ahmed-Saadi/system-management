package com.host.controller;
import com.host.Dto.Materiel_Owner;
import com.host.Dto.Owner;
import com.host.Repositories.MaterialRepo;
import com.host.Repositories.UserMaterialRepo;
import com.host.Repositories.UserRepo;
import com.host.model.Material;
import com.host.Dto.MaterialDto;
import com.host.model.User;
import com.host.model.UserMaterial;
import org.jetbrains.annotations.Contract;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import javax.swing.text.html.Option;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@CrossOrigin("*")
@Controller
@RequestMapping("/api")
public class MaterielController {
    @Autowired
    private MaterialRepo materialRepo;
    @Autowired
    private UserMaterialRepo userMaterialRepo;
    @Autowired
    private UserRepo userRepo;



    @PostMapping("/add")
    public ResponseEntity<Materiel_Owner> addmateriel(@RequestBody MaterialDto material) throws ParseException {
        Material material1 = new Material();
        material1.setName(material.name());
        material1.setCategorie(material.categorie());
        material1.setDate(createDate());
        materialRepo.save(material1);
        Materiel_Owner materielOwner = new Materiel_Owner();
        materielOwner.setM_id(material1.getM_id());
        materielOwner.setCategorie(material1.getCategorie());
        materielOwner.setName(material1.getName());
        materielOwner.setDate(material1.getDate());
        Optional<User> user = userRepo.findById(material.owner().u_id());
        if(user.isPresent()){
            UserMaterial userMaterial = new UserMaterial();
            userMaterial.setMaterial_id(material1);
            userMaterial.setUser_id(user.get());
            userMaterial.setFirst_date(createDate());
            userMaterialRepo.save(userMaterial);
            Owner owner = createowner(user);
            materielOwner.setOwner(owner);
        }
    return ResponseEntity.ok(materielOwner);
    }

    @GetMapping("/get")
    public ResponseEntity<List<Materiel_Owner>> getmaterial(){
        List<Materiel_Owner> materielOwners = new ArrayList<>();
        List<Material> materials = materialRepo.findAll();
        for(Material material : materials){
            Materiel_Owner materielOwner = new Materiel_Owner();
            materielOwner.setM_id(material.getM_id());
            if(!material.getOwner().isEmpty()){
                long user_id  = userMaterialRepo.findUser(material.getM_id());
                Optional<User> user = userRepo.findById(user_id);
                if(user.isPresent()){
                    Owner owner = createowner(user);
                    materielOwner.setOwner(owner);
                }
            }
            materielOwner.setName(material.getName());
            materielOwner.setCategorie(material.getCategorie());
            materielOwner.setDate(material.getDate());

            materielOwners.add(materielOwner);
        }
        return ResponseEntity.ok(materielOwners);
    }
    @DeleteMapping("/del/{id}")
    public ResponseEntity<String> deletematerial(@PathVariable long id ){
            materialRepo.deleteById(id);
        return ResponseEntity.ok("done");
    }


    @PutMapping("/update")
    public ResponseEntity<Materiel_Owner> changeMaterial(@RequestBody Materiel_Owner material) throws ParseException {
        Optional<Material> existingMaterialOptional = materialRepo.findById(material.getM_id());
        if (!existingMaterialOptional.isPresent())
            return ResponseEntity.notFound().build();
        Material existingMaterial = existingMaterialOptional.get();
        existingMaterial.setName(material.getName());
        existingMaterial.setCategorie(material.getCategorie());
       if(material.getOwner() != null){
        if(material.getOwner().u_id() != 0) {   // find if the owner is not empty so we can add it in the relatiosnship
            Optional<UserMaterial> findusermaterial = userMaterialRepo.findUserMaterialHavingAnOldOwner(existingMaterial.getM_id());
            if(findusermaterial.isPresent()){
                findusermaterial.get().setLast_date(createDate());
                userMaterialRepo.save(findusermaterial.get());
            }
            Optional<User> user = userRepo.findById(material.getOwner().u_id());
            if (user.isPresent()){
                UserMaterial userMaterial = new UserMaterial();
                userMaterial.setMaterial_id(existingMaterial);
                userMaterial.setUser_id(user.get());
                userMaterial.setFirst_date(createDate());
                userMaterialRepo.save(userMaterial);
                existingMaterial.getOwner().add(userMaterial);
            }
            materialRepo.save(existingMaterial);
            material.setM_id(existingMaterial.getM_id());
            material.setCategorie(material.getCategorie());
            material.setOwner(createowner(user));
        }
       }else{
           materialRepo.save(existingMaterial);
            material.setM_id(existingMaterial.getM_id());
            material.setCategorie(material.getCategorie());
        }

        return ResponseEntity.ok(material);

    }

    private @NotNull Owner createowner(@NotNull Optional<User> user ){
        return new  Owner(user.get().getU_id(),user.get().getUsername(),user.get().getFamily_name(),user.get().getProfession());
    }
    private String createDate() throws ParseException {
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date());
    }

}

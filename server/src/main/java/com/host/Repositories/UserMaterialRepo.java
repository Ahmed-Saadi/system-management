package com.host.Repositories;

import com.host.model.UserMaterial;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserMaterialRepo extends JpaRepository<UserMaterial,Integer> {
}

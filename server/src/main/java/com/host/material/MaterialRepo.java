package com.host.material;

import com.host.material.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaterialRepo  extends JpaRepository<Material,Long> {

    @Query("SELECT m FROM Material m JOIN UserMaterial um ON m.m_id = um.material.m_id WHERE um.user.u_id = :userId")
    List<Material> findMaterialsByUserId(@Param("userId") Long userId);
}

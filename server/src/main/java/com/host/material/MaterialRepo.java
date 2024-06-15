package com.host.material;

import com.host.material.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialRepo  extends JpaRepository<Material,Long> {
}

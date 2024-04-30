package com.host.Repositories;

import com.host.model.Material;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MaterialRepo  extends JpaRepository<Material,Integer> {
}

package com.host.material;

import com.host.material.Demand_materiel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemandeMaterialRepo  extends JpaRepository<Demand_materiel,Long> {
}

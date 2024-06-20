package com.host.demandMaterial;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemandeMaterialRepo  extends JpaRepository<Demand_materiel,Long> {
}

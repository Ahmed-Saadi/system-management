package com.host.Repositories;

import com.host.model.Demand_materiel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemandeMaterialRepo  extends JpaRepository<Demand_materiel,Integer> {
}

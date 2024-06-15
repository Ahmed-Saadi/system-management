package com.host.demands;

import com.host.demands.Demande_Congé;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemandeCongéRepo extends JpaRepository<Demande_Congé,Long> {
}

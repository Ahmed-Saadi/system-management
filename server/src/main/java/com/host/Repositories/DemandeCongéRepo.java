package com.host.Repositories;

import com.host.model.Demande_Congé;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemandeCongéRepo extends JpaRepository<Demande_Congé,Long> {
}

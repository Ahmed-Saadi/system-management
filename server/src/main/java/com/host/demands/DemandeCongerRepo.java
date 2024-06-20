package com.host.demands;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DemandeCongerRepo extends JpaRepository<Demande_Conger,Long> {
}

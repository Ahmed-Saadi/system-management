package com.host.team;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepo extends JpaRepository<Team,Long> {
    @Query("SELECT t FROM Team t JOIN t.members m WHERE m.id = :id")
    Team findByUser(Long id);
}

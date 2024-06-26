package com.host.email;

import com.host.email.Email;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface EmailRepo extends JpaRepository<Email, Long> {
    @Query(value = "select * from email where favorite = 1 ",nativeQuery = true)
    Optional<List<Email>>findfavoritemails();

    @Query(value="select * from email where deleted = 0",nativeQuery = true)
    @Override
    @NotNull List<Email> findAll();
    @Query(value="select * from email where deleted = 1",nativeQuery = true)
    List<Email> findEmailsDeleted();
}

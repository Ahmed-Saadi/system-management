package com.host.Repositories;

import com.host.model.Email;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface EmailRepo extends JpaRepository<Email, Long> {
    @Query(value = "select * from email where favorite = 1 ",nativeQuery = true)
    public Optional<List<Email>>findfavoritemails();

    @Query(value="select * from email where deleted = 0",nativeQuery = true)
    @Override
    public @NotNull List<Email> findAll();
    @Query(value="select * from email where deleted = 1",nativeQuery = true)
    List<Email> findEmailsDeleted();
}

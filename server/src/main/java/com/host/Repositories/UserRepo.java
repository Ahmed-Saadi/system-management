package com.host.Repositories;

import com.host.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo  extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String Email);

    //User findByUsername(String username);
}

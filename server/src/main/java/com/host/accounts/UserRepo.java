package com.host.accounts;

import com.host.accounts.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepo  extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String Email);

    //User findByUsername(String username);
}

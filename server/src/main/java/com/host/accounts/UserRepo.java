package com.host.accounts;

import com.host.accounts.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo  extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String Email);
    @Query("select u.email from User u where u.u_id > 1 ")
    List<String> findAllByEmail();
}

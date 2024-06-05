package com.host.Repositories;


import com.host.model.EmailFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface EmailFileRepo extends JpaRepository<EmailFile, Long> {
    public List<EmailFile> findFileByEmailId(long id);
}

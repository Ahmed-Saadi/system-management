package com.host.Repositories;


import com.host.model.File;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface FileRepo extends JpaRepository<File, Long> {
    public List<File> findFileByEmailId(long id);
}

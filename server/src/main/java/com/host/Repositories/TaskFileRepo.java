package com.host.Repositories;

import com.host.model.TaskFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskFileRepo extends JpaRepository<TaskFile,Long> {
}

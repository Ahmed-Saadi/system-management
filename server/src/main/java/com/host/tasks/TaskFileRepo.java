package com.host.tasks;

import com.host.tasks.TaskFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskFileRepo extends JpaRepository<TaskFile,Long> {
}

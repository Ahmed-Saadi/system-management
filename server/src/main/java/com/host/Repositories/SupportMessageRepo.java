package com.host.Repositories;

import com.host.model.Support_Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupportMessageRepo extends JpaRepository<Support_Message,Long> {
}

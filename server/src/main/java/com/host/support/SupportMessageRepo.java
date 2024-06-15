package com.host.support;

import com.host.support.Support_Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupportMessageRepo extends JpaRepository<Support_Message,Long> {
}

package com.host;

import com.host.accounts.UserRepo;
import com.host.accounts.Role;
import com.host.accounts.User;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;


@SpringBootApplication
@RequiredArgsConstructor
public class Application {
	private final UserRepo userRepo;
	private final PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	@Bean
	public CommandLineRunner createAdminUser() {
		return args -> {
			String email = "admin@company-us.com";
			if (userRepo.findByEmail(email).isEmpty()) {
				User admin = new User();
				admin.setEmail(email);
				admin.setPassword(passwordEncoder.encode("123456"));
				admin.setRole(Role.ADMIN);
				userRepo.save(admin);

			}
		};
	}



}

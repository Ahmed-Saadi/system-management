package com.host.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterQuest {
    private String firstname;
    private String lastname;
    private String email;
    private String password;
}

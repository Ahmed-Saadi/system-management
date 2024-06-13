package com.host.Dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupportCreateDto {
    private long id;
    private String subject;
    private String type;
    private String requestMessage;
}

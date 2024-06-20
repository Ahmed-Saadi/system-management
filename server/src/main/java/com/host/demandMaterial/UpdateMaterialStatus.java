package com.host.demandMaterial;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateMaterialStatus {
    private Long id ;
    private String response;
    private String comment;
}

package com.host.controller;

import com.host.Repositories.FileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@CrossOrigin("http://localhost:5173")
public class FileController {

    private static final String UPLOAD_DIR = "uploads/";
    @Autowired
    private FileRepo fileRepo;

    @PostMapping("/upload")
    public ResponseEntity<String> handleFileUpload(@RequestParam("files") MultipartFile[] files) {
        try {
            createUploadDirIfNotExists();

            for (MultipartFile file : files) {
                saveFile(file);
            }

            return ResponseEntity.status(HttpStatus.OK).body("Files uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload files");
        }
    }

    private void createUploadDirIfNotExists() throws IOException {
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
    }

    private void saveFile(MultipartFile file) throws IOException {
        Path filePath = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
        file.transferTo(filePath);
    }
}

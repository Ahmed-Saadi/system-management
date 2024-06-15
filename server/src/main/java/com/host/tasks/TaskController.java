package com.host.tasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;


@CrossOrigin("*")
@RestController
@RequestMapping("/api/task")
public class TaskController {
    @Autowired
    private TaskRepo taskRepo;
    @Autowired
    private TaskFileRepo taskFileRepo;

    private static final String UPLOAD_DIR = "uploads/";



    @PostMapping("/add")
    public ResponseEntity<?> addNewTask(
            @RequestPart("title") String title,
            @RequestPart("description") String description,
            @RequestPart("assignee") String assignee,
            @RequestPart(value = "files", required = false) MultipartFile[] files) {

        Date date = new Date();
        Task task = new Task();
        task.setTitle(title);
        task.setAssignee(assignee);
        task.setDescription(description);
        task.setStatus("To Do");
        task.setDate(date.toString());
        task.setFiles(new ArrayList<>());

        if (files != null) {
            for (MultipartFile file : files) {
                if (!file.isEmpty()) {
                    try {
                        Path uploadPath = Paths.get(UPLOAD_DIR);
                        if (!Files.exists(uploadPath)) {
                            Files.createDirectories(uploadPath); // Create the directory if it doesn't exist
                        }
                        Path filePath = uploadPath.resolve(file.getOriginalFilename());
                        Files.write(filePath, file.getBytes());

                        TaskFile taskFile = new TaskFile();
                        taskFile.setFilename(file.getOriginalFilename());
                        taskFile.setTask(task);
                        taskFile.setFileType(file.getContentType());
                        taskFile.setFilepath(filePath.toString());
                        task.getFiles().add(taskFile);
                    } catch (Exception e) {
                        e.printStackTrace();
                        return ResponseEntity.internalServerError().body("Error occurred while saving file: " + e.getMessage());
                    }
                }
            }
        }

        taskRepo.save(task);
        return ResponseEntity.ok(task);
    }


    @GetMapping("/get")
    public List<Task> getTasks(){
        return taskRepo.findAll();
    }

    @PostMapping("/updateState")
    public Task changestatusoftaask(@RequestBody Map<String, Object> payload){
        Long id = ((Number) payload.get("id")).longValue();
        String status = (String) payload.get("status");
        Task task = taskRepo.findById(id).get();
        task.setStatus(status);
        taskRepo.save(task);
        return task;
    }
}

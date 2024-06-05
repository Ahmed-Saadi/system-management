package com.host.controller;

import com.host.Repositories.TaskFileRepo;
import com.host.Repositories.TaskRepo;

import com.host.model.EmailFile;
import com.host.model.Task;
import com.host.model.TaskFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
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
    public Task adddAnewTask(@RequestParam("title") String title,
                             @RequestParam("description") String description,
                             @RequestParam("assignee") String assignee,
                             @RequestParam( value = "files",required = false) MultipartFile[] files){
        Date date = new Date();
        Task task= new Task();
        task.setTitle(title);
        task.setAssignee(assignee);
        task.setDescription(description);
        task.setStatus("To Do");
        task.setDate(date.toString());
        if(files != null){


            for (MultipartFile file : files) {
            if (!file.isEmpty()) {
                Path path = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
                TaskFile taskFile = new TaskFile();
                taskFile.setFilename(file.getOriginalFilename());
                taskFile.setTask(task);
                taskFile.setFileType(file.getContentType());
                taskFile.setFilepath(path.toString());
                task.getFiles().add(taskFile);
            }
        }
        }
        taskRepo.save(task);
        return task;
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
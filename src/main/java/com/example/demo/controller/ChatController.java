package com.example.demo.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.payload.CricketResponse;
import com.example.demo.service.ChatService;

import reactor.core.publisher.Flux;


@Controller
@RequestMapping("/chat")
public class ChatController {

@Autowired
private ChatService chatService;

    @GetMapping
    public ResponseEntity<String> generateResponse(
        @RequestParam(value = "inputText", required = true) String inputText)
    {
           String responseText = chatService.generateResponse(inputText);

           return ResponseEntity.ok(responseText);
    }


     @GetMapping("/stream")
    public Flux<String> streamResponse(
        @RequestParam(value = "inputText", required = true) String inputText)
    {
           Flux<String> response = chatService.streamResponse(inputText);

           return response;
    }

    @GetMapping("/cricketbot")
    public ResponseEntity<CricketResponse> getCricketRespnse(
        @RequestParam("inputText") String inputText
    ) throws IOException{
        CricketResponse cricketResponse = chatService.generateCricketResponse(inputText);
        return ResponseEntity.ok(cricketResponse);
    }

    public ResponseEntity<List<String>> generateImages(
        @RequestParam("imageDescription") String imageDesc,
        @RequestParam(value= "numberOfImages", required=false, defaultValue="2") int numbers
    ) throws IOException{
        return ResponseEntity.ok(chatService.generateImages(imageDesc,numbers));
    }
   
} 


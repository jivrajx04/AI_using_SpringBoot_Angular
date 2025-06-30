package com.example.demo.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.chat.model.StreamingChatModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import com.example.demo.payload.CricketResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.ai.chat.prompt.Prompt;
import org.springframework.ai.image.ImageModel;
import org.springframework.ai.image.ImagePrompt;
import org.springframework.ai.image.ImageResponse;
import org.springframework.ai.openai.OpenAiImageOptions;

import com.fasterxml.jackson.core.JsonProcessingException;

import reactor.core.publisher.Flux;

@Service
public class ChatService {

   @Autowired
   private ChatModel chatModel;

   @Autowired
   private StreamingChatModel streamingChatModel;

   @Autowired
   private ImageModel imageModel;

   public String generateResponse(String inputText) {
      String response = chatModel.call(inputText);
      return response;
   }

   public Flux<String> streamResponse(String inputText) {
      Flux<String> response = streamingChatModel.stream(inputText);
      return response;
   }

  public CricketResponse generateCricketResponse(String inputText) throws JsonProcessingException, IOException { // Add IOException
    String template = this.loadPromptTemplate("prompts/cricket_bot.txt"); // Assuming you have a template for cricket
    String promptString = this.putValuesInPromptTemplate(template, Map.of("query", inputText)); // Use inputText in the template

    ChatResponse cricketResponse = chatModel.call(new Prompt(promptString));

    String responseString = cricketResponse.getResult().getOutput().toString();
    ObjectMapper mapper = new ObjectMapper();
    CricketResponse cricketResponse1 = mapper.readValue(responseString, CricketResponse.class);
    return cricketResponse1;
}

   public List<String> generateImages(String imageDesc, int numbers) throws IOException{
     String template = this.loadPromptTemplate("prompts/image_bot.txt");
     String promptString = this.putValuesInPromptTemplate(template, Map.of(
     
      "description", imageDesc
      
     ));

     ImageResponse imageResponse = imageModel.call(new ImagePrompt(
      promptString, OpenAiImageOptions.builder()
      .model("dall-e-2")
      .N(numbers)
      .height(512)
      .width(512)
      .quality("standard")
      .build())
      
      );
     List<String> imageUrls = imageResponse.getResults().stream().map(generation -> generation.getOutput().getUrl()).collect(Collectors.toList());
     return imageUrls;
   }

   // load prompt from classpath(prompts/cricket_bot.txt)
   public String loadPromptTemplate(String fileName) throws IOException{
     Path filePath = new ClassPathResource(fileName).getFile().toPath();
     return Files.readString(filePath);
   }

   public String putValuesInPromptTemplate(String template, Map<String, String> variables){
      for (Map.Entry<String, String>entry : variables.entrySet()) {
          template = template.replace("{" + entry.getKey() + "}", entry.getValue());
      }
      return template;
   }
} 

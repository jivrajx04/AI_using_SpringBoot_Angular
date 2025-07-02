# Full-Stack AI Application Demo

This repository hosts a comprehensive full-stack application demonstrating various AI capabilities through integration with OpenAI's models. It features a robust Spring Boot backend for AI processing and an interactive Angular frontend for user interaction.

## Project Structure

-   `demo/`: Contains the Spring Boot backend application. This handles all AI model integrations and exposes the REST API endpoints.
-   `ai_frontend/`: Contains the Angular frontend application. This provides the user interface for interacting with the backend AI services.

## Features

This project exposes several REST API endpoints from the backend and integrates them into the frontend:

* **Basic Chat:** Engage in standard text-based conversations with an OpenAI language model.
* **Streaming Chat:** Experience real-time AI responses, where text is streamed word-by-word, similar to the ChatGPT web interface.
* **Cricket Bot (Structured Response):** Ask cricket-related questions and receive answers in a predefined JSON format, showcasing structured data extraction capabilities. Includes basic error handling for non-cricket queries.
* **Image Generation:** Generate unique images based on text descriptions using OpenAI's DALL-E model.

## Technologies Used

* **Java 17+**
* **Spring Boot 3.x:** Framework for building robust, stand-alone, production-grade Spring applications.
* **Spring AI:** Spring's official project for developing AI-powered applications, providing abstractions over various AI models.
* **OpenAI API:** Integration with OpenAI's Chat Completion and Image Generation APIs (e.g., GPT-3.5, GPT-4, DALL-E).
* **Lombok:** A library that reduces boilerplate code for Java classes (e.g., getters, setters, constructors).
* **Jackson (ObjectMapper):** For JSON processing and converting AI responses into Java objects.
* **Project Reactor (Flux):** For handling reactive streams, particularly for the streaming chat feature.
* **Angular:** A platform and framework for building single-page client applications using HTML and TypeScript.
* **TypeScript:** A superset of JavaScript that compiles to plain JavaScript, enhancing code quality and maintainability.
* **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.

## Prerequisites

Before running this application, ensure you have:

* **Java Development Kit (JDK) 17 or higher** installed.
* **Maven** (if using Maven for dependency management) or **Gradle** (if using Gradle).
* **Node.js**: Version 18.x or higher (includes npm).
* **Angular CLI**: Install globally using `npm install -g @angular/cli`.
* **An OpenAI API Key:** You will need to obtain this from the [OpenAI Platform](https://platform.openai.com/api-keys). Remember that API usage is typically paid.

## Getting Started

Follow these steps to set up and run both the backend and frontend applications locally.

### 1. Clone the Repository

```bash
git clone [https://github.com/jivrajx04/AI_using_SpringBoot_Angular.git](https://github.com/jivrajx04/AI_using_SpringBoot_Angular.git)
cd AI_using_SpringBoot_Angular

2. Backend Setup and Run
Navigate into the demo directory and start the Spring Boot application.

Bash

cd demo
Configure OpenAI API Key:

Create a file named application.properties in the src/main/resources/ directory if it doesn't already exist.

Add your OpenAI API key to this file:

Properties

spring.ai.openai.api-key=YOUR_OPENAI_API_KEY_HERE
Important: For security, ensure application.properties is listed in your .gitignore file if you're making this repository public, to prevent your key from being pushed to GitHub. Alternatively, use an environment variable (e.g., OPENAI_API_KEY) which Spring AI also supports.

Build the Project:

Bash

mvn clean install # If using Maven
# OR ./gradlew build # If using Gradle
Run the Application:

Bash

java -jar target/demo-0.0.1-SNAPSHOT.jar # Adjust JAR name if different
# OR mvn spring-boot:run # If using Maven
# OR ./gradlew bootRun # If using Gradle
The backend will start on port 8080 by default.

3. Frontend Setup and Run
Open a new terminal window, navigate to the ai_frontend directory, install dependencies, and start the Angular development server.

Bash

cd ai_frontend
npm install
ng serve --open
The frontend will typically open in your browser at http://localhost:4200.

Backend API Endpoints
All endpoints are GET requests under the /chat base path.

1. Basic Chat
URL: http://localhost:8080/chat?inputText={your_question}

Method: GET

Parameters:

inputText (required): The text query for the AI.

Example:
http://localhost:8080/chat?inputText=What is the capital of France?

Response: Plain text string from the AI.

2. Streaming Chat
URL: http://localhost:8080/chat/stream?inputText={your_long_question}

Method: GET

Parameters:

inputText (required): The text query for the AI, ideally something that generates a longer response.

Example:
http://localhost:8080/chat/stream?inputText=Tell me a very long and detailed story about a space explorer.

Response: A stream of text chunks (Server-Sent Events) from the AI. You'll need a client that can handle streaming for the full effect.

3. Cricket Bot (Structured Response)
URL: http://localhost:8080/chat/cricketbot?inputText={cricket_query}

Method: GET

Parameters:

inputText (required): A question related to cricket.

Example:
http://localhost:8080/chat/cricketbot?inputText=Who won the 2011 Cricket World Cup?
http://localhost:8080/chat/cricketbot?inputText=What is the weather like today?

Response: A JSON object with a content field.

JSON

{
  "content": "India won the 2011 Cricket World Cup."
}
or if not cricket related:

JSON

{
  "content": "Ha ha! That's not a cricket question. But I can tell you that a cricket ball would probably get very wet in the rain!"
}
4. Image Generation
URL: http://localhost:8080/chat/images?imageDescription={description}&numberOfImages={count}

Method: GET

Parameters:

imageDescription (required): A detailed description of the image to generate.

numberOfImages (optional): The number of images to generate (default is 2).

Example:
http://localhost:8080/chat/images?imageDescription=a red car driving through a futuristic city at night&numberOfImages=1

Response: A JSON array of image URLs.

JSON

[
  "[https://oaidalleapiprodscus.blob.core.windows.net/private/org-abc/image-xyz.png?se=](https://oaidalleapiprodscus.blob.core.windows.net/private/org-abc/image-xyz.png?se=)...",
  "[https://oaidalleapiprodscus.blob.core.windows.net/private/org-abc/image-uvw.png?se=](https://oaidalleapiprodscus.blob.core.windows.net/private/org-abc/image-uvw.png?se=)..."
]
Backend Project Structure (Key Files)
src/main/java/com/example/demo/controller/ChatController.java: Defines the REST API endpoints and handles incoming HTTP requests.

src/main/java/com/example/demo/service/ChatService.java: Contains the core logic for interacting with OpenAI's various AI models.

src/main/java/com/example/demo/payload/CricketResponse.java: A simple Java class (POJO) representing the expected JSON structure for cricket-related AI responses.

src/main/resources/application.properties: Configuration file for Spring Boot and your OpenAI API key.

src/main/resources/prompts/: Directory containing .txt files used as dynamic prompt templates for the AI models.

image_bot.txt: Template for image generation prompts.

cricket_bot.txt: Template for structured cricket query responses.

Contributing
Feel free to fork this repository, open issues, or submit pull requests.

License
This project is open-sourced under the MIT License. See the LICENSE file for more details.
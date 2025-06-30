# Spring AI Backend Demo

A robust Spring Boot backend application demonstrating various capabilities of Spring AI integration with OpenAI's models, including text chat, streaming responses, structured data extraction (Cricket Bot), and image generation.

## Features

This project exposes several REST API endpoints:

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

## Prerequisites

Before running this application, ensure you have:

* **Java Development Kit (JDK) 17 or higher** installed.
* **Maven** (if using Maven for dependency management) or **Gradle** (if using Gradle).
* **An OpenAI API Key:** You will need to obtain this from the [OpenAI Platform](https://platform.openai.com/api-keys). Remember that API usage is typically paid.

## Setup and Installation

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/YOUR_GITHUB_USERNAME/spring-ai-backend-demo.git](https://github.com/YOUR_GITHUB_USERNAME/spring-ai-backend-demo.git)
    cd spring-ai-backend-demo
    ```
    *(Replace `YOUR_GITHUB_USERNAME` and `spring-ai-backend-demo` with your actual GitHub details).*

2.  **Configure OpenAI API Key:**
    * Create a file named `application.properties` in the `src/main/resources/` directory if it doesn't already exist.
    * Add your OpenAI API key to this file:
        ```properties
        spring.ai.openai.api-key=YOUR_OPENAI_API_KEY_HERE
        ```
        **Important:** For security, ensure `application.properties` is listed in your `.gitignore` file if you're making this repository public, to prevent your key from being pushed to GitHub. Alternatively, use an environment variable (e.g., `OPENAI_API_KEY`) which Spring AI also supports.

3.  **Build the Project:**
    * If using Maven:
        ```bash
        mvn clean install
        ```
    * If using Gradle:
        ```bash
        ./gradlew build
        ```

4.  **Run the Application:**
    * From the command line (in the project root):
        ```bash
        java -jar target/demo-0.0.1-SNAPSHOT.jar # Adjust JAR name if different
        ```
    * Alternatively, run from your IDE (e.g., right-click `DemoApplication.java` and "Run").

    The application will start on port `8080` by default.

## API Endpoints

All endpoints are `GET` requests under the `/chat` base path.

### 1. Basic Chat
* **URL:** `http://localhost:8080/chat?inputText={your_question}`
* **Method:** `GET`
* **Parameters:**
    * `inputText` (required): The text query for the AI.
* **Example:**
    `http://localhost:8080/chat?inputText=What is the capital of France?`
* **Response:** Plain text string from the AI.

### 2. Streaming Chat
* **URL:** `http://localhost:8080/chat/stream?inputText={your_long_question}`
* **Method:** `GET`
* **Parameters:**
    * `inputText` (required): The text query for the AI, ideally something that generates a longer response.
* **Example:**
    `http://localhost:8080/chat/stream?inputText=Tell me a very long and detailed story about a space explorer.`
* **Response:** A stream of text chunks (Server-Sent Events) from the AI. You'll need a client that can handle streaming for the full effect.

### 3. Cricket Bot (Structured Response)
* **URL:** `http://localhost:8080/chat/cricketbot?inputText={cricket_query}`
* **Method:** `GET`
* **Parameters:**
    * `inputText` (required): A question related to cricket.
* **Example:**
    `http://localhost:8080/chat/cricketbot?inputText=Who won the 2011 Cricket World Cup?`
    `http://localhost:8080/chat/cricketbot?inputText=What is the weather like today?`
* **Response:** A JSON object with a `content` field.
    ```json
    {
      "content": "India won the 2011 Cricket World Cup."
    }
    ```
    or if not cricket related:
    ```json
    {
      "content": "Ha ha! That's not a cricket question. But I can tell you that a cricket ball would probably get very wet in the rain!"
    }
    ```

### 4. Image Generation
* **URL:** `http://localhost:8080/chat/images?imageDescription={description}&numberOfImages={count}`
* **Method:** `GET`
* **Parameters:**
    * `imageDescription` (required): A detailed description of the image to generate.
    * `numberOfImages` (optional): The number of images to generate (default is 2).
* **Example:**
    `http://localhost:8080/chat/images?imageDescription=a red car driving through a futuristic city at night&numberOfImages=1`
* **Response:** A JSON array of image URLs.
    ```json
    [
      "[https://oaidalleapiprodscus.blob.core.windows.net/private/org-abc/image-xyz.png?se=](https://oaidalleapiprodscus.blob.core.windows.net/private/org-abc/image-xyz.png?se=)...",
      "[https://oaidalleapiprodscus.blob.core.windows.net/private/org-abc/image-uvw.png?se=](https://oaidalleapiprodscus.blob.core.windows.net/private/org-abc/image-uvw.png?se=)..."
    ]
    ```

## Project Structure (Key Files)

* `src/main/java/com/example/demo/controller/ChatController.java`: Defines the REST API endpoints and handles incoming HTTP requests.
* `src/main/java/com/example/demo/service/ChatService.java`: Contains the core logic for interacting with OpenAI's various AI models.
* `src/main/java/com/example/demo/payload/CricketResponse.java`: A simple Java class (POJO) representing the expected JSON structure for cricket-related AI responses.
* `src/main/resources/application.properties`: Configuration file for Spring Boot and your OpenAI API key.
* `src/main/resources/prompts/`: Directory containing `.txt` files used as dynamic prompt templates for the AI models.
    * `image_bot.txt`: Template for image generation prompts.
    * `cricket_bot.txt`: Template for structured cricket query responses.

## Contributing

Feel free to fork this repository, open issues, or submit pull requests.

## License

This project is open-sourced under the MIT License. See the `LICENSE` file for more details.
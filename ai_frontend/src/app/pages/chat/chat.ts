import { Component, NgModule, signal } from '@angular/core';
import { Api } from '../../services/api';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Message } from '../../models/message';

@Component({
  selector: 'app-chat',
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.css'
})
export class Chat {
//injected API service to make API calls
  constructor(private apiService:Api){}

  inputTextPrompt:string = '';
  messagesArray:Message[]=[];
  loadingChat = false;

  askButtonClicked() {
    if(this.inputTextPrompt.trim()==''){
      return;
    }
    this.messagesArray.push(new Message(this.inputTextPrompt, true));

    this.loadingChat=true;

    this.apiService.getRandomResponse(this.inputTextPrompt).subscribe({
      next: (response: string) => {
        // handle the response here
        this.messagesArray.push(new Message(response, false));
        this.inputTextPrompt = ''; 
        this.loadingChat = false;
      },
      error: (err: any) => {
        console.log(err);
        this.loadingChat = false;
        this.messagesArray.push(new Message("Sorry, something went wrong please try again.", false));
      }
    });
  }
}

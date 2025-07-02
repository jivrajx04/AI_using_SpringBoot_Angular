import { Component } from '@angular/core';
import { Message } from '../../models/message';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';
import { CricketResponse } from '../../models/cricketResponse';

@Component({
  selector: 'app-cricket',
  imports: [CommonModule,FormsModule],
  templateUrl: './cricket.html',
  styleUrl: './cricket.css'
})
export class Cricket {

  inputTextPrompt:string = '';
    messagesArray:Message[]=[
    ];
    loadingChat = false;

    constructor(private apiService: Api){}


    askButtonClicked(){

      if(this.inputTextPrompt.trim()===''){
        return;
      }
      this.messagesArray.push(new Message(this.inputTextPrompt,true));
      this.loadingChat=true;

      this.apiService.getCricketResponse(this.inputTextPrompt).subscribe({
        next: (response)=>{
          this.messagesArray.push(new Message(response.content, false));
          this.inputTextPrompt='';
          this.loadingChat=false;
        },
        error: (err: any)=>{
          console.log(err);
          this.loadingChat=false;
          this.messagesArray.push(new Message("Sorry, something went wrong please try again.", false));
          
        }
      })
    }

}

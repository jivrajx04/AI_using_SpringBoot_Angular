import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';

@Component({
  selector: 'app-image',
  imports: [CommonModule,FormsModule],
  templateUrl: './image.html',
  styleUrl: './image.css'
})
export class Image {

 inputTextPrompt:string = '';
    messagesArray:string[]=[
    ];
    loadingChat = false;

    constructor(private apiService: Api) {}

    askButtonClicked(){
      if(this.inputTextPrompt.trim()===''){
        return;
      }
      this.loadingChat=true;
      this.apiService.getImageResponse(this.inputTextPrompt).subscribe({
        next: (response)=>{
          this.messagesArray.push(...response);
          this.loadingChat=false;
          this.inputTextPrompt='';
        },
        error:(err:any)=>{
          console.log(err);
          this.loadingChat=false;
          this.messagesArray.push("Sorry, something went wrong please try again.");
          
        }

      })
    }

}

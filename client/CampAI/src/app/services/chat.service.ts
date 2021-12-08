import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export interface iChat {
  sender: string;
  text: string;
  sentOn: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chats: BehaviorSubject<iChat[]> = new BehaviorSubject([] as iChat[]);

  constructor(
    private http: HttpClient
  ) {}

  addNewChat(input: string) {
    const newChat = this.generateNewChat(input);

    this.chats.pipe(take(1)).subscribe((allChats) => {
      allChats.push(newChat);
      this.chats.next(allChats);
    });
  }

  addNewResponse(bot:iChat) {
    this.chats.pipe(take(1)).subscribe((allChats) => {
      setTimeout(() => {
        allChats.push(bot);
      }, 1200);
      this.chats.next(allChats);
    });
  }

  generateNewChat(input: string) {
    const currentTime = new Date().getTime();
    const chat: iChat = {
      sender: 'User',
      text: input,
      sentOn: new Date(currentTime),
    };
    return chat;
  }

  // Dialogflow ----------------------------------------------------------------
  generateAIResponse(query: string) {
    const botResponse:any =  this.http.post(`${environment.serverUrl}/chat/ai`, {
      query
    }).subscribe(res =>
      this.pushAIResponse(res)
    );
  }

  pushAIResponse(response: any) {
    const currentTime = new Date().getTime();
    let res: string = response.BotResponse;

    const botChat: iChat = {
      sender: 'Bot',
      text: res,
      sentOn: new Date(currentTime),
    };
    return this.addNewResponse(botChat);
  }
}

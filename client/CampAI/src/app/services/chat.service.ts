import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

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

  constructor() {}

  addNewChat(input: string) {
    const newChat = this.generateNewChat(input);

    this.chats.pipe(take(1)).subscribe((allChats) => {
      allChats.push(newChat);
      this.chats.next(allChats);
    });
  }

  addNewResponse() {
    const newResponse = this.generateBotResponse();

    this.chats.pipe(take(1)).subscribe((allChats) => {
      setTimeout(() => {
        allChats.push(newResponse);
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

  generateBotResponse() {
    const currentTime = new Date().getTime();

    var responses = [
      'I see.',
      'How are you doing?',
      'Thats nice!',
      '🥺👉👈',
      '🍆',
      'Wyd tonight?',
      'You are so cool, no way!',
      'Im sure you gonna have a good grade!',
      'Ok.',
      'Whats your snap? 👻',
      'Mind if I come over?',
      'Whats 9+10?',
      'Why did the chicken crossed the road?',
      'So is Fred getting a good grade? 😉'
    ];
    let response = responses[Math.floor(Math.random() * responses.length)];

    const botChat: iChat = {
      sender: 'Bot',
      text: response,
      sentOn: new Date(currentTime),
    };
    return botChat;
  }
}

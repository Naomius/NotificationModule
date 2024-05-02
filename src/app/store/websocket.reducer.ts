import { createReducer, on } from '@ngrx/store';
import {
    clearAllMessages,
    connectWebSocket,
    disconnectWebSocket,
    removeMessageByIndex,
    sendMessage
} from "./websocket.actions";
import {Message} from "../base/main/interfaces/message";

export interface WebSocketState {
    connected: boolean;
    messages: Message[];
}

export const initialState: WebSocketState = {
    connected: false,
    messages: []
};



export const websocketReducer = createReducer(
    initialState,
    on(connectWebSocket, state => ({
        ...state,
        connected: true })),
    on(disconnectWebSocket, state => ({
        ...state,
        connected: false })),
    on(sendMessage, (state, { message }) => ({
        ...state,
        messages: [...state.messages, message] })),
    on(removeMessageByIndex, (state, { index }) => ({
        ...state,
        messages: [...state.messages.slice(0, index), ...state.messages.slice(index + 1)]
    })),

    on(clearAllMessages, state => ({
    ...state,
    messages: []  // Очищаем список сообщений
    })),
);

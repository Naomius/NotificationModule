import {createFeatureSelector, createSelector} from '@ngrx/store';
import { WebSocketState } from './websocket.reducer';

export const selectWebSocketFeature = createFeatureSelector<WebSocketState>('webSocket');

export const selectMessages = createSelector(
    selectWebSocketFeature,
    (webSocketState: WebSocketState) => webSocketState ? webSocketState.messages : []
);

export const selectLastMessage = createSelector(
    selectWebSocketFeature,
    (messages) => messages.messages[messages.messages.length - 1]
)

export const selectMessagesCount = createSelector(
    selectWebSocketFeature,
    (messages) => messages.messages.length
)

export const selectAllMessages = createSelector(
    selectWebSocketFeature,
    (state: WebSocketState) => state.messages
);

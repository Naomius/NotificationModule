import { createAction, props } from '@ngrx/store';
import {Message} from "../base/main/interfaces/message";

export const connectWebSocket = createAction(
    '[WebSocket] Connect',
    props<{url: string}>()
);
export const disconnectWebSocket = createAction(
    '[WebSocket] Disconnect'
);
export const sendMessage = createAction(
    '[WebSocket] Send Message',
    props<{ message: Message }>()
);
export const messageReceived = createAction(
    '[WebSocket] Message Received',
    props<{ message: Message }>()
);

export const removeMessageByIndex = createAction(
    '[WebSocket] Remove Message By Index', props<{index: number}>()
);

export const clearAllMessages = createAction(
    '[Message] Clear All Messages'
)

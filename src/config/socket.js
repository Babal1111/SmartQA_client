import { serverEndpoint } from "./appConfig"
import {io} from 'socket.io-client';

const socket = io(serverEndpoint);
// every time a user come in room page, it makes newconnection
export default socket;
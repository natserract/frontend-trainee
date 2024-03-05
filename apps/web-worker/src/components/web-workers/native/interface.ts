interface MessageEventData<T = any> {
  action: string;
  port: MessagePort;
  payload?: T;
}

export interface SendNotificationProps {
  type: string;
  userId: string;
  message: string;
}

export interface SendNotification {
  execute(props: SendNotificationProps): Promise<void>;
}

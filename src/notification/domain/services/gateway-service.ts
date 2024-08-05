export interface GatewayServiceProps {
  type: string;
  userId: string;
  message: string;
}

export interface GatewayService {
  send(props: GatewayServiceProps): Promise<void>;
}

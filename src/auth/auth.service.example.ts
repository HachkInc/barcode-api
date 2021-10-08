import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
// KEYS
  private apiKeys: string[] = [
    "<Your access token 1 >",
    "<Your access token 2>"
  ];

  validateApiKey(apiKey: string) {
    return this.apiKeys.find(apiK => apiKey === apiK);
  }
}
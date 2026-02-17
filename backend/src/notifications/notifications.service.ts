import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  async sendOtp(phone: string | null, email: string | null, code: string) {
    await this.sendNotification(
      phone,
      email,
      `Your PiggyCapsule OTP is: ${code}`,
    );
    return true;
  }

  async sendNotification(
    phone: string | null,
    email: string | null,
    message: string,
  ) {
    if (phone) {
      this.logger.log(`[MOCK SMS] Sending to ${phone}: ${message}`);
    }
    if (email) {
      this.logger.log(`[MOCK EMAIL] Sending to ${email}: ${message}`);
    }
    await Promise.resolve();
    return true;
  }
}

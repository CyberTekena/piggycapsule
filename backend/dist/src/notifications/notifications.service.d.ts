export declare class NotificationsService {
    private readonly logger;
    sendOtp(phone: string | null, email: string | null, code: string): Promise<boolean>;
    sendNotification(phone: string | null, email: string | null, message: string): Promise<boolean>;
}

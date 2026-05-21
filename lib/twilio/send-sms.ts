import { twilioClient } from "./client";

interface SendSMSInput {
  to: string;
  body: string;
}
const ib= "+27837212432"
export async function sendSMS({
  to,
  body,
}: SendSMSInput) {
  try {
    console.log("Sending SMS to:", to);

    const message =
      await twilioClient.messages.create({
        body,

        to: ib,

        from:
          process.env
            .TWILIO_PHONE_NUMBER!,
      });

    console.log(
      "SMS SENT SUCCESSFULLY:",
      message.sid
    );

    return {
      success: true,
      sid: message.sid,
    };
  } catch (error) {
    console.error(
      "TWILIO ERROR:",
      error
    );

    console.error(error);

    return {
      success: false,
    };
  }
}
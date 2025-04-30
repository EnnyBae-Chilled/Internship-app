const carrierGateways = {
  att: "txt.att.net",
  verizon: "vtext.com",
  tmobile: "tmomail.net",
  sprint: "messaging.sprintpcs.com",
  googlefi: "msg.fi.google.com",
};

export function sendSMSToUser(user, message) {
  if (!user.phone || !user.carrier) {
    console.error("Missing phone number or carrier for user:", user);
    return;
  }

  const gateway = carrierGateways[user.carrier] || carrierGateways.att;
  const email = `${user.phone}@${gateway}`;

  // In a real app, you would send this via your backend email service
  console.log(`Sending to ${email}: ${message}`);
  alert(
    `SMS notification would be sent to ${user.name} at ${user.phone}\n\nMessage: ${message}`
  );

  // For actual implementation, you would:
  // 1. Set up a backend email service (SendGrid, Mailgun, etc.)
  // 2. Call an API endpoint to send the email
  // 3. The email would be sent to the phone's email-to-SMS gateway
}

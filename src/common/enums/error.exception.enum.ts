export enum ExceptionsEnum {
  INVALID_USER = 'Invalid user email',
  INVALID_PASSWORD = 'Invalid password',
  INCORRECT_OTP = 'Incorrect otp, please add correct one',
  OTP_NOT_FOUND = 'Otp not found, please resend otp',
  OTP_EXPIRED = 'Otp has been expired, please resend otp',
  SESSION_EXPIRED = 'Session has been expired',
  RESET_PASS_MAIL_SENDED_FAIL = 'Email has not been sent for reset password',
  EXPIRED_RESET_PASS_LINK = `The link you're trying to access is either expired or doesn't exist. Please check if you entered the correct URL or start over the recovery process again to recover your Swift CRM account.`,
}

export enum SuccessMsgEnum {
  PASSWORD_UPDATE_SUCCESS = 'Password updated successfully',
  USER_LOGGEDIN_SUCCESS = 'User loggedin successfully',
  REFRESH_TOKEN_SUCCESS = 'Refresh token successfully',
  USER_LOGGEDOUT_SUCCESS = 'User logged out successfully',
  USER_CREATED_SUCCESS = 'User created successfully',
  OTP_MATCHED_SUCCESS = 'Otp matched successfully',
  OTP_SEND_TO_EMAIL_SUCCESS = 'Otp has been sent successfully on your Email',
  RESET_PASS_MAIL_SENDED_SUCCESS = 'Email has been sent successfully for reset password',
  RESET_PASS_LINK_VERIFIED = 'Your link is verified, you can reset your password',
}

export const LocalStorage = {
  getItem: (key: string) => {
    return localStorage.getItem(`${key}`);
  },

  setItem: (key: string, value: string) => {
    localStorage.setItem(`${key}`, `${value}`);
  },

  removeItem: (key: string) => {
    localStorage.removeItem(`${key}`);
  },

  doesExists: (key: string): boolean => {
    return localStorage.getItem(`${key}`) ? true : false;
  },

  removeRedirectInfo: () => {
    console.log("remvoing local info");
    localStorage.removeItem("redirect_user_uri");
  },
  setRedirectURI: (url: string, email?: string) => {
    console.log(`setting redirect uir`);
    localStorage.setItem("redirect_user_uri", JSON.stringify({ url, email }));
  },

  /**
   * Store the requested time when OTP is dispatched
   * @param action
   * @param user_id
   * @param input
   */
  doStoreOTPInformation: (
    action: "phone" | "email",
    input: string,
    user_id?: string
  ) => {
    const key: string = `otp_${action}_dispatched_information`;
    const info = {
      otpDispatchedTime: new Date(),
      ...(user_id && { user_id }),
      input,
    };
    if (key in localStorage) {
      localStorage.removeItem(key);
    }
    localStorage.setItem(`${key}`, JSON.stringify(info));
  },

  /**
   * Check if OTP exists in last 3 minutes i.e OTP expiration time for twilio is 10 minutes
   * @param action
   * @param input
   * @returns should return false if there is no OTP
   */
  doVerifyOTPInformation: (
    action: "phone" | "email",
    input: string,
    user: string,
    auth: boolean = true
  ): { expired: boolean; message?: string } => {
    const key: string = `otp_${action}_dispatched_information`;
    const info = localStorage.getItem(`${key}`);
    console.log(`info received ${info}`);
    if (!info) return { expired: false }; //usually the first attempt
    if (info) {
      const meta = JSON.parse(info);
      if (auth) {
        if (!meta.user_id) {
          localStorage.removeItem(key);
          return {
            expired: false,
          };
        }
      }

      if (!meta.otpDispatchedTime || !meta.input) {
        localStorage.removeItem(key);
        return {
          expired: false,
        };
      }

      const userId = meta.user_id;
      if (auth) {
        if (userId !== user) {
          localStorage.removeItem(key);
          return {
            expired: false,
          };
        }
      }

      console.log(`meta ${JSON.stringify(meta)}`);
      /* if request phone/email not same as current email/phone */
      const previous_input = meta.input;
      if (previous_input !== input) {
        localStorage.removeItem(key);
        return {
          expired: false,
        };
      }

      /* if time difference is more than 8 minutes */

      const otpDispatchedTime = new Date(meta.otpDispatchedTime);
      console.log(`otp dispatched at ${otpDispatchedTime}`);
      const currentTime = new Date();
      console.log(`current at ${currentTime}`);
      const difference =
        Math.floor(Math.abs(+currentTime - +otpDispatchedTime) / (1000 * 60)) %
        60;

      /* if time differnce exceeds 5 minutes */
      if (difference >= 3) {
        localStorage.removeItem(key);
        return {
          expired: false,
        };
      }
      return {
        expired: true,
        message: `You can send new OTP in ${3 - difference} minutes`,
      };
    }
    return { expired: false };
  },

  /**
   * phone 03020383
   * timestamp 123452
   * source - phone
   * user_id 33
   */
};

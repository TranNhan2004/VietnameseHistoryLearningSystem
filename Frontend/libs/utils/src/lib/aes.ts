import * as CryptoTS from 'crypto-ts';
import {
  ADMIN_ACCESS_TOKEN_COOKIE_NAME,
  ADMIN_INFO_COOKIE_NAME,
  LEARNER_ACCESS_TOKEN_COOKIE_NAME,
  LEARNER_INFO_COOKIE_NAME,
} from '@frontend/constants';

export class AESCrypto {
  private static readonly SECRET_KEY = CryptoTS.SHA256(
    CryptoTS.enc.Utf8.parse(ADMIN_ACCESS_TOKEN_COOKIE_NAME)
      .clone()
      .concat(CryptoTS.enc.Utf8.parse(LEARNER_ACCESS_TOKEN_COOKIE_NAME))
      .concat(CryptoTS.enc.Utf8.parse(ADMIN_INFO_COOKIE_NAME))
      .concat(CryptoTS.enc.Utf8.parse(LEARNER_INFO_COOKIE_NAME))
  );

  static encypt(data: string) {
    return CryptoTS.AES.encrypt(data, AESCrypto.SECRET_KEY).toString();
  }

  static decrypt(ciphertext: string) {
    const bytes = CryptoTS.AES.decrypt(ciphertext, AESCrypto.SECRET_KEY);
    return bytes.toString(CryptoTS.enc.Utf8);
  }
}

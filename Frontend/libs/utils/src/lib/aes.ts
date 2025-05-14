import * as CryptoTS from 'crypto-ts';
import {
  ADMIN_ACCESS_TOKEN_CKNAME,
  ADMIN_INFO_CKNAME,
  LEARNER_ACCESS_TOKEN_CKNAME,
  LEARNER_INFO_CKNAME,
} from '@frontend/constants';

export class AESCrypto {
  private static readonly SECRET_KEY = CryptoTS.SHA256(
    CryptoTS.enc.Utf8.parse(ADMIN_ACCESS_TOKEN_CKNAME)
      .clone()
      .concat(CryptoTS.enc.Utf8.parse(LEARNER_ACCESS_TOKEN_CKNAME))
      .concat(CryptoTS.enc.Utf8.parse(ADMIN_INFO_CKNAME))
      .concat(CryptoTS.enc.Utf8.parse(LEARNER_INFO_CKNAME))
  );

  static encypt(data: string) {
    return CryptoTS.AES.encrypt(data, AESCrypto.SECRET_KEY).toString();
  }

  static decrypt(ciphertext: string) {
    const bytes = CryptoTS.AES.decrypt(ciphertext, AESCrypto.SECRET_KEY);
    return bytes.toString(CryptoTS.enc.Utf8);
  }
}

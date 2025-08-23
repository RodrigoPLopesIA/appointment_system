import { sign, verify } from "jsonwebtoken";

export default abstract class JWTService {

  private static readonly SECRET = process.env.JWT_SECRET || "default_secret";
  private static readonly EXPIRES_IN = "1h";


  public static generateToken(payload: object): string {
    try {
      return sign(payload, this.SECRET, { expiresIn: this.EXPIRES_IN });
    } catch (error) {
      throw new Error(`Error generating token: ${error}`);
    }
  }

  public static verifyToken<T = any>(token: string): T {
    try {
      return verify(token, this.SECRET) as T;
    } catch (error) {
      throw new Error(`Invalid or expired token: ${error}`);
    }
  }
}

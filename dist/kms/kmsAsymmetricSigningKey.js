"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KMSAsymmetricSigningKey = void 0;
const client_kms_1 = require("@aws-sdk/client-kms");
const constants_1 = require("../constants/constants");
const utils_1 = require("../utils");
/**
 * Asymmetric signing key using AWS KMS
 */
class KMSAsymmetricSigningKey {
    /**
     * Creates an instance of KMSAsymmetricSigningKey
     *
     * @param {string} keyId - KMS key ID to use for signing.
     * @param {KMSClient} kmsClient - KMS client instance to interact with AWS KMS
     */
    constructor(keyId, kmsClient) {
        (0, utils_1.validateKeyFormat)(keyId);
        this.keyId = keyId;
        this.kmsClient = kmsClient;
    }
    /**
     * Signs the provided data using KMS Sign Command
     *
     * @param {string} signingAlgorithm - The algorithm to use for signing
     * @param {Buffer} dataToSign - The data to sign
     * @returns {Promise<KMSSigningResult>} - Promise resolving to object with the signature result
     */
    async sign(signingAlgorithm, dataToSign) {
        const digestToSign = await (0, utils_1.digestData)(signingAlgorithm, dataToSign);
        const input = {
            KeyId: this.keyId,
            Message: digestToSign,
            MessageType: constants_1.DIGEST_MESSAGE_TYPE,
            SigningAlgorithm: signingAlgorithm,
        };
        const command = new client_kms_1.SignCommand(input);
        try {
            const response = await this.kmsClient.send(command);
            const signingResult = {
                mac: response.Signature,
            };
            return signingResult;
        }
        catch (error) {
            console.error('Error while signing from KMS:', error);
            return Promise.reject((0, utils_1.processKMSError)(error));
        }
    }
    /**
     * Verifies the signature of the provided data using KMS Verify Command
     *
     * @param {string} signingAlgorithm - The algorithm used to generate the signature
     * @param {Buffer} dataToVerify - The original data that was signed
     * @param {Buffer} signature - The signature to verify
     * @returns {Promise<KMSVerificationResult>} - Promise resolving to object with the verification result
     */
    async verify(signingAlgorithm, dataToVerify, signature) {
        const digestToVerify = await (0, utils_1.digestData)(signingAlgorithm, dataToVerify);
        const input = {
            KeyId: this.keyId,
            Message: digestToVerify,
            MessageType: constants_1.DIGEST_MESSAGE_TYPE,
            Signature: signature,
            SigningAlgorithm: signingAlgorithm,
        };
        const command = new client_kms_1.VerifyCommand(input);
        try {
            const response = await this.kmsClient.send(command);
            const verificationResult = {
                mac: response.SignatureValid,
            };
            return verificationResult;
        }
        catch (error) {
            console.error('Error while verifying from KMS:', error);
            return Promise.reject((0, utils_1.processKMSError)(error));
        }
    }
}
exports.KMSAsymmetricSigningKey = KMSAsymmetricSigningKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia21zQXN5bW1ldHJpY1NpZ25pbmdLZXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMva21zL2ttc0FzeW1tZXRyaWNTaWduaW5nS2V5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG9EQVE2QjtBQUM3QixzREFBNkQ7QUFDN0Qsb0NBQTBFO0FBSTFFOztHQUVHO0FBQ0gsTUFBYSx1QkFBdUI7SUFJbEM7Ozs7O09BS0c7SUFDSCxZQUFZLEtBQWEsRUFBRSxTQUFvQjtRQUM3QyxJQUFBLHlCQUFpQixFQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxLQUFLLENBQUMsSUFBSSxDQUNSLGdCQUF3QixFQUN4QixVQUFrQjtRQUVsQixNQUFNLFlBQVksR0FBRyxNQUFNLElBQUEsa0JBQVUsRUFBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVwRSxNQUFNLEtBQUssR0FBcUI7WUFDOUIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO1lBQ2pCLE9BQU8sRUFBRSxZQUFZO1lBQ3JCLFdBQVcsRUFBRSwrQkFBbUI7WUFDaEMsZ0JBQWdCLEVBQUUsZ0JBQWdCO1NBQ25DLENBQUM7UUFFRixNQUFNLE9BQU8sR0FBRyxJQUFJLHdCQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkMsSUFBSTtZQUNGLE1BQU0sUUFBUSxHQUFzQixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZFLE1BQU0sYUFBYSxHQUFxQjtnQkFDdEMsR0FBRyxFQUFFLFFBQVEsQ0FBQyxTQUFTO2FBQ3hCLENBQUM7WUFDRixPQUFPLGFBQWEsQ0FBQztTQUN0QjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQywrQkFBK0IsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN0RCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBQSx1QkFBZSxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDL0M7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILEtBQUssQ0FBQyxNQUFNLENBQ1YsZ0JBQXdCLEVBQ3hCLFlBQW9CLEVBQ3BCLFNBQWlCO1FBRWpCLE1BQU0sY0FBYyxHQUFHLE1BQU0sSUFBQSxrQkFBVSxFQUFDLGdCQUFnQixFQUFFLFlBQVksQ0FBQyxDQUFDO1FBRXhFLE1BQU0sS0FBSyxHQUF1QjtZQUNoQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsT0FBTyxFQUFFLGNBQWM7WUFDdkIsV0FBVyxFQUFFLCtCQUFtQjtZQUNoQyxTQUFTLEVBQUUsU0FBUztZQUNwQixnQkFBZ0IsRUFBRSxnQkFBZ0I7U0FDbkMsQ0FBQztRQUVGLE1BQU0sT0FBTyxHQUFHLElBQUksMEJBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN6QyxJQUFJO1lBQ0YsTUFBTSxRQUFRLEdBQXdCLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekUsTUFBTSxrQkFBa0IsR0FBMEI7Z0JBQ2hELEdBQUcsRUFBRSxRQUFRLENBQUMsY0FBYzthQUM3QixDQUFDO1lBQ0YsT0FBTyxrQkFBa0IsQ0FBQztTQUMzQjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ2QsT0FBTyxDQUFDLEtBQUssQ0FBQyxpQ0FBaUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN4RCxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBQSx1QkFBZSxFQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDL0M7SUFDSCxDQUFDO0NBQ0Y7QUFwRkQsMERBb0ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgS01TQ2xpZW50LFxuICBTaWduQ29tbWFuZE91dHB1dCxcbiAgU2lnbkNvbW1hbmQsXG4gIFNpZ25Db21tYW5kSW5wdXQsXG4gIFZlcmlmeUNvbW1hbmRJbnB1dCxcbiAgVmVyaWZ5Q29tbWFuZE91dHB1dCxcbiAgVmVyaWZ5Q29tbWFuZCxcbn0gZnJvbSAnQGF3cy1zZGsvY2xpZW50LWttcyc7XG5pbXBvcnQgeyBESUdFU1RfTUVTU0FHRV9UWVBFIH0gZnJvbSAnLi4vY29uc3RhbnRzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyB2YWxpZGF0ZUtleUZvcm1hdCwgZGlnZXN0RGF0YSwgcHJvY2Vzc0tNU0Vycm9yIH0gZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgS01TU2lnbmluZ1Jlc3VsdCB9IGZyb20gJy4vbW9kZWxzL2ttc1NpZ25pbmdSZXN1bHQnO1xuaW1wb3J0IHsgS01TVmVyaWZpY2F0aW9uUmVzdWx0IH0gZnJvbSAnLi9tb2RlbHMva21zVmVyaWZpY2F0aW9uUmVzdWx0JztcblxuLyoqXG4gKiBBc3ltbWV0cmljIHNpZ25pbmcga2V5IHVzaW5nIEFXUyBLTVNcbiAqL1xuZXhwb3J0IGNsYXNzIEtNU0FzeW1tZXRyaWNTaWduaW5nS2V5IHtcbiAga2V5SWQ6IHN0cmluZztcbiAga21zQ2xpZW50OiBLTVNDbGllbnQ7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgS01TQXN5bW1ldHJpY1NpZ25pbmdLZXlcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGtleUlkIC0gS01TIGtleSBJRCB0byB1c2UgZm9yIHNpZ25pbmcuXG4gICAqIEBwYXJhbSB7S01TQ2xpZW50fSBrbXNDbGllbnQgLSBLTVMgY2xpZW50IGluc3RhbmNlIHRvIGludGVyYWN0IHdpdGggQVdTIEtNU1xuICAgKi9cbiAgY29uc3RydWN0b3Ioa2V5SWQ6IHN0cmluZywga21zQ2xpZW50OiBLTVNDbGllbnQpIHtcbiAgICB2YWxpZGF0ZUtleUZvcm1hdChrZXlJZCk7XG4gICAgdGhpcy5rZXlJZCA9IGtleUlkO1xuICAgIHRoaXMua21zQ2xpZW50ID0ga21zQ2xpZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIFNpZ25zIHRoZSBwcm92aWRlZCBkYXRhIHVzaW5nIEtNUyBTaWduIENvbW1hbmRcbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHNpZ25pbmdBbGdvcml0aG0gLSBUaGUgYWxnb3JpdGhtIHRvIHVzZSBmb3Igc2lnbmluZ1xuICAgKiBAcGFyYW0ge0J1ZmZlcn0gZGF0YVRvU2lnbiAtIFRoZSBkYXRhIHRvIHNpZ25cbiAgICogQHJldHVybnMge1Byb21pc2U8S01TU2lnbmluZ1Jlc3VsdD59IC0gUHJvbWlzZSByZXNvbHZpbmcgdG8gb2JqZWN0IHdpdGggdGhlIHNpZ25hdHVyZSByZXN1bHRcbiAgICovXG4gIGFzeW5jIHNpZ24oXG4gICAgc2lnbmluZ0FsZ29yaXRobTogc3RyaW5nLFxuICAgIGRhdGFUb1NpZ246IEJ1ZmZlcixcbiAgKTogUHJvbWlzZTxLTVNTaWduaW5nUmVzdWx0PiB7XG4gICAgY29uc3QgZGlnZXN0VG9TaWduID0gYXdhaXQgZGlnZXN0RGF0YShzaWduaW5nQWxnb3JpdGhtLCBkYXRhVG9TaWduKTtcblxuICAgIGNvbnN0IGlucHV0OiBTaWduQ29tbWFuZElucHV0ID0ge1xuICAgICAgS2V5SWQ6IHRoaXMua2V5SWQsXG4gICAgICBNZXNzYWdlOiBkaWdlc3RUb1NpZ24sXG4gICAgICBNZXNzYWdlVHlwZTogRElHRVNUX01FU1NBR0VfVFlQRSxcbiAgICAgIFNpZ25pbmdBbGdvcml0aG06IHNpZ25pbmdBbGdvcml0aG0sXG4gICAgfTtcblxuICAgIGNvbnN0IGNvbW1hbmQgPSBuZXcgU2lnbkNvbW1hbmQoaW5wdXQpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZTogU2lnbkNvbW1hbmRPdXRwdXQgPSBhd2FpdCB0aGlzLmttc0NsaWVudC5zZW5kKGNvbW1hbmQpO1xuICAgICAgY29uc3Qgc2lnbmluZ1Jlc3VsdDogS01TU2lnbmluZ1Jlc3VsdCA9IHtcbiAgICAgICAgbWFjOiByZXNwb25zZS5TaWduYXR1cmUsXG4gICAgICB9O1xuICAgICAgcmV0dXJuIHNpZ25pbmdSZXN1bHQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHdoaWxlIHNpZ25pbmcgZnJvbSBLTVM6JywgZXJyb3IpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHByb2Nlc3NLTVNFcnJvcihlcnJvcikpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBWZXJpZmllcyB0aGUgc2lnbmF0dXJlIG9mIHRoZSBwcm92aWRlZCBkYXRhIHVzaW5nIEtNUyBWZXJpZnkgQ29tbWFuZFxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gc2lnbmluZ0FsZ29yaXRobSAtIFRoZSBhbGdvcml0aG0gdXNlZCB0byBnZW5lcmF0ZSB0aGUgc2lnbmF0dXJlXG4gICAqIEBwYXJhbSB7QnVmZmVyfSBkYXRhVG9WZXJpZnkgLSBUaGUgb3JpZ2luYWwgZGF0YSB0aGF0IHdhcyBzaWduZWRcbiAgICogQHBhcmFtIHtCdWZmZXJ9IHNpZ25hdHVyZSAtIFRoZSBzaWduYXR1cmUgdG8gdmVyaWZ5XG4gICAqIEByZXR1cm5zIHtQcm9taXNlPEtNU1ZlcmlmaWNhdGlvblJlc3VsdD59IC0gUHJvbWlzZSByZXNvbHZpbmcgdG8gb2JqZWN0IHdpdGggdGhlIHZlcmlmaWNhdGlvbiByZXN1bHRcbiAgICovXG4gIGFzeW5jIHZlcmlmeShcbiAgICBzaWduaW5nQWxnb3JpdGhtOiBzdHJpbmcsXG4gICAgZGF0YVRvVmVyaWZ5OiBCdWZmZXIsXG4gICAgc2lnbmF0dXJlOiBCdWZmZXIsXG4gICk6IFByb21pc2U8S01TVmVyaWZpY2F0aW9uUmVzdWx0PiB7XG4gICAgY29uc3QgZGlnZXN0VG9WZXJpZnkgPSBhd2FpdCBkaWdlc3REYXRhKHNpZ25pbmdBbGdvcml0aG0sIGRhdGFUb1ZlcmlmeSk7XG5cbiAgICBjb25zdCBpbnB1dDogVmVyaWZ5Q29tbWFuZElucHV0ID0ge1xuICAgICAgS2V5SWQ6IHRoaXMua2V5SWQsXG4gICAgICBNZXNzYWdlOiBkaWdlc3RUb1ZlcmlmeSxcbiAgICAgIE1lc3NhZ2VUeXBlOiBESUdFU1RfTUVTU0FHRV9UWVBFLFxuICAgICAgU2lnbmF0dXJlOiBzaWduYXR1cmUsXG4gICAgICBTaWduaW5nQWxnb3JpdGhtOiBzaWduaW5nQWxnb3JpdGhtLFxuICAgIH07XG5cbiAgICBjb25zdCBjb21tYW5kID0gbmV3IFZlcmlmeUNvbW1hbmQoaW5wdXQpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZTogVmVyaWZ5Q29tbWFuZE91dHB1dCA9IGF3YWl0IHRoaXMua21zQ2xpZW50LnNlbmQoY29tbWFuZCk7XG4gICAgICBjb25zdCB2ZXJpZmljYXRpb25SZXN1bHQ6IEtNU1ZlcmlmaWNhdGlvblJlc3VsdCA9IHtcbiAgICAgICAgbWFjOiByZXNwb25zZS5TaWduYXR1cmVWYWxpZCxcbiAgICAgIH07XG4gICAgICByZXR1cm4gdmVyaWZpY2F0aW9uUmVzdWx0O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciB3aGlsZSB2ZXJpZnlpbmcgZnJvbSBLTVM6JywgZXJyb3IpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHByb2Nlc3NLTVNFcnJvcihlcnJvcikpO1xuICAgIH1cbiAgfVxufVxuIl19
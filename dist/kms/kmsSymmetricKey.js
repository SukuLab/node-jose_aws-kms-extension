"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KMSSymmetricKey = void 0;
const client_kms_1 = require("@aws-sdk/client-kms");
const utils_1 = require("../utils");
/**
 * Class for wrapping/unwrapping symmetric keys using AWS KMS, it implements limited functions needed for `Key` operations
 */
class KMSSymmetricKey {
    /**
     * Create an instance of KMSSymmetricKey
     *
     * @param keyId - KMS key ID to decrypt the cipher data key
     * @param kmsClient - KMS client instance to interact with AWS KMS
     */
    constructor(keyId, kmsClient) {
        (0, utils_1.validateKeyFormat)(keyId);
        this.keyId = keyId;
        this.kmsClient = kmsClient;
    }
    /**
     * Passes through data key generation result to be used in creating JWE.
     * See https://github.com/cisco/node-jose/blob/master/lib/jwe/encrypt.js
     *
     * @param encryptionAlgorithm - Encryption algorithm
     * @param kmsDataKeyGenerationResult - Result from KMS containing ciphertext
     * @returns Data key generation result to be used in creating JWE.
     */
    wrap(encryptionAlgorithm, kmsDataKeyGenerationResult) {
        return kmsDataKeyGenerationResult;
    }
    /**
     * Unwraps an encrypted symmetric key using KMS Decrypt Command
     * See https://github.com/cisco/node-jose/blob/master/lib/jwe/decrypt.js
     *
     * @param algorithm - Encryption algorithm
     * @param wrappedKey - Wrapped key to unwrap
     * @returns Promise resolving to plaintext key
     */
    async unwrap(encryptionAlgorithm, wrappedKey) {
        const mappedAlgorithm = (0, utils_1.mapToAwsKmsAlgorithm)(encryptionAlgorithm);
        const input = {
            CiphertextBlob: wrappedKey,
            KeyId: this.keyId,
            EncryptionAlgorithm: mappedAlgorithm,
        };
        const command = new client_kms_1.DecryptCommand(input);
        try {
            const response = await this.kmsClient.send(command);
            return response.Plaintext;
        }
        catch (error) {
            console.error('Error while decrypting from KMS:', error);
            return Promise.reject((0, utils_1.processKMSError)(error));
        }
    }
}
exports.KMSSymmetricKey = KMSSymmetricKey;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia21zU3ltbWV0cmljS2V5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ttcy9rbXNTeW1tZXRyaWNLZXkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0RBSzZCO0FBQzdCLG9DQUlrQjtBQUdsQjs7R0FFRztBQUNILE1BQWEsZUFBZTtJQUkxQjs7Ozs7T0FLRztJQUNILFlBQVksS0FBYSxFQUFFLFNBQW9CO1FBQzdDLElBQUEseUJBQWlCLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxJQUFJLENBQ0YsbUJBQTJCLEVBQzNCLDBCQUFzRDtRQUV0RCxPQUFPLDBCQUEwQixDQUFDO0lBQ3BDLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0gsS0FBSyxDQUFDLE1BQU0sQ0FDVixtQkFBMkIsRUFDM0IsVUFBc0I7UUFFdEIsTUFBTSxlQUFlLEdBQUcsSUFBQSw0QkFBb0IsRUFBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sS0FBSyxHQUF3QjtZQUNqQyxjQUFjLEVBQUUsVUFBVTtZQUMxQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsbUJBQW1CLEVBQUUsZUFBZTtTQUNyQyxDQUFDO1FBQ0YsTUFBTSxPQUFPLEdBQUcsSUFBSSwyQkFBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzFDLElBQUk7WUFDRixNQUFNLFFBQVEsR0FBeUIsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUMxRSxPQUFPLFFBQVEsQ0FBQyxTQUFTLENBQUM7U0FDM0I7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDekQsT0FBTyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUEsdUJBQWUsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQy9DO0lBQ0gsQ0FBQztDQUNGO0FBMURELDBDQTBEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEtNU0NsaWVudCxcbiAgRGVjcnlwdENvbW1hbmQsXG4gIERlY3J5cHRDb21tYW5kSW5wdXQsXG4gIERlY3J5cHRDb21tYW5kT3V0cHV0LFxufSBmcm9tICdAYXdzLXNkay9jbGllbnQta21zJztcbmltcG9ydCB7XG4gIHZhbGlkYXRlS2V5Rm9ybWF0LFxuICBwcm9jZXNzS01TRXJyb3IsXG4gIG1hcFRvQXdzS21zQWxnb3JpdGhtLFxufSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBLTVNEYXRhS2V5R2VuZXJhdGlvblJlc3VsdCB9IGZyb20gJy4vbW9kZWxzL2ttc0RhdGFLZXlHZW5lcmF0aW9uUmVzdWx0JztcblxuLyoqXG4gKiBDbGFzcyBmb3Igd3JhcHBpbmcvdW53cmFwcGluZyBzeW1tZXRyaWMga2V5cyB1c2luZyBBV1MgS01TLCBpdCBpbXBsZW1lbnRzIGxpbWl0ZWQgZnVuY3Rpb25zIG5lZWRlZCBmb3IgYEtleWAgb3BlcmF0aW9uc1xuICovXG5leHBvcnQgY2xhc3MgS01TU3ltbWV0cmljS2V5IHtcbiAga2V5SWQ6IHN0cmluZztcbiAga21zQ2xpZW50OiBLTVNDbGllbnQ7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBLTVNTeW1tZXRyaWNLZXlcbiAgICpcbiAgICogQHBhcmFtIGtleUlkIC0gS01TIGtleSBJRCB0byBkZWNyeXB0IHRoZSBjaXBoZXIgZGF0YSBrZXlcbiAgICogQHBhcmFtIGttc0NsaWVudCAtIEtNUyBjbGllbnQgaW5zdGFuY2UgdG8gaW50ZXJhY3Qgd2l0aCBBV1MgS01TXG4gICAqL1xuICBjb25zdHJ1Y3RvcihrZXlJZDogc3RyaW5nLCBrbXNDbGllbnQ6IEtNU0NsaWVudCkge1xuICAgIHZhbGlkYXRlS2V5Rm9ybWF0KGtleUlkKTtcbiAgICB0aGlzLmtleUlkID0ga2V5SWQ7XG4gICAgdGhpcy5rbXNDbGllbnQgPSBrbXNDbGllbnQ7XG4gIH1cblxuICAvKipcbiAgICogUGFzc2VzIHRocm91Z2ggZGF0YSBrZXkgZ2VuZXJhdGlvbiByZXN1bHQgdG8gYmUgdXNlZCBpbiBjcmVhdGluZyBKV0UuXG4gICAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vY2lzY28vbm9kZS1qb3NlL2Jsb2IvbWFzdGVyL2xpYi9qd2UvZW5jcnlwdC5qc1xuICAgKlxuICAgKiBAcGFyYW0gZW5jcnlwdGlvbkFsZ29yaXRobSAtIEVuY3J5cHRpb24gYWxnb3JpdGhtXG4gICAqIEBwYXJhbSBrbXNEYXRhS2V5R2VuZXJhdGlvblJlc3VsdCAtIFJlc3VsdCBmcm9tIEtNUyBjb250YWluaW5nIGNpcGhlcnRleHRcbiAgICogQHJldHVybnMgRGF0YSBrZXkgZ2VuZXJhdGlvbiByZXN1bHQgdG8gYmUgdXNlZCBpbiBjcmVhdGluZyBKV0UuXG4gICAqL1xuICB3cmFwKFxuICAgIGVuY3J5cHRpb25BbGdvcml0aG06IHN0cmluZyxcbiAgICBrbXNEYXRhS2V5R2VuZXJhdGlvblJlc3VsdDogS01TRGF0YUtleUdlbmVyYXRpb25SZXN1bHQsXG4gICk6IEtNU0RhdGFLZXlHZW5lcmF0aW9uUmVzdWx0IHtcbiAgICByZXR1cm4ga21zRGF0YUtleUdlbmVyYXRpb25SZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogVW53cmFwcyBhbiBlbmNyeXB0ZWQgc3ltbWV0cmljIGtleSB1c2luZyBLTVMgRGVjcnlwdCBDb21tYW5kXG4gICAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vY2lzY28vbm9kZS1qb3NlL2Jsb2IvbWFzdGVyL2xpYi9qd2UvZGVjcnlwdC5qc1xuICAgKlxuICAgKiBAcGFyYW0gYWxnb3JpdGhtIC0gRW5jcnlwdGlvbiBhbGdvcml0aG1cbiAgICogQHBhcmFtIHdyYXBwZWRLZXkgLSBXcmFwcGVkIGtleSB0byB1bndyYXBcbiAgICogQHJldHVybnMgUHJvbWlzZSByZXNvbHZpbmcgdG8gcGxhaW50ZXh0IGtleVxuICAgKi9cbiAgYXN5bmMgdW53cmFwKFxuICAgIGVuY3J5cHRpb25BbGdvcml0aG06IHN0cmluZyxcbiAgICB3cmFwcGVkS2V5OiBVaW50OEFycmF5LFxuICApOiBQcm9taXNlPFVpbnQ4QXJyYXkgfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCBtYXBwZWRBbGdvcml0aG0gPSBtYXBUb0F3c0ttc0FsZ29yaXRobShlbmNyeXB0aW9uQWxnb3JpdGhtKTtcbiAgICBjb25zdCBpbnB1dDogRGVjcnlwdENvbW1hbmRJbnB1dCA9IHtcbiAgICAgIENpcGhlcnRleHRCbG9iOiB3cmFwcGVkS2V5LFxuICAgICAgS2V5SWQ6IHRoaXMua2V5SWQsXG4gICAgICBFbmNyeXB0aW9uQWxnb3JpdGhtOiBtYXBwZWRBbGdvcml0aG0sXG4gICAgfTtcbiAgICBjb25zdCBjb21tYW5kID0gbmV3IERlY3J5cHRDb21tYW5kKGlucHV0KTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2U6IERlY3J5cHRDb21tYW5kT3V0cHV0ID0gYXdhaXQgdGhpcy5rbXNDbGllbnQuc2VuZChjb21tYW5kKTtcbiAgICAgIHJldHVybiByZXNwb25zZS5QbGFpbnRleHQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHdoaWxlIGRlY3J5cHRpbmcgZnJvbSBLTVM6JywgZXJyb3IpO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHByb2Nlc3NLTVNFcnJvcihlcnJvcikpO1xuICAgIH1cbiAgfVxufVxuIl19
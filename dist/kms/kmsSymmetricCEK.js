"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KMSSymmetricCEK = void 0;
const client_kms_1 = require("@aws-sdk/client-kms");
const utils_1 = require("../utils");
const jose = require('node-jose');
/**
 * Class for generating symmetric data keys using AWS KMS and encrypt the content
 */
class KMSSymmetricCEK {
    /**
     * Creates an instance of KMSSymmetricCEK.
     *
     * @param {string} keyId - KMS Key Id to use for data key generation.
     * @param {KMSClient} kmsClient - KMS client instance to interact with AWS KMS.
     * @param {string} keySpec - key spec to specify the length of the data key to generate a symmetric data key.
     */
    constructor(keyId, kmsClient, keySpec) {
        (0, utils_1.validateKeyFormat)(keyId);
        this.keyId = keyId;
        this.kmsClient = kmsClient;
        this.keySpec = keySpec;
    }
    /**
     * Generates a new data key using KMS GenerateDataKey Command
     *
     * @returns Promise resolving to object with ciphertext data key
     */
    async get() {
        const input = {
            KeyId: this.keyId,
            KeySpec: this.keySpec,
        };
        const command = new client_kms_1.GenerateDataKeyCommand(input);
        try {
            const response = await this.kmsClient.send(command);
            this.dataKey = response.Plaintext;
            const dataKeyGenerationResult = {
                data: response.CiphertextBlob,
            };
            return dataKeyGenerationResult;
        }
        catch (error) {
            console.error('Error while generating data key from KMS:', error);
            return Promise.reject((0, utils_1.processKMSError)(error));
        }
    }
    /**
     * Encrypts data using the generated data key
     *
     * @param encryptionAlgorithm - Encryption algorithm to use to encrypt the data
     * @param dataToEncrypt - Data to encrypt
     * @param props - Additional encryption properties
     *
     * @returns Encrypted data
     */
    encrypt(encryptionAlgorithm, dataToEncrypt, props) {
        return jose.JWA.encrypt(encryptionAlgorithm, this.dataKey, dataToEncrypt, props);
    }
}
exports.KMSSymmetricCEK = KMSSymmetricCEK;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoia21zU3ltbWV0cmljQ0VLLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2ttcy9rbXNTeW1tZXRyaWNDRUsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0RBSzZCO0FBQzdCLG9DQUE4RDtBQUU5RCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFbEM7O0dBRUc7QUFDSCxNQUFhLGVBQWU7SUFNMUI7Ozs7OztPQU1HO0lBQ0gsWUFBWSxLQUFhLEVBQUUsU0FBb0IsRUFBRSxPQUFlO1FBQzlELElBQUEseUJBQWlCLEVBQUMsS0FBSyxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDekIsQ0FBQztJQUVEOzs7O09BSUc7SUFDSCxLQUFLLENBQUMsR0FBRztRQUNQLE1BQU0sS0FBSyxHQUFnQztZQUN6QyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7WUFDakIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO1NBQ3RCLENBQUM7UUFDRixNQUFNLE9BQU8sR0FBRyxJQUFJLG1DQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xELElBQUk7WUFDRixNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQztZQUNsQyxNQUFNLHVCQUF1QixHQUErQjtnQkFDMUQsSUFBSSxFQUFFLFFBQVEsQ0FBQyxjQUFjO2FBQzlCLENBQUM7WUFDRixPQUFPLHVCQUF1QixDQUFDO1NBQ2hDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLDJDQUEyQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ2xFLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFBLHVCQUFlLEVBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUMvQztJQUNILENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILE9BQU8sQ0FBQyxtQkFBMkIsRUFBRSxhQUFxQixFQUFFLEtBQVU7UUFDcEUsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FDckIsbUJBQW1CLEVBQ25CLElBQUksQ0FBQyxPQUFPLEVBQ1osYUFBYSxFQUNiLEtBQUssQ0FDTixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBN0RELDBDQTZEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIEtNU0NsaWVudCxcbiAgR2VuZXJhdGVEYXRhS2V5Q29tbWFuZCxcbiAgR2VuZXJhdGVEYXRhS2V5Q29tbWFuZElucHV0LFxuICBHZW5lcmF0ZURhdGFLZXlDb21tYW5kT3V0cHV0LFxufSBmcm9tICdAYXdzLXNkay9jbGllbnQta21zJztcbmltcG9ydCB7IHZhbGlkYXRlS2V5Rm9ybWF0LCBwcm9jZXNzS01TRXJyb3IgfSBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBLTVNEYXRhS2V5R2VuZXJhdGlvblJlc3VsdCB9IGZyb20gJy4vbW9kZWxzL2ttc0RhdGFLZXlHZW5lcmF0aW9uUmVzdWx0JztcbmNvbnN0IGpvc2UgPSByZXF1aXJlKCdub2RlLWpvc2UnKTtcblxuLyoqXG4gKiBDbGFzcyBmb3IgZ2VuZXJhdGluZyBzeW1tZXRyaWMgZGF0YSBrZXlzIHVzaW5nIEFXUyBLTVMgYW5kIGVuY3J5cHQgdGhlIGNvbnRlbnRcbiAqL1xuZXhwb3J0IGNsYXNzIEtNU1N5bW1ldHJpY0NFSyB7XG4gIGtleUlkOiBzdHJpbmc7XG4gIGttc0NsaWVudDogS01TQ2xpZW50O1xuICBrZXlTcGVjOiBzdHJpbmc7XG4gIGRhdGFLZXk6IFVpbnQ4QXJyYXkgfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2YgS01TU3ltbWV0cmljQ0VLLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5SWQgLSBLTVMgS2V5IElkIHRvIHVzZSBmb3IgZGF0YSBrZXkgZ2VuZXJhdGlvbi5cbiAgICogQHBhcmFtIHtLTVNDbGllbnR9IGttc0NsaWVudCAtIEtNUyBjbGllbnQgaW5zdGFuY2UgdG8gaW50ZXJhY3Qgd2l0aCBBV1MgS01TLlxuICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5U3BlYyAtIGtleSBzcGVjIHRvIHNwZWNpZnkgdGhlIGxlbmd0aCBvZiB0aGUgZGF0YSBrZXkgdG8gZ2VuZXJhdGUgYSBzeW1tZXRyaWMgZGF0YSBrZXkuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihrZXlJZDogc3RyaW5nLCBrbXNDbGllbnQ6IEtNU0NsaWVudCwga2V5U3BlYzogc3RyaW5nKSB7XG4gICAgdmFsaWRhdGVLZXlGb3JtYXQoa2V5SWQpO1xuICAgIHRoaXMua2V5SWQgPSBrZXlJZDtcbiAgICB0aGlzLmttc0NsaWVudCA9IGttc0NsaWVudDtcbiAgICB0aGlzLmtleVNwZWMgPSBrZXlTcGVjO1xuICB9XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIG5ldyBkYXRhIGtleSB1c2luZyBLTVMgR2VuZXJhdGVEYXRhS2V5IENvbW1hbmRcbiAgICpcbiAgICogQHJldHVybnMgUHJvbWlzZSByZXNvbHZpbmcgdG8gb2JqZWN0IHdpdGggY2lwaGVydGV4dCBkYXRhIGtleVxuICAgKi9cbiAgYXN5bmMgZ2V0KCk6IFByb21pc2U8S01TRGF0YUtleUdlbmVyYXRpb25SZXN1bHQ+IHtcbiAgICBjb25zdCBpbnB1dDogR2VuZXJhdGVEYXRhS2V5Q29tbWFuZElucHV0ID0ge1xuICAgICAgS2V5SWQ6IHRoaXMua2V5SWQsXG4gICAgICBLZXlTcGVjOiB0aGlzLmtleVNwZWMsXG4gICAgfTtcbiAgICBjb25zdCBjb21tYW5kID0gbmV3IEdlbmVyYXRlRGF0YUtleUNvbW1hbmQoaW5wdXQpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMua21zQ2xpZW50LnNlbmQoY29tbWFuZCk7XG4gICAgICB0aGlzLmRhdGFLZXkgPSByZXNwb25zZS5QbGFpbnRleHQ7XG4gICAgICBjb25zdCBkYXRhS2V5R2VuZXJhdGlvblJlc3VsdDogS01TRGF0YUtleUdlbmVyYXRpb25SZXN1bHQgPSB7XG4gICAgICAgIGRhdGE6IHJlc3BvbnNlLkNpcGhlcnRleHRCbG9iLFxuICAgICAgfTtcbiAgICAgIHJldHVybiBkYXRhS2V5R2VuZXJhdGlvblJlc3VsdDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igd2hpbGUgZ2VuZXJhdGluZyBkYXRhIGtleSBmcm9tIEtNUzonLCBlcnJvcik7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QocHJvY2Vzc0tNU0Vycm9yKGVycm9yKSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVuY3J5cHRzIGRhdGEgdXNpbmcgdGhlIGdlbmVyYXRlZCBkYXRhIGtleVxuICAgKlxuICAgKiBAcGFyYW0gZW5jcnlwdGlvbkFsZ29yaXRobSAtIEVuY3J5cHRpb24gYWxnb3JpdGhtIHRvIHVzZSB0byBlbmNyeXB0IHRoZSBkYXRhXG4gICAqIEBwYXJhbSBkYXRhVG9FbmNyeXB0IC0gRGF0YSB0byBlbmNyeXB0XG4gICAqIEBwYXJhbSBwcm9wcyAtIEFkZGl0aW9uYWwgZW5jcnlwdGlvbiBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIEByZXR1cm5zIEVuY3J5cHRlZCBkYXRhXG4gICAqL1xuICBlbmNyeXB0KGVuY3J5cHRpb25BbGdvcml0aG06IHN0cmluZywgZGF0YVRvRW5jcnlwdDogQnVmZmVyLCBwcm9wczogYW55KSB7XG4gICAgcmV0dXJuIGpvc2UuSldBLmVuY3J5cHQoXG4gICAgICBlbmNyeXB0aW9uQWxnb3JpdGhtLFxuICAgICAgdGhpcy5kYXRhS2V5LFxuICAgICAgZGF0YVRvRW5jcnlwdCxcbiAgICAgIHByb3BzLFxuICAgICk7XG4gIH1cbn1cbiJdfQ==
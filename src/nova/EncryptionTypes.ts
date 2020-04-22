import { DH } from "./DH";
import { Logistic } from "./Logistic";
import { EncryptionAlgorithm } from "../interfaces/EncryptionAlgorithm";

class EncryptionTypes {
    public static readonly DH = new DH();
    public static readonly Logistic = new Logistic();

    public static algorithms : Array<EncryptionAlgorithm> = [
        EncryptionTypes.DH,
        EncryptionTypes.Logistic
    ]
}

export default EncryptionTypes;
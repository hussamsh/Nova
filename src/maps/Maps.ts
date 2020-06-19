import { DH } from "./DH";
import { Logistic } from "./Logistic";
import { Henon } from "./Henon";
import { Map } from "../interfaces/Map";

//Convenience class to access all availabe encryption algorithms
class Maps {
    public static readonly DH = new DH();
    public static readonly Logistic = new Logistic();
    public static readonly Henon = new Henon();

    public static all : Array<Map> = [
        Maps.DH,
        Maps.Logistic,
        Maps.Henon
    ]
}

export default Maps;
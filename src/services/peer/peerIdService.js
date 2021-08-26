import axios from "axios";
import { url } from "../constants";

export default class PeerIdService {
   
    constructor(){
        this.apiUrl=url;
 
    }
    

    getPeerId() {
        return axios.get(this.apiUrl+"/peerId/get");
    }

     addPeerId(peerId){

        return axios.post(this.apiUrl,peerId);

    }


}

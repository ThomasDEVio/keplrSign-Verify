const {Buffer} = require('buffer');
import {verifyADR36Amino} from "../../libs/keplrSucks/verifyADRMessage";

export default async function handle(req, res) {
  if (req.method === "POST") {
    try {
      //get data from post body
      let object = req.body;
      let data = await verifyMessage(object);
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(200).json("Error");
    }
  } else if (req.method === "GET") {
    //not allowed
    res.status(201).send("GET");
  }
}

async function verifyMessage(object) {
    let signature = object.signature.signature;
    let address = object.address;
    let key = object.signature.pub_key.value;

    var msg = process.env.NEXT_PUBLIC_SIGN_MESSAGE;
    const prefix = "stars"; // change prefix for other chains...
    
    const signatureBuffer = Buffer.from(signature, 'base64');
    
    const uint8Signature = new Uint8Array(signatureBuffer); // Convert the buffer to an Uint8Array
    
    const pubKeyValueBuffer = Buffer.from(key, 'base64'); // Decode the base64 encoded value
    
    const pubKeyUint8Array = new Uint8Array(pubKeyValueBuffer); // Convert the buffer to an Uint8Array
    const isRecovered =  verifyADR36Amino(prefix, address, msg, pubKeyUint8Array, uint8Signature);
    return isRecovered
}




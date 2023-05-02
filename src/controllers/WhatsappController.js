"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WhatsappDAO_1 = __importDefault(require("../dao/WhatsappDAO"));
class WhatsappController extends WhatsappDAO_1.default {
    constructor() {
        super(...arguments);
        this.getVerifyToken = (req, res) => {
            try {
                var accessToken = "RYTAFAADHJJADADH25634232GGSDSA";
                var token = req.query["hub.verify_token"];
                var challenge = req.query["hub.challenge"];
                if (challenge != null && token != null && token == accessToken) {
                    res.send(challenge);
                }
                else {
                    res.status(400).send();
                }
            }
            catch (e) {
                res.status(400).send();
            }
            res.status(200).send("Hola verifyToken");
        };
        this.getReceiveToken = (req, res) => {
            WhatsappController.postReceive(res);
        };
    }
}
const whatsappController = new WhatsappController();
exports.default = whatsappController;

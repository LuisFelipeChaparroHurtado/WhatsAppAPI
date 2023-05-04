"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WhatsappDAO_1 = __importDefault(require("../dao/WhatsappDAO"));
const fs = require("fs");
const myConsole = new console.Console(fs.createWriteStream("./logs.txt"));
function GetTextUser(messages) {
    var text = "";
    var typeMessage = messages["type"];
    if (typeMessage == "text") {
        text = messages["text"]["body"];
    }
    else if (typeMessage == "interactive") {
        var interactiveObject = messages["interactive"];
        var typeInteractive = interactiveObject["type"];
        if (typeInteractive == "button_reply") {
            text = interactiveObject["button_reply"]["title"];
        }
        else if (typeInteractive == "list_reply") {
            text = interactiveObject["list_reply"]["title"];
        }
        else {
            console.log("Sin mensaje");
        }
    }
    else {
        console.log("Sin mensaje");
    }
    return text;
}
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
        };
        this.getReceiveToken = (req, res) => {
            try {
                var entry = req.body["entry"][0];
                var changes = entry["changes"][0];
                var value = changes["value"];
                var messageObject = value["messages"];
                var messages = messageObject[0];
                var text = GetTextUser(messages);
                myConsole.log(text);
                console.log(text);
                res.send("EVENT_RECEIVED");
            }
            catch (e) {
                myConsole.log(e);
                res.send("EVENT_RECEIVED");
            }
        };
    }
}
const whatsappController = new WhatsappController();
exports.default = whatsappController;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const WhatsappController_1 = __importDefault(require("../controllers/WhatsappController"));
class WhatsappRoute {
    constructor() {
        this.routesApiWhatsapp = (0, express_1.Router)();
        this.setting();
    }
    setting() {
        this.routesApiWhatsapp.get("/", WhatsappController_1.default.getVerifyToken);
        this.routesApiWhatsapp.post("/", WhatsappController_1.default.getReceiveToken);
    }
}
const whatsappRoute = new WhatsappRoute();
exports.default = whatsappRoute.routesApiWhatsapp;

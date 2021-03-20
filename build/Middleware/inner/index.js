"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var koa_body_1 = __importDefault(require("koa-body"));
var koa_cors_1 = __importDefault(require("koa-cors"));
var response_1 = __importDefault(require("./response"));
exports.default = [koa_cors_1.default, koa_body_1.default, response_1.default];

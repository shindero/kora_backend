"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var status_1 = require("../constants/status");
var timerController = require("../controllers/timer.controller");
var authorize_1 = require("../middlewares/authorize");
var error_1 = require("../types/error");
var timerRouter = (0, express_1.Router)();
timerRouter.post('/start', (0, authorize_1.authorize)(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var taskId, userId, timer, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                taskId = req.body.taskId;
                userId = req.user.sub;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, timerController.start(taskId, Number(userId))];
            case 2:
                timer = _a.sent();
                return [2 /*return*/, res.status(200).send(timer)];
            case 3:
                error_2 = _a.sent();
                if (error_2 instanceof error_1.HttpError) {
                    return [2 /*return*/, res.status(status_1.EStatus[error_2.status]).json({ message: error_2.message })];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
timerRouter.post('/stop', (0, authorize_1.authorize)(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, timer, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.sub;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, timerController.stop(Number(userId))];
            case 2:
                timer = _a.sent();
                return [2 /*return*/, res.status(200).send(timer)];
            case 3:
                error_3 = _a.sent();
                if (error_3 instanceof error_1.HttpError) {
                    return [2 /*return*/, res.status(status_1.EStatus[error_3.status]).json({ message: error_3.message })];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
timerRouter.get('/', (0, authorize_1.authorize)(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, timer, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.sub;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, timerController.getUserEntries(Number(userId))];
            case 2:
                timer = _a.sent();
                return [2 /*return*/, res.status(200).send(timer)];
            case 3:
                error_4 = _a.sent();
                if (error_4 instanceof error_1.HttpError) {
                    return [2 /*return*/, res.status(status_1.EStatus[error_4.status]).json({ message: error_4.message })];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
timerRouter.get('/current', (0, authorize_1.authorize)(), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, timer, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userId = req.user.sub;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, timerController.getCurrentTimer(Number(userId))];
            case 2:
                timer = _a.sent();
                return [2 /*return*/, res.status(200).send(timer)];
            case 3:
                error_5 = _a.sent();
                if (error_5 instanceof error_1.HttpError) {
                    return [2 /*return*/, res.status(status_1.EStatus[error_5.status]).json({ message: error_5.message })];
                }
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
exports["default"] = timerRouter;

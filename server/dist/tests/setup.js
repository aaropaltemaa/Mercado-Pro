"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.request = exports.prisma = void 0;
const vitest_1 = require("vitest");
const client_1 = require("@prisma/client");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
// safety: never hit dev DB by mistake
if (!process.env.DATABASE_URL?.includes("test.db")) {
    // Fail fast if tests aren't pointed at test DB
    throw new Error("DATABASE_URL must point to test.db when running tests");
}
// share these in tests
exports.prisma = new client_1.PrismaClient();
exports.request = (0, supertest_1.default)(app_1.default);
// simple FK-safe wipe using model APIs
async function clearDb() {
    await exports.prisma.review.deleteMany();
    await exports.prisma.orderItem.deleteMany();
    await exports.prisma.cartItem.deleteMany();
    await exports.prisma.order.deleteMany();
    await exports.prisma.product.deleteMany();
    await exports.prisma.user.deleteMany();
}
(0, vitest_1.beforeAll)(async () => {
    await exports.prisma.$connect();
});
(0, vitest_1.beforeEach)(async () => {
    await clearDb();
});
(0, vitest_1.afterAll)(async () => {
    await exports.prisma.$disconnect();
});

// lib/prisma.js
const prisma = require('../prisma.config.js');

if (process.env.NODE_ENV !== 'production') {
  if (!global.prisma) {
    global.prisma = prisma;
  }
  module.exports = global.prisma;
} else {
  module.exports = prisma;
}
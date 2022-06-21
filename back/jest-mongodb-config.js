module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: '4.0.3',
      skipMD5: true,
    },
    autoStart: false,
    instance: {
      dbName: 'jest',
    },
    mongoURLEnvName: 'mongodb+srv://admin:1234@cluster0.6alrt.mongodb.net/ai_8',
  },
};
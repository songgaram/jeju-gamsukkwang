module.exports = {
  mongodbMemoryServerOptions: {
    binary: {
      version: "4.0.3",
      skipMD5: true,
    },
    instance: {},
    autoStart: false,
    replSet: {
      count: 3,
      storageEngine: "wiredTiger",
    },
  },
  // useSharedDBForAllJestWorkers: false,
};

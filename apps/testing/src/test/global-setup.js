const globalSetup = async () => {
  process.env.TZ = "UTC";
  process.env.LANG = "en_US.UTF-8";
};

export default globalSetup;

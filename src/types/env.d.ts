type Env = {
  ADMIN_USERNAME: string;
  ADMIN_PASSWORD: string;
};

type Runtime = {
  env: Env;
};

type CustomLocals = {
  runtime: Runtime;
};

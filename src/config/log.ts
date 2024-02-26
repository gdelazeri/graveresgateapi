import logger from 'pino';
import dayjs from 'dayjs';

const log = logger({
  base: {
    pid: false,
  },
  enabled: process.env.NODE_ENV !== 'test',
  timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log;

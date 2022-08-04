import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async(host = 'database_ignite'): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions()

  return createConnection(
    Object.assign(defaultOptions, {
      host,
      database:
        process.env.NODE_ENV === "test"
          ? "rentx_test"
          : defaultOptions.database 
    })
  )
}
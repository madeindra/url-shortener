import { FastifyInstance, HookHandlerDoneFunction } from 'fastify';
import fp from 'fastify-plugin';
import sqlite3 from 'sqlite3';

// plugin options
export interface SqlitePluginOptions {
  filename: string;
}

// extend fastify interface
declare module 'fastify' {
  interface FastifyInstance {
    sqlite: sqlite3.Database;
  }
}

// eslint-disable-next-line max-len
function sqlitePlugin(fastify: FastifyInstance, options: SqlitePluginOptions, done: HookHandlerDoneFunction) {
  // create a new SQLite database connection
  if (!fastify.sqlite) {
    const db = new sqlite3.Database(options.filename);
    fastify.decorate('sqlite', db);

    // Close the database connection when the plugin is done
    fastify.addHook('onClose', () => {
      if (fastify.sqlite === db) {
        db.close((err) => {
          if (err) {
            fastify.log.error(err);
          }
        });
      }
    });
  }

  done();
}

export default fp(sqlitePlugin, { name: 'fastify-sqlite' });

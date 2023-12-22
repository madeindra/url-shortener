import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';

// plugin options
export interface SqlitePluginOptions {
  filename: string;
  tablename: string;
}

// extend fastify interface
declare module 'fastify' {
  interface FastifyInstance {
    sqlite: Database;
  }
}

async function sqlitePlugin(fastify: FastifyInstance, options: SqlitePluginOptions) {
  // create a new SQLite database connection
  if (!fastify.sqlite) {
    const db = await open({
      filename: options.filename,
      driver: sqlite3.Database,
    });

    fastify.decorate('sqlite', db);

    // create the new table if it doesn't exist
    fastify.addHook('onReady', async () => {
      await db.exec(`CREATE TABLE IF NOT EXISTS ${options.tablename} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        original_url TEXT NOT NULL,
        slug TEXT NOT NULL UNIQUE
      )`);
    });

    // Close the database connection when the plugin is done
    fastify.addHook('onClose', async () => {
      if (fastify.sqlite === db) {
        await db.close();
      }
    });
  }
}

export default fp(sqlitePlugin, { name: 'fastify-sqlite' });

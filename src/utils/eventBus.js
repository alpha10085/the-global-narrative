/**
 * @fileoverview A global event bus using Node.js EventEmitter for app-wide communication.
 *
 * Example usage:
 *
 * // Emit an event
 * eventBus.emit("user:login", { id: 1, name: "Alphax" });
 *
 * // Listen to an event
 * eventBus.on("user:login", (user) => {
 *   console.log("User logged in:", user);
 * });
 */

import { EventEmitter } from "events";

/**
 * A singleton EventEmitter instance for emitting and listening to custom events.
 *
 * @type {EventEmitter}
 */
const eventBus = new EventEmitter();

export default eventBus;

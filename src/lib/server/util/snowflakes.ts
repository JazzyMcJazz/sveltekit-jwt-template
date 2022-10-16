/*
 * We extend Snowflakify and export a new instance.
 * Single instance pattern / Singleton.
 */

import Snowflakify from "snowflakify";

class Snowflakes extends Snowflakify {}

export default new Snowflakes();

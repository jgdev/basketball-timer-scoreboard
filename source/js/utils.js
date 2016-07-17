/**
 * Common utils functions
 * @author Joan Peralta <joanperalta13@gmail.com>
 * @version 1.0
 *
 * @licence GNU GENERAL PUBLIC LICENSE 3.0
 * https://opensource.org/licenses/GPL-3.0
 */

'use strict';

exports.pad = n => {
  return (n < 10 ? '0' + n : n).toString();
};
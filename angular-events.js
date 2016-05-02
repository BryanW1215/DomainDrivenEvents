/**
 * Domain Driven Event Library Angular Provider 
 *
 * Bryan Walsh
 * BryanWalshPrograms@gmail.com
 * www.BryanGWalsh.Com
 *
 * GitHub: https://github.com/BryanW1215/DomainDrivenEvents
 *
 * Distributed Under the GNU General License
 * http:// http://www.gnu.org/licenses/gpl-3.0.en.html
 *
 * Requires:
 *      Domain Driven Event Library
 */

angular
    .module("DomainEvents", [])
    .factory('$events', [function () {
        return window.Events;
    }]);

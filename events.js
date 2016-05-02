/**
 * Domain Driven Event Library
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
 *      bluebird
 *      lodash
 */

window.Events =

    new function () {
        var Domains = new function () {
            var DomainCollection = [];
            return {get: getDomain};
            // End


            // Create Domain
            function CreateDomain(name) {
                var self = {};
                self.InstanceCollection = [];

                self.emit = function (event, data) {
                    var Promises = [];
                    _.each(self.InstanceCollection, instanceEmit);
                    if (Promises.length) { return Promise.all(Promises); }
                    return new Promise(function (resolve) {
                        resolve();
                    });
                    //end

                    function instanceEmit(i) {
                        Promises = Promises.concat(i.onEmit(event, data));
                    }
                };
                self.attach = function (instance) {
                    self.InstanceCollection.push(instance);
                };
                self.RemoveInstance = function (instanceId) {
                    _.remove(self.InstanceCollection, {id: instanceId});
                };
                var newDomain = {
                    name: name,
                    emit: self.emit,
                    instances: {attach: self.attach, remove: self.RemoveInstance, instances: self.InstanceCollection}
                };
                DomainCollection.push(newDomain);
                return newDomain;
            }

            // Get Domain
            function getDomain(name) {
                var Domain = _.find(DomainCollection, {name: name});
                if (Domain) {
                    return Domain;
                }
                return CreateDomain(name);
            }
        };


        var Instances = new function () {
            var instanceIds = 0;
            return {get: CreateInstance};
            // End

            // Create Instance
            function CreateInstance(Domain) {
                instanceIds++;
                var self = {};
                self.myDomain = Domains.get(Domain);
                self.id = instanceIds;
                self.Listeners = [];

                self.EventReceived = function (event, data) {
                    var Promises = [];

                    function CallListener(f) {
                        var ret = f(data);
                        ret && ret.then && Promises.push(ret);
                    }

                    var fListeners = _.map(_.filter(self.Listeners, {'event': event}), 'f'); //Filtering to event then pulling the listener function property
                    _.each(fListeners, CallListener);
                    return Promises;

                };


                self.on = function (event, f) {
                    self.Listeners.push({'event': event, f: f});
                };

                self.destroy = function () {
                    self.myDomain.instances.remove(self.id);
                };

                self.myDomain.instances.attach({id: self.id, onEmit: self.EventReceived});
                return {on: self.on, destroy: self.destroy, emit: self.myDomain.emit, id: self.id};
            }
        };


        var runScript = function (script, clear) {
            Normalize();
            Emit();
            // End

            function Normalize() {
                var keys = Object.keys(script);
                _.each(keys, function (p) {
                    var value = script[p];
                    if (!Array.isArray(value))
                        script[p] = [value];
                });
            }

            function Emit() {
                var Promises = [];
                var keys = Object.keys(script);
                _.each(keys, function (k) {
                    var e = Domains.get(k);
                    clear && e.emit('Clear');
                    _.each(script[k], function (c) {
                        var ret = e.emit(c.event, c.value);
                        Promises.push(ret);
                    });
                });
                return Promise.all(Promises)
            }
        };
        return {instance: Instances.get, runScript: runScript};
    };


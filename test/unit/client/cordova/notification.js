/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

describe("Cordova 2.0.0 Notification Bridge", function () {
    var notifications = ripple('notifications'),
        goodVibrations = ripple('ui/plugins/goodVibrations'),
        notification = ripple('platform/cordova/2.0.0/bridge/notification'),
        console = ripple('console'),
        s,
        e;

    describe("on alert", function () {
        beforeEach(function () {
            s = jasmine.createSpy("success");
            e = jasmine.createSpy("error");
            spyOn(notifications, "openNotification");
        });

        it("throws an exception if called with no args", function () {
            expect(notification.alert).toThrow();
        });

        it("can be called wihtout specifying an error callback", function () {
            notification.alert(s, null, ["Test notification"]);
            expect(notifications.openNotification).toHaveBeenCalled();
            expect(notifications.openNotification.mostRecentCall.args[1]).toEqual("Test notification");
            expect(s).toHaveBeenCalledWith();
        });

        it("can be called specifying success and error callback", function () {
            notification.alert(s, e, ["Test notification"]);
            expect(notifications.openNotification).toHaveBeenCalled();
            expect(notifications.openNotification.mostRecentCall.args[1]).toEqual("Test notification");
            expect(s).toHaveBeenCalledWith();
            expect(e).not.toHaveBeenCalled();
        });
    });

    describe("on vibrate", function () {
        beforeEach(function () {
            spyOn(goodVibrations, "vibrateDevice");
        });

        it("can't be called with no args", function () {
            expect(notification.vibrate).toThrow();
            expect(goodVibrations.vibrateDevice).not.toHaveBeenCalled();
        });

        it("can be called specifying milliseconds", function () {
            var vibelength = 789;
            notification.vibrate(null, null, [vibelength]);
            expect(goodVibrations.vibrateDevice).toHaveBeenCalledWith(vibelength);
        });
    });

    describe("on beep", function () {
        beforeEach(function () {
            spyOn(notifications, "openNotification");
            spyOn(console, "log");
        });

        it("throws an exception if called with no args", function () {
            expect(notification.beep).toThrow();
        });

        it("can be called specifying a beep count", function () {
            var beepcount = 5;
            notification.beep(null, null, [beepcount]);
            expect(notifications.openNotification).toHaveBeenCalled();
            expect(notifications.openNotification.mostRecentCall.args[1]).toEqual("BEEP x " + beepcount);
            expect(console.log.callCount).toEqual(beepcount);
        });
    });
});

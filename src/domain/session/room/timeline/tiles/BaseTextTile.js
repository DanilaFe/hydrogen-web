/*
Copyright 2020 Bruno Windels <bruno@windels.cloud>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import {BaseMessageTile} from "./BaseMessageTile.js";
import {stringAsBody} from "../MessageBody.js";

export class BaseTextTile extends BaseMessageTile {
    constructor(options) {
        super(options);
        this._messageBody = null;
        this._messageFormat = null
    }

    get shape() {
        return "message";
    }

    _parseBody(body, _) {
        return stringAsBody(body.string);
    }

    _getBodyFormat() {
        return "plain";
    }

    get body() {
        const body = this._getBody();
        const format = this._getBodyFormat();
        // body.string is a string, so we can check for difference by just
        // doing an equality check
        // Even if the body hasn't changed, but the format has, we need
        // to re-fill our cache.
        if (!this._messageBody || this._messageBody.sourceString !== body || this._messageFormat !== format) {
            // body with markup is an array of parts,
            // so we should not recreate it for the same body string,
            // or else the equality check in the binding will always fail.
            // So cache it here.
            this._messageBody = this._parseBody(body, format);
            this._messageFormat = body.format;
        }
        return this._messageBody;
    }
}
